import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { v4 } from 'uuid' //Unique key generation

function Trending(props) {
    const [trending, setTrending] = useState({
        total_pages: 1,
        results: []
    })
    const [page, setPage] = useState(1)
    const config = props.config
    // Fetch trending movies and TV shows or discover movie and shows.
    useEffect(() => {
        const fetchData = async () => {
            let time = '/day'
            if (props.find === 'discover') time = ""
            const data = await fetch(`https://api.themoviedb.org/3/${props.find}/${props.type}${time}?api_key=${process.env.REACT_APP_KEY}&page=${page}`)
            const res = await data.json()
            setTrending(t => {
                return {
                    ...res,
                    results: [
                        ...t.results, ...res.results
                    ]
                }
            })
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e.message)
        }

    }, [props.type, props.find, page])

    function handlePage() {
        if (page < trending.total_pages) {
            setPage(page + 1)
        }
    }
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
                <div className="w-full flex overflow-x-scroll md:overflow-x-scroll p-4 relative">
                    {trending.results.map(movie => {
                        return (
                            <MovieCard type={props.type} config={config} movie={movie} key={v4()} />
                        )
                    })}
                    {trending.total_pages > trending.page ? <button className='bg-green-300 font-bold rounded-xl px-8 md:px-16 mx-2 transform hover:-translate-y-2 w-56 max-h-48 md:max-h-72 transition' onClick={() => handlePage()}>More...</button> : null}
                </div>
            </div >
        )
    }

}

export default React.memo(Trending)
