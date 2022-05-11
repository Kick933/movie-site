import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { useNavigate } from 'react-router-dom'

export default function Recommend({type,id}) {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
        .then(function(res){
            if(mounted){
                setData(res.data)
                setLoading(false)
            }
        })
        .catch(function(error){
            console.log(error)
            if(mounted){
                setLoading(false)
                setError(true)
            }
        })
    },[id,type])
    if(loading) return null
    if(error) navigate('/error')
    if(data.results.length === 0){
        return null
    }
    return (
        <div className='text-center md:p-2 mx-auto border rounded-xl shadow-md w-full max-w-6xl p-4'>
            <p className=' font-bold text-xl mx-auto'>Recommended</p>
            <div className='flex gap-1 p-2 md:gap-8 md:py overflow-y-visible overflow-x-scroll'>
                {data.results.map(item => <MovieCard type={type} movie={item} key={item.id} />)}
            </div>
        </div>
    )
}
