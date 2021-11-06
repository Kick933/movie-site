import React from 'react'
import { Link } from 'react-router-dom'

function MovieCard(props) {
    const config = props.config
    const movie = props.movie
    if (config.images) {
        const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
        return (
            <div className="bg-gray-600 flex-shrink-0 w-32 md:w-48 text-gray-100 rounded-xl border-1 border-gray-400 m-1 md:mx-4 overflow-hidden transform hover:-translate-y-4 transition shadow-lg">
                <Link to={`/media/${movie.id}/${props.type}`}>
                    <img loading="lazy" draggable="false" className="object-fit w-48" src={posterUrl} alt="No Poster found" ></img >
                    {/* <canvas style={styles.votingMeter} className="absolute bg-green-400 rounded-full " width="40" height="40"></canvas> */}
                    <p className="h-10 text-bold text-center truncate text-sm md:text-base p-2">{movie.name || movie.title}</p>
                </Link>
            </div>
        )
    } else {
        return <div className="w-80 rounded-xl">Loading</div>
    }

}

export default MovieCard
