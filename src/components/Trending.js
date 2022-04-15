import React, { useState, useEffect  } from 'react'
import MovieCard from './MovieCard'
import { v4 } from 'uuid' //Unique key generation
// import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

function Trending(props) {
    const [trending, setTrending] = useState({
        total_pages: 1,
        results: []
    })
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)


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
            setLoading(false)
        }
        try {
            if(loading){
                fetchData()
            }
        } catch (e) {
            console.log(e.message)
        }

    }, [props.type, props.find, page,loading])

    // Handle increenting page
    function handlePage() {
        if (page < trending.total_pages && !loading) {
            setPage(page + 1)
            setLoading(true)
        }
    }
    // Handle Loading State
    return (
        <div className=" text-gray-800 dark:text-gray-300 md:px-8 overflow-y-visible">
            <p className="text-xl font-bold p-2 pl-4 border-b-2 border-gray-500">{props.find === 'trending' ? `Trending ${props.text}` : `Explore ${props.text}`}</p>
                {/* <button className="w-8 md:w-16 text-4xl h-56 hidden text-black border-black border-2 md:h-80 my-16 sm:flex items-center justify-center opacity-0 rounded-full hover:opacity-100 z-99 bg-white absolute left-0"><AiOutlineDoubleLeft/></button> */}
                <div className='flex gap-1 p-2 md:gap-8 md:py-10 overflow-y-visible overflow-x-scroll'>
                    {trending.results.map((movie,index) => <MovieCard type={props.type} movie={movie} data-index={index} key={v4()} />)}
                    {trending.total_pages > trending.page ? <button className='bg-gray-700 text-xl hover:text-white text-gray-300 rounded-xl px-16 mx-2 w-56 md:max-h-80' onClick={() => handlePage()}>{loading ? 'loading...' : 'More...'}</button> : null}
                </div>
                {/* <button className="w-8 md:w-16 text-4xl h-56 hidden text-black border-black border-2 md:h-80 my-16 sm:flex items-center justify-center opacity-0 rounded-full hover:opacity-100 z-99 bg-white absolute right-0"><AiOutlineDoubleRight/></button> */}
        </div >
    )

}

export default React.memo(Trending)
