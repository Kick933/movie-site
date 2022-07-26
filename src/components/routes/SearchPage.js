import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../abstracts/MovieCard'
import { v4 } from 'uuid'
import Loading from '../Loading'

function SearchPage() {
    const { query } = useParams()
    const [show, setShows] = useState({
        total_pages: null,
        page: null,
        results: []
    })
    const [movie, setMovie] = useState({
        total_pages: null,
        page: null,
        results: []
    })
    const [moviePage,setMoviePage] = useState(1)
    const [showPage, setShowPage] = useState(1)
    const [loading, setLoading] = useState(true)
    document.title = `${query} - Search Results`

    function handlePage(arg) {
        if (loading) return
        if(arg === 'tv' && showPage < show.total_pages) setShowPage(showPage + 1)
        if(arg === 'movie' && moviePage < movie.total_pages) setMoviePage(moviePage + 1)
    }

    useEffect(() => {
        const fetchData = async (arg,page) => {
            const rawData = await fetch(`https://api.themoviedb.org/3/search/${arg}?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`)
            const data = await rawData.json()
            if(arg === 'movie'){
            if(moviePage === 1){
                setMovie(data)
            } else{
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
        } else if(arg === 'tv'){
                if(showPage === 1){
                    setShows(data)
                }else{
                    setShows(t => {
                        return ({
                            ...data,
                            results: [
                                ...t.results,
                                ...data.results
                            ]
                        })
                    })
                }
        } 
        }   
        try {
            // Reduces requests by checking change in page for each type.
            if(movie.page !== moviePage) fetchData('movie',moviePage)
            if(show.page !== showPage) fetchData('tv',showPage)
            setLoading(false)
        } catch (e) {
            console.log(e.message)
        }
    }, [moviePage, showPage, query,movie.page,show.page])
    if (loading) {
        return <Loading />
    }else{
        return <>
        {/* Movie results. */}
        <h2 className='w-11/12 mx-auto font-bold text-left p-2 text-2xl my-4 border-b-2 max-w-7xl'>Movies</h2>
            <div className="flex grow-0 shrink-0 flex-wrap justify-center items-center gap-4 lg:gap-12 w-full mx-2 max-w-7xl">
                {movie.results.length ? movie.results.map(movie =>
                    <MovieCard
                        type="movie"
                        movie={movie}
                        key={v4()} />
                ) : <p className="mx-auto my-32 self-center justify-self-center">No Results found</p>}
            {movie.total_pages > movie.page ? <button className='bg-gray-700 block font-bold text-gray-200 rounded-xl transform hover:-translate-y-2 w-48 h-48 sm:h-56 md:h-80 transition' onClick={() => handlePage('movie')}>{!loading ? "More..." : "Loading..."}</button> : null}
            </div>
            {/* Tv Show Results here */}
            <h2 className='w-11/12 mx-auto font-bold text-left p-2 text-2xl my-4 border-b-2 max-w-7xl'>Shows</h2>
            <div className="flex grow-0 shrink-0 flex-wrap justify-center items-center gap-4 lg:gap-8 w-full mb-8 max-w-7xl">
                {show.results.length ? show.results.map(movie =>
                    <MovieCard
                        type="tv"
                        movie={movie}
                        key={v4()} />
                ) : <p className="mx-auto my-32 self-center justify-self-center">No Results found</p>}
            {show.total_pages > show.page ? <button className='bg-gray-700 block my-4 font-bold text-gray-200 rounded-xl transform hover:-translate-y-2 w-48 h-48 sm:h-56 md:h-80 transition' onClick={() => handlePage('tv')}>{!loading ? "More..." : "Loading..."}</button> : null}
            </div>
            
        </>
    }
}

export default SearchPage
