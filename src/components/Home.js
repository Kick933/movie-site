import React from 'react'
import Trending from './Trending'

function Home({ config }) {
    document.title = "Home - Movie Database"
    return (
        <>
            <Trending config={config} find="trending" type='movie' text="in Movies" />
            <Trending config={config} find="trending" type='tv' text="on TV" />
            <Trending config={config} find="discover" type='movie' text="Movies" />
            <Trending config={config} find="discover" type="tv" text="Shows" />
        </>
    )
}

export default Home
