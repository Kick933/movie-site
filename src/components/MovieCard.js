import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../context/Config'
import '../img.css'

function MovieCard(props) {
    const {config} = useContext(Config)
    const movie = props.movie
    const [text,setText] = useState('Loading...')

    if (config.images) {
        const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
        return (
                <div className='rounded-xl transition-all transform hover:scale-125 hover:z-99 contrast-125 group'>
                    <div className="bg-gray-600 overflow-hidden rounded-xl border flex w-48 text-gray-100 transform relative hover:z-50  transition shadow-lg">
                        <Link to={`/media/${movie.id}/${props.type}`}>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-80 brightness-90 dark:brightness-75 w-48 rounded-xl object-fill font-bold" src={posterUrl} alt={text} ></img >
                        </Link>
                        <div className='opacity-0 bg-opacity-60 bg-black dark:bg-gray-500 w-full absolute text-white dark:text-gray-400 brightness-200 text-left bottom-0 p-2 group-hover:opacity-100'>
                           <p className="mx-auto font-semibold truncate text-base">{movie.name || movie.title}</p>
                            <p className='line-clamp-3 mx-auto text-sm'>{movie.overview}</p>
                        </div>
                    </div>
                    </div>
        )
    } else {
        return <div className="w-80 rounded-xl h-56 md:h-80 md:w-48">Loading</div>
    }

}

export default React.memo(MovieCard)
