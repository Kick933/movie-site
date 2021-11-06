import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { v4 } from 'uuid' //Unique key generation

function Trending(props) {
    const [trending, setTrending] = useState({})
    const config = props.config
    // Fetch trending movies and TV shows or discover movie and shows.
    useEffect(() => {
        const fetchData = async () => {
            let time = '/day'
            if (props.find === 'discover') time = ""
            const data = await fetch(`https://api.themoviedb.org/3/${props.find}/${props.type}${time}?api_key=${process.env.REACT_APP_KEY}`)
            const res = await data.json()
            setTrending(res)
        }
        if (props.type) {
            fetchData()
        }
    }, [props.type, props.find])
    // Fetch 

    if (!trending.results) {
        return (
            <div className="w-full bg-gray-900 text-center bg-opacity-50 p-4">
                <h1 className="text-white h-56">Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className="w-full sm:p-4 md:px-8 divide-y-2 divide-gray-300">
                <p className="text-xl text-gray-800 p-2">{props.find === 'trending' ? `Trending ${props.text}` : `Explore ${props.text}`}</p>
                <div className="w-full flex overflow-x-scroll scrollbar-hide md:overflow-x-scroll p-4">
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
