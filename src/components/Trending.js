import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { v4 } from 'uuid' //Unique key generation

function Trending(props) {
    const [trending, setTrending] = useState({})
    const config = props.config


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`https://api.themoviedb.org/3/trending/${props.type}/day?api_key=${process.env.REACT_APP_KEY}`)
            const res = await data.json()
            setTrending(res)
        }
        fetchData()
    }, [props.type])
    if (!trending.results) {
        return (
            <div className="w-full bg-gray-900 text-center bg-opacity-50 p-4">
                <h1 className="text-white h-56">Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className="w-full bg-gray-900 bg-opacity-50 p-4">
                <p className="text-lg text-white mx-2">Trending {props.text}</p>
                <div className="w-full flex overflow-y-hidden overflow-x-scroll scrollbar-hide md:overflow-x-scroll">
                    {trending.results.map(movie => {
                        return (
                            <MovieCard type={props.type} config={config} movie={movie} key={v4()} />
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default Trending
