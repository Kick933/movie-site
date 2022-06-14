import React, {useContext} from 'react'
import { Config } from '../context/Config'
import Loading from './Loading'
import Trending from './Trending'
import { useNavigate } from 'react-router-dom'

function FrontPage() {
    const {config, loading, error} = useContext(Config)
    const navigate = useNavigate()
    document.title = "Home - Movie Database"
    if(error) navigate('/error')
    return loading ? <Loading /> : (
        <div className='w-screen mt-4 overflow-visible'>
            <Trending config={config} find="trending" type='movie' text="in Movies" />
            <Trending config={config} find="trending" type='tv' text="on TV" />
            <Trending config={config} find="discover" type='movie' text="Movies" />
            <Trending config={config} find="discover" type="tv" text="Shows" />
        </div>
    )
    }

export default FrontPage
