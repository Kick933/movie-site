import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import ReviewCard from './ReviewCard'
//
//
// TODO : Add Pagination and option to hide revies altogether to declutter interface.
//
//

// Provides revies for movies as well as shows
// Takes type ('movies' or 'tv') as first argument.
// Takes movie/show id as second argument.
// Return a card with reviews along with pagination.
export default function Reviews({type,id}) {
    let url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    const deps = [type,id]
    const {data : reviews,loading,error} = useFetch(url,deps)
    if(!loading) console.log(reviews)
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
        <div className='max-w-6xl w-full border my-8 shadow-md justify-center p-4 rounded-xl flex'>
            <p className='font-bold text-gray-500'>We have no reviews available for this {type === 'tv' ? 'show' : 'movie'}</p>
        </div>
    )
    return (
        <div className='max-w-6xl w-full flex-col items-center gap-2 border my-8 shadow-md justify-center p-4 rounded-xl flex'>
            <p className='font-bold text-xl text-gray-700 mb-2 lg:mb-4'>Reviews</p>
            {reviews.results.map(i => <ReviewCard review={i} key={i.id} />)}
        </div>
    )
}
