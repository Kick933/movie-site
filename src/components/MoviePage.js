import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Credits from './Credits'
import Loading from './Loading'


function MoviePage(props) {
    const config = props.config
    const param = useParams()
    const [loading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const [movieDetail, setMovieDetail] = useState({})
    document.title = movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name || "Loading..."


    // Get Movie details.
    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/${param.type}/${param.id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
            const data = await rawData.json()
            if(mounted){
                setMovieDetail(data)
                setLoading(false)
            }
        }
        try {
                fetchData()
        } catch (err) {
            setError(true)
            console.log(err.message)
        }
        return () => {
            mounted = false
        }
    }, [param.id, param.type])

    if (isError){
        return <Navigate to='/error' wrongPath={false} />
    }
    console.log(movieDetail)
    return !loading ?
        (<>
            <div className="pt-16 w-4/5 mx-auto flex flex-col md:flex-row">
                {config.images ? <img src={`${config.images.secure_base_url}${config.images.poster_sizes[3]}${movieDetail.poster_path}`} className="max-w-xs block mx-auto md:mx-8 shadow-xl border-4 border-sky-300  rounded-xl" alt="Poster Not Found"></img> : null }
                <div className="flex px-4 justify-center">
                    <div className="mx-auto text-center md:text-left">
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
            <Credits id={param.id}/>
        </>) :
        <Loading />
}

export default React.memo(MoviePage)
