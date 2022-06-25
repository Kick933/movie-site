import axios from 'axios'
import {useContext, useEffect, useState, useRef} from 'react'
import { Config } from '../context/Config'

export function useGetUser() {
    const { session } = useContext(Config)
    const [user, setUser] = useState({})
    let mounted = true
    let ref = useRef(null)
    ref.current = mounted
    useEffect(() => {
        ref.current = true
        if(session){
            axios(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_KEY}&session_id=${session}`)
            .then(res => {
                if(ref.current){
                    setUser(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            if(ref.current) setUser({})
        }
        return () => ref.current = false
    },[session])
    return user
}
