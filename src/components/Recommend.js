import React from 'react'
import MovieCard from './MovieCard'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function Recommend({type,id}) {
    const navigate = useNavigate()
    const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    const deps = [type,id, url]
    const {data, loading, error} = useFetch(url, deps, [])

    if(loading) return null
    if(error) navigate('/error')
    if(data.results.length === 0){
        return null
    }
    return (
        <div className='text-center md:p-2 mx-auto border rounded-xl shadow-md w-full max-w-6xl p-4'>
            <p className=' font-bold text-xl mx-auto'>Recommended</p>
            <div className='flex gap-1 p-2 md:gap-8 justify-center items-center md:py overflow-y-visible overflow-x-scroll'>
                {data.results.map(item => <MovieCard type={type} movie={item} key={item.id} />)}
            </div>
        </div>
    )
}
