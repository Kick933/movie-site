import React, {  useContext } from 'react'
import { Config } from '../../context/Config'
import { Navigate, useParams } from 'react-router-dom'
import Loading from '../Loading'
import Recommend from '../abstracts/Recommend'
import { useFetch } from '../../hooks/useFetch'
import Plot from '../abstracts/Plot'
import Genre from '../abstracts/Genre'
import { AccountStates } from '../abstracts/AccountStates'


function MoviePage() {
    const {config} = useContext(Config)
    let {id,type} = useParams()
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    let deps = [url, type, id]
    const { data: movieDetail, loading, error} = useFetch(url, deps, {})
    
    if (error){
        return <Navigate to='/error' wrongPath={false} />
    }
    if(!loading){
        let movieName = movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name
        document.title = movieName
        return (<>
            <div className="max-w-7xl my-12 grow-0 shrink-0 shadow-xl rounded-xl m-4 border py-16 w-full mx-auto flex flex-col lg:flex-row">
                <img 
                draggable='false'
                src={config.images ?
                    `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movieDetail.poster_path}`
                    : undefined} 
                className="max-w-xs min-w-fit w-full mx-auto lg:mx-8 shadow-xl border-4 border-sky-300 rounded-xl" 
                alt="Poster Not Found">
                    </img>
                <div className="flex px-4 justify-around content-center">
                    <div className="mx-4">
                        <div className='flex flex-col mt-8'>
                            <h1 className="font-bold antialiased text-sky-400 font-sans text-4xl">{movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name}</h1>  
                            <p className="text-lg text-gray-800">{movieDetail.tagline}</p>
                        </div>
                        <Genre data={movieDetail} />
                        <div className='flex gap-4 h-6'>
                            <AccountStates type={type} id={id} />
                        </div>
                        <Plot data={movieDetail} />
                    </div>
                </div>
            </div>
            {/* TODO : Add Cast details. */}
            <Recommend type={type} id={id} />
        </>)
    }
    return <Loading />
}

export default MoviePage
