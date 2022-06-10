import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetToken } from '../../hooks/useGetToken'
import FullScreen from '../abstracts/FullScreen'

export default function Login() {
    const { token, error} = useGetToken()
    const navigate = useNavigate()
    function handleRedirect(){
        if(token && token.success){
            const url = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=${document.location.origin}`
            window.location.href=url
        }
    }
    if(error) navigate('/error')
    return (
        <FullScreen>
            <p>You are being redirected to TMDB for login.</p>
            <button onClick={handleRedirect} className='block w-28 m-8 h-10 active:ring-2 active:bg-blue-600 active:ring-blue-600 bg-blue-400 hover:bg-blue-500 rounded-xl  text-white'>Let's Go</button>
        </FullScreen>
    )
}
