import {useEffect, useState} from 'react'
import axios from 'axios'

export function useGetToken() {
    const [token, setToken] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        let mounted = true
            const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_KEY}`
            axios.get(url)
            .then((res)=>{
                if(mounted){
                    if(!(token && token.success)){
                        setToken(res.data)
                    }
                }
            })
            .catch(err => {
                console.log(err)
                setError(true)
            })

        return () => mounted = false
    },[token])

    return { token , error}
}
