import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/${param.type}/${param.id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
            const data = await rawData.json()
            setMovieDetail(data)
            setLoading(false)
        }
        try {
            fetchData()
        } catch (err) {
            setError(true)
            console.log(err.message)
        }

    }, [param.id, param.type])

    if (isError) return (
        <div className="flex flex-col md:flex-row md:justify-center lg:p-20 md:p-10">
            <p>Oh, Something is probably broken.</p>
        </div>
    )
    return !loading ?
        (<>
            <div className="bg-gray-900 md:h-screen">
                <div className="flex flex-col md:flex-row md:justify-center md:mx-auto md:p-10">
                    <img src={`${config.images.secure_base_url}${config.images.poster_sizes[4]}${movieDetail.poster_path}`} className="w-4/5 sm:w-96 md:w-96 lg:w-96 mx-auto mt-8 rounded-xl m-4" alt="Poster Not Found"></img>
                    <div className="text-center p-4 md:text-left text-white md:pt-10 md:pl-4">
                        <h1 className="font-extrabold antialiased font-sans text-4xl">{movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name}</h1>
                        <p className="text-gray-400 text-lg pb-1">{movieDetail.tagline}</p>
                        <div className="py-0.5 border-t-2 border-b-2 md:border-0 bg-gray-600 md:bg-transparent">
                            <p className="text-xs text-gray-400 py-1">Genre : {movieDetail.genres.map(i => i.name).join(', ')}</p>
                            <p className="text-xs text-gray-400 py-1">{movieDetail.status}{movieDetail.release_date ? `: ${movieDetail.release_date}` : null}</p>
                            {movieDetail.runtime ? <p className="text-xs text-gray-300 py-1">{movieDetail.runtime} Minutes</p> : null}
                        </div>
                        <div className="py-4">
                            <p className="text-gray-300 text-sm py-1">Overview</p>
                            <p className="text-lg bg-transparent text-gray-200">{movieDetail.overview || "Plot unknown"}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>) :
        <Loading />
}

export default React.memo(MoviePage)
