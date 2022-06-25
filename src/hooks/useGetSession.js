import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export function useGetSession() {
    const navigate = useNavigate()
    const [session, setSession] = useState(() => localStorage.session)
    const [search, setSearchParams] = useSearchParams()
    const request_token = search.get('request_token')
    const approved = search.get('approved')
    let mounted = true
    let ref = useRef(null)
    ref.current = mounted
    function logOut(){
        if(ref.current){
            const body = { data : {session_id : session}}
            let url = `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_KEY}`
            axios.delete(url,body)
            .then((res) => {
                if(ref.current){
                    setSession(undefined)
                    localStorage.removeItem('session')
                }
            })
            .catch((err) =>{
                console.log(err.message)
            })
            .finally(() => {
                navigate('/', {replace : true})
            })
        }
    }
    useEffect(() => {
        ref.current = true
        if(session === undefined && request_token && approved){
            let url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_KEY}`
            const body = { request_token }
            axios.post(url,body)
            .then(res => {
                if(res.data.success && ref.current){
                    setSession(res.data.session_id)
                    localStorage.session = res.data.session_id
                    setSearchParams({})
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        return () => ref.current = false
     },[session, approved, request_token, setSearchParams])
     return {session, logOut}
}
