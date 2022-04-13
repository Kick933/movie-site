import React, {useContext} from 'react'
import { Config } from '../context/Config'
import Loading from './Loading'
import Trending from './Trending'

function Home() {
    document.title = "Home - Movie Database"
    const {config, loading, error} = useContext(Config)
    return loading ? <Loading /> : (
        <div className='w-screen mt-4 overflow-visible'>
            <Trending config={config} find="trending" type='movie' text="in Movies" />
            <Trending config={config} find="trending" type='tv' text="on TV" />
            <Trending config={config} find="discover" type='movie' text="Movies" />
            <Trending config={config} find="discover" type="tv" text="Shows" />
        </div>
    )
    }

export default Home
