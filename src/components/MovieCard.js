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
                <div className='snap-start scroll-smooth transition-transform transform hover:scale-125 relative hover:z-10 group'>
                    <div className="bg-gray-600 overflow-hidden flex-shrink-0 flex w-32 md:w-48 text-gray-100 rounded-xl text-center m-1 md:mx-2 transform relative hover:z-99  transition shadow-lg">
                        <Link to={`/media/${movie.id}/${props.type}`}>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-56 md:h-80 w-32 md:w-48 rounded-xl object-fill font-bold" src={posterUrl} alt={text} ></img >
                            {/* <canvas style={styles.votingMeter} className="absolute bg-green-400 rounded-full " width="40" height="40"></canvas> */}
                        </Link>
                        <div className='opacity-0 w-full absolute text-left bottom-2 pl-2 group-hover:opacity-100'>
                           <p className=" text-white mx-auto font-semibold text-left truncate text-base">{movie.name || movie.title}</p>
                            <p className='line-clamp-3 text-white mx-auto text-left text-sm'>{movie.overview}</p>
                        </div>
                    </div>
                    </div>
        )
    } else {
        return <div className="w-80 rounded-xl h-56 md:h-80 md:w-48">Loading</div>
    }

}

export default React.memo(MovieCard)
