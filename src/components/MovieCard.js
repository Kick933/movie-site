import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../img.css'

function MovieCard(props) {
    const config = props.config
    const movie = props.movie
    const [text,setText] = useState('Loading...')

    if (config.images) {
        const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
        return (
            <>
                <div>
                    <div className="bg-gray-600 flex-shrink-0 flex w-32 md:w-48 text-gray-100 rounded-xl text-center m-1 md:mx-2 overflow-hidden transform hover:-translate-y-4 transition shadow-lg">
                        <Link to={`/media/${movie.id}/${props.type}`}>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-56 md:h-80 w-32 md:w-48 object-fill font-bold" src={posterUrl} alt={text} ></img >
                            {/* <canvas style={styles.votingMeter} className="absolute bg-green-400 rounded-full " width="40" height="40"></canvas> */}
                        </Link>
                    </div>
                    <p className="h-10 text-gray-300 mx-auto font-medium text-center truncate text-base md:text-base p-1 w-32 md:w-48">{movie.name || movie.title}</p>
                    </div>
            </>
        )
    } else {
        return <div className="w-80 rounded-xl h-56 md:h-80 w-32 md:w-48">Loading</div>
    }

}

export default React.memo(MovieCard)
