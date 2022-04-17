import React, { useEffect, useState, useContext } from 'react'
import { Config } from '../context/Config'
import { Navigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios'
import Recommend from './Recommend'


function MoviePage() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    const {config} = useContext(Config)
    const {id,type} = useParams()
    const [loading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const [movieDetail, setMovieDetail] = useState({})
    document.title = movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name || "Loading..."


    // Get Movie details.
    useEffect(() => {
        let mounted = true
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
        .then((res) => {
            if(mounted){
                setMovieDetail(res.data)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            if(mounted){
                setError(true)
                setLoading(false)
            }
        })
        return () => {
            mounted = false
        }
    }, [id, type])

    if (isError){
        return <Navigate to='/error' wrongPath={false} />
    }
    return !loading ?
        (<>
            <div className="max-w-6xl my-12 shadow-xl rounded-xl p-4 border py-16 w-full mx-auto flex flex-col lg:flex-row">
                {config.images ? <img src={`${config.images.secure_base_url}${config.images.poster_sizes[3]}${movieDetail.poster_path}`} className="max-w-xs w-full mx-auto lg:mx-8 shadow-xl border-4 border-sky-300 rounded-xl" alt="Poster Not Found"></img> : null }
                <div className="flex px-4 justify-center">
                    <div className="mx-auto text-center lg:text-left">
                        <h1 className="font-bold antialiased text-sky-400 mt-8 font-sans text-4xl">{movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name}</h1>
                        <p className="text-lg pb-1 text-gray-800">{movieDetail.tagline}</p>
                        <div className="py-0.5 text-sm text-gray-600">
                            <p className="py-1">Genre : {movieDetail.genres.map(i => i.name).join(', ')}</p>
                            <p className="py-1">{movieDetail.status}{movieDetail.release_date ? `: ${movieDetail.release_date}` : null}</p>
                            {movieDetail.runtime ? <p className="text-xs text-gray-600 py-1">Runtime: {movieDetail.runtime} Minutes</p> : null}
                        </div>
                        <div className="py-4 text-gray-700">
                            <p className="py-1 font-semibold">Overview</p>
                            <p className="bg-transparent ">{movieDetail.overview || "Plot unknown"}</p>
                        </div>
                    </div>

                </div>
            </div>
            {/* TODO : Add Cast details. */}
            <Recommend type={type} id={id} />
        </>) :
        <Loading />
}

export default React.memo(MoviePage)
