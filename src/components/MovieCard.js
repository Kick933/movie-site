import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../context/Config'
import '../img.css'

function MovieCard(props) {
    const {config} = useContext(Config)
    const movie = props.movie
    const [text,setText] = useState('Loading...')

    if (config.images) {
        const posterSM = `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
        const posterLG = `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
        return (
                <div className='rounded-xl grow-0 shrink-0 relative contrast-125 group my-10 h-auto md:h-80 bg-white border flex flex-col w-36 md:w-48 text-gray-100 shadow-lg'>
                    <div className="bg-gray-600 group-hover:z-40 transform md:group-hover:scale-125 md:group-hover:absolute transition-all overflow-hidden flex rounded-xl w-36 md:w-48 text-gray-100 ">
                        <Link to={`/media/${movie.id}/${props.type}`}>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-56 md:hidden brightness-90 dark:brightness-75 w-48 rounded-xl object-fill font-bold" src={posterSM} alt={text} ></img >
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="h-56 hidden md:block md:h-80 brightness-90 dark:brightness-75 w-48 rounded-xl object-fill font-bold" src={posterLG} alt={text} ></img >
                        <div className='opacity-0 bg-opacity-60 bg-black dark:bg-gray-500 w-full absolute text-white dark:text-gray-400 brightness-200 text-left bottom-0 p-2 group-hover:opacity-100'>
                           <p className="mx-auto hidden md:block md:font-semibold truncate text-sm md:text-base">{movie.name || movie.title}</p>
                            <p className='line-clamp-3 font-extralight md:font-normal mx-auto md:text-sm'>{movie.overview}</p>
                        
                        </div>
                        </Link>
                    </div>
                    <p className='p-2 absolute left-0 right-0 -bottom-10 truncate group-hover:md:hidden transition-all rounded-md text-sm font-semibold block bg-black text-center'>{movie.name || movie.title}</p>
                    </div>
        )
    } else {
        return <div className="w-80 rounded-xl h-56 md:h-80 md:w-48">Loading</div>
    }

}

export default React.memo(MovieCard)
