import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
import { v4 } from 'uuid'

function SearchPage(props) {
    const { query } = useParams()
    const [movie, setMovie] = useState({
        total_pages: 1,
        page: 1,
        results: []
    })
    document.title = `${query} - Search Results`
    const [page, setPage] = useState(1)

    function handlePage() {
        if (movie.page < movie.total_pages) setPage(page + 1)
    }

    useEffect((query) => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`)
            const data = await rawData.json()
            setMovie(t => {
                return ({
                    ...data,
                    results: [
                        ...t.results,
                        ...data.results
                    ]
                })
            })
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e.message)
        }
    }, [page])

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
            const data = await rawData.json()
            setMovie(data)
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e.message)
        }
    }, [query])

    if (movie.results) {
        return <>
            <div className="flex flex-wrap justify-center align-middle gap-4 py-24">
                {movie.results.length ? movie.results.map(movie =>
                    <MovieCard
                        type="movie"
                        config={props.config}
                        movie={movie}
                        key={v4()} />
                ) : <p className="mx-auto my-32 self-center justify-self-center">No Results found</p>}
                {movie.total_pages > movie.page ? <button className='bg-green-300 font-bold rounded-xl px-8 md:px-16 py-10 md:py-28 transform hover:-translate-y-2 min-h-48 md:max-h-72 transition' onClick={() => handlePage()}>More...</button> : null}
            </div>
        </>
    } else {
        return <div>Loading</div>
    }
}

export default SearchPage
