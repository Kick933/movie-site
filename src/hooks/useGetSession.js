import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function useGetSession() {
    const [session, setSession] = useState(() => localStorage.session)
    const [search, setSearchParams] = useSearchParams()
    const request_token = search.get('request_token')
    const approved = search.get('approved')
    useEffect(() => {
        let mounted = true
        if(session === undefined && request_token && approved){
            let url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_KEY}`
            const body = { request_token }
            axios.post(url,body)
            .then(res => {
                if(res.data.success && mounted){
                    setSession(res.data.session_id)
                    localStorage.session = JSON.stringify(res.data.session_id)
                    setSearchParams({})
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        return () => mounted = false
     },[session, approved, request_token, setSearchParams])

     return { session }
}
