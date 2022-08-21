import React, {useState, useRef} from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useFetch } from '../../hooks/useFetch'
import ReviewCard from './ReviewCard'
//
//
// TODO : Add Pagination.
//

// Provides revies for movies as well as shows
// Takes type ('movies' or 'tv') as first argument.
// Takes movie/show id as second argument.
// Return a card with reviews along with pagination.
export default function Reviews({type,id}) {
    const [hidden,setHidden] = useState(true) // hidden state of reviews
    const ref = useRef(null) // Ref for reviews
    let url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    const deps = [type,id]
    const {data : reviews,loading,error} = useFetch(url,deps)
    if(!loading) console.log(reviews)
    function toggle(){
        ref.current.classList.toggle('hidden')
        ref.current.classList.toggle('flex')
        setHidden(prev => !prev)
    }
    if(loading) return (
        <div className='max-w-6xl w-full border my-8 shadow-md justify-center p-4 rounded-xl flex'>
            <p>Loading...</p>
        </div>
    )
    if(error) return (
        <div className='max-w-6xl w-full border my-8 shadow-md justify-center p-4 rounded-xl flex'>
            <p className='text-red-400'>Something went wrong</p>
        </div>
    )
    if(reviews.total_results === 0) return (
        <div className='max-w-7xl w-full border my-8 shadow-md justify-center p-4 rounded-xl flex'>
            <p className='font-bold text-gray-500'>We have no reviews available for this {type === 'tv' ? 'show' : 'movie'}</p>
        </div>
    )
    return (
        <div className='max-w-7xl w-full flex-col items-center gap-2 border my-4 lg:w-11/12 shadow-md justify-center py-4 rounded-xl flex'>
            <div onClick={toggle} className='flex text-xl text-sky-400 font-bold justify-between md:px-8 border-2 rounded-xl lg:w-11/12 p-2 w-full'>
                <p className=''>Reviews</p>
                {hidden ? <BiChevronDown className='text-3xl animate-pulse'/> : <BiChevronUp className='text-3xl animate-pulse' />}
            </div>
            <div ref={ref} className='hidden flex-col items-center mx-auto'>
                {reviews.results.map(i => <ReviewCard review={i} key={i.id} />)}
            </div>
        </div>
    )
}
