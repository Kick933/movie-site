import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetToken } from '../../hooks/useGetToken'
import FullScreen from '../abstracts/FullScreen'
import { Config } from '../../context/Config'

export default function Login() {
    const { token, error} = useGetToken()
    const { session } = useContext(Config)
    const navigate = useNavigate()
    function handleRedirect(){
        if(token && token.success){
            const url = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=${document.location.origin}`
            window.location.href=url
        }
    }
    function goHome(){
        navigate('/', {replace : true})
    }
    if(error) navigate('/error')
    if(session){
        return(
            <FullScreen>
            <p>You are already logged in. Wanna go to home page?</p>
            <button onClick={goHome} className='block w-28 m-8 h-10 active:ring-2 active:bg-blue-600 active:ring-blue-600 bg-blue-400 hover:bg-blue-500 rounded-xl  text-white'>Take me home</button>
        </FullScreen>
        )
    }
    return (
        <FullScreen>
            <p>You are being redirected to TMDB for login.</p>
            <button onClick={handleRedirect} className='block w-28 m-8 h-10 active:ring-2 active:bg-blue-600 active:ring-blue-600 bg-blue-400 hover:bg-blue-500 rounded-xl  text-white'>Let's Go</button>
        </FullScreen>
    )
}
