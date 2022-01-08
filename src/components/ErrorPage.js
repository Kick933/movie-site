import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className='w-screen h-screen bg-gray-800 text-xl text-gray-300'>
            <p>Something Went Wrong.</p>
            <Link><button className=''>Go to Home</button></Link>
            
        </div>
    )
}

export default ErrorPage
