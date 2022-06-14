import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { Config } from '../context/Config'

export function useGetToken() {
    const {session} = useContext(Config)
    const [token, setToken] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
            let mounted = true
            const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_KEY}`
            if(session === undefined && !(token && token.success)){
                axios.get(url)
                .then((res)=>{
                    if(mounted){
                            setToken(res.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                    setError(true)
                })
            }
        return () => mounted = false
    },[session, token])

    return { token , error}
}
