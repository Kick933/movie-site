import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
import { v4 } from 'uuid'
import Loading from './Loading'

function SearchPage(props) {
    const { query } = useParams()
    const [movie, setMovie] = useState({
        total_pages: null,
        page: null,
        results: []
    })
    const [loading, setLoading] = useState(true)
    document.title = `${query} - Search Results`
    const [page, setPage] = useState(1)

    function handlePage() {
        if (loading) return
        if (page < movie.total_pages) setPage(page + 1)
        setLoading(true)
    }

    useEffect(() => {
        if (page <= 1) return
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
            setLoading(false)
        } catch (e) {
            console.log(e.message)
        }
    }, [page, query])

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
            const data = await rawData.json()
            setMovie(data)
        }
        try {
            if (query !== undefined)
                fetchData()
            setLoading(false)
        } catch (e) {
            console.log(e.message)
        }
    }, [query])
    if (loading && movie.page === null) {
        return <Loading />
    } else {
        return <>
            <div className="flex w-full flex-wrap justify-center align-middle gap-2 pt-12">
                {movie.results.length ? movie.results.map(movie =>
                    <MovieCard
                        type="movie"
                        config={props.config}
                        movie={movie}
                        key={v4()} />
                ) : <p className="mx-auto my-32 self-center justify-self-center">No Results found</p>}
            </div>
            {movie.total_pages > movie.page ? <button className='bg-gray-700 block my-4 mx-auto font-bold text-gray-200 rounded-xl transform hover:-translate-y-2 w-48 h-48 sm:h-56 md:h-80 transition' onClick={() => handlePage()}>{!loading ? "More..." : "Loading..."}</button> : null}

        </>
    }
}

export default SearchPage
