import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../context/Config'
import '../img.css'

function MovieCard(props) {
    const {config} = useContext(Config)
    const movie = props.movie
    const [text,setText] = useState('Loading...')

    if (config.images) {
        const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
        return (
                <div className='rounded-xl grow-0 shrink-0 transition-all transform hover:scale-125 hover:z-99 contrast-125 group bg-white overflow-hidden border flex flex-col w-36 md:w-48 text-gray-100 relative hover:z-50 shadow-lg'>
                    <div className="bg-gray-600 overflow-hidden h-max flex rounded-xl w-36 md:w-48 text-gray-100 relative ">
                        <Link to={`/media/${movie.id}/${props.type}`}>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-56 md:h-80 brightness-90 dark:brightness-75 w-48 rounded-xl object-fill font-bold" src={posterUrl} alt={text} ></img >
                        <div className='opacity-0 bg-opacity-60 bg-black dark:bg-gray-500 w-full absolute text-white dark:text-gray-400 brightness-200 text-left bottom-0 p-2 group-hover:opacity-100'>
                           <p className="mx-auto md:font-semibold truncate text-sm md:text-base">{movie.name || movie.title}</p>
                            <p className='line-clamp-3 font-extralight md:font-normal mx-auto md:text-sm'>{movie.overview}</p>
                        
                        </div>
                        </Link>
                    </div>
                    <p className='mt-2 h-8 group-hover:hidden transition-all rounded-md text-sm font-semibold py-2 bg-black text-center'>{movie.name || movie.title}</p>
                    </div>
        )
    } else {
        return <div className="w-80 rounded-xl h-56 md:h-80 md:w-48">Loading</div>
    }

}

export default React.memo(MovieCard)
