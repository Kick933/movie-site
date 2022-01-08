import React from 'react'
import Trending from './Trending'

function Home({ config }) {
    document.title = "Home - Movie Database"
    if (config.images) {
        return (
            <div className='w-screen mt-4'>
                <Trending config={config} find="trending" type='movie' text="in Movies" />
                <Trending config={config} find="trending" type='tv' text="on TV" />
                <Trending config={config} find="discover" type='movie' text="Movies" />
                <Trending config={config} find="discover" type="tv" text="Shows" />
            </div>
        )
    } else {
        return (
            <div className='flex justify-center align-middle my-28'>
                <p className="text-gray-600 font-semibold text-xl mx-auto block">Please check your Internet connection.</p>
            </div>
        )
    }
}

export default Home
