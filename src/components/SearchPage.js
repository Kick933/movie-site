import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
import { v4 } from 'uuid'

function SearchPage(props) {
    const param = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${param.query}&page=1&include_adult=false`)
            const data = await rawData.json()
            setMovie(data)
        }
        fetchData()
    }, [param.query])

    if (movie.results) {
        return <div className="grid grid-gap-4 grid-flow-row auto-rows-max grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-auto">
            {movie.results.map(movie =>
                <MovieCard
                    type="movie"
                    config={props.config}
                    movie={movie}
                    key={v4()} />
            )}
            <div className="text-white flex items-center justify-center bg-pink-500 text-center w-32 h-32 md:w-52 md:h-72 rounded-xl">
                <p className="text-xl text-white ">More...</p>
            </div>
        </div>
    } else {
        return <div>Loading</div>
    }
}

export default SearchPage
