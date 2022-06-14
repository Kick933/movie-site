import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import { Config } from '../context/Config'

export function useGetUser() {
    const { session } = useContext(Config)
    const [user, setUser] = useState({})
    useEffect(() => {
        let mounted = true
        if(session){
            axios(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_KEY}&session_id=${session}`)
            .then(res => {
                if(mounted){
                    setUser(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        return () => mounted = false
    },[session])
    return user
}
