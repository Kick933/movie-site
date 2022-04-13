import React from 'react'
import {  useNavigate } from 'react-router-dom'

function ErrorPage(props) {
    const wrongPath = props.wrongPath
    const navigate = useNavigate()
    function backHome(){
        navigate('/',{replace:'true'})
    }
    if(wrongPath === true){
        return(
            <div className='w-screen h-screen bg-gray-800 flex flex-col justify-center items-center text-xl text-gray-300'>
                <p className='h-10 text-gray-300 mx-auto font-medium text-center'>Hey,going offroading....</p>
                <p className='h-10 text-gray-300 mx-auto font-medium text-center'>Time to be back home.</p>
                <button onClick={backHome} className='w-28 text-lg text-black rounded-lg h-8 bg-green-400 hover:bg-green-500'>Go to Home</button>
            </div>
        )
    }else{
        return (
            <div className='w-screen h-screen bg-gray-800 flex flex-col justify-center items-center text-xl text-gray-300'>
                <p className='h-10 text-gray-300 mx-auto font-medium text-center'>Something went wrong.</p>
                <p className='h-10 text-gray-300 mx-auto font-medium text-center'>Check your internet connection.</p>
                <button onClick={backHome} className='w-28 text-lg text-black rounded-lg h-8 bg-violet-500 hover:bg-violet-400'>Go to Home</button>
            </div>
        )
    }
    
}

export default ErrorPage
