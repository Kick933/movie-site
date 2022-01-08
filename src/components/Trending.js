import React, { useState, useEffect, useRef } from 'react'
import MovieCard from './MovieCard'
import { v4 } from 'uuid' //Unique key generation
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
function Trending(props) {
    const [trending, setTrending] = useState({
        total_pages: 1,
        results: []
    })
    const [page, setPage] = useState(1)
    const config = props.config
    const container = useRef(null)

    function scrollLeft() {
        container.current.scrollLeft -= 200
    }

    function scrollRight() {
        container.current.scrollLeft += 200
    }

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
            <div className="w-full sm:p-2 group md:px-8 divide-gray-300 text-gray-200 relative">
                <p className="text-xl font-bold border-b-2 text-gray-200  p-2md:pl-8 pb-2">{props.find === 'trending' ? `Trending ${props.text}` : `Explore ${props.text}`}</p>
                <div className="w-full flex">
                    <button onClick={scrollLeft} className="w-8 md:w-16 h-56 hidden text-white md:h-80 my-4 sm:flex items-center justify-center opacity-0 rounded-l-xl group-hover:opacity-70 z-10 bg-gradient-to-r from-gray-400 to-gray-800"><AiOutlineDoubleLeft color='white' size="2em" /></button>
                    <div ref={container} className='flex overflow-x-scroll w-full mx-auto md:scrollbar-hide py-4'>
                        {trending.results.map(movie => <MovieCard type={props.type} config={config} movie={movie} key={v4()} />)}
                        {trending.total_pages > trending.page ? <button className='bg-gray-700 bg-opacity-70 text-gray-300 rounded-xl px-8 md:px-16 mx-2 transform hover:-translate-y-2 w-56 max-h-56 md:max-h-80 transition' onClick={() => handlePage()}>More...</button> : null}
                    </div>
                    <button onClick={scrollRight} className="w-8 md:w-16 h-56 md:h-80 my-4 hidden sm:flex justify-center items-center opacity-0 rounded-r-xl group-hover:opacity-70 z-10  bg-gradient-to-r to-gray-400 from-gray-800"><AiOutlineDoubleRight color='white' size="2em" /></button>
                </div>
            </div >
        )
    }

}

export default React.memo(Trending)
