import React from 'react'
import { Link } from 'react-router-dom'

function MovieCard(props) {
    const config = props.config
    const movie = props.movie
    if (config.images) {
        const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
        return (
            <div className="w-28 md:w-48 flex-shrink-0 rounded-xl border-2 border-gray-800 bg-gray-800 m-2 overflow-hidden focus:outline- active:outline-indigo hover:outline-white">
                <Link to={`/media/${movie.id}/${props.type}`}>
                    <img draggable="false" className="w-40 h-48 md:w-48 md:h-64 object-fit" src={posterUrl} alt="No Poster found" ></img >
                    <p className="hidden m-auto my-2 rounded-xl text-white text-center align-middle">{movie.name || movie.title}</p>
                </Link>
            </div>
        )
    } else {
        return <div className="w-80 rounded-xl">Loading</div>
    }

}

export default MovieCard
