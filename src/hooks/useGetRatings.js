import axios from 'axios'
import {useEffect, useRef, useContext} from 'react'
import { Config } from '../context/Config'
import { useFetch } from './useFetch'

export function useGetRatings(type,id) {
    let mounted = true
    let ref = useRef(null)
    ref.current = mounted
    const {session} = useContext(Config)
    let url = `https://api.themoviedb.org/3/${type}/${id}/account_states?api_key=${process.env.REACT_APP_KEY}&session_id=${session}`
    let deps = [type,id,session]
    const { data, loading, error, setData } = useFetch(url,deps)
    useEffect(() =>{
        ref.current = true
        return () =>{
            ref.current = false
        }
    },[])
    function handleAdd(arg){
        let obj = {
            media_type: type,
            media_id: id,
            [arg]: !data[arg]
        }
        axios.post(`https://api.themoviedb.org/3/account/l/${arg}?api_key=${process.env.REACT_APP_KEY}&session_id=${session}`,obj)
        .then(res => {
            if(ref.current){
                setData(prevData => {
                    return {
                        ...data,
                        [arg] : !prevData[arg]
                    }
                })
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    function setRating(value, id){
        // Sets the rating of the movie/show
        let body = { value }
        let url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${process.env.REACT_APP_KEY}&session_id=${session}`
        axios.post(url,body)
        .then(res => {
            if(ref.current) setData(prevData => {
                return {
                    ...prevData,
                    rating:{
                        value
                    }
                }
            })
        })
    }

    function addWatchlist(){
        // Add the movie/show to watchlist
        handleAdd('watchlist')
    }

    function addFavorite(){
        // Add the movie/show to favorite list.
        handleAdd('favorite')
    }

    return { data, loading, error, setRating, addWatchlist, addFavorite }
}
