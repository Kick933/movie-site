import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Reviews from './Reviews'


function MoviePage(props) {
    const config = props.config
    const param = useParams()

    const [movieDetail, setMovieDetail] = useState({})

    // Get Movie details.
    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/${param.type}/${param.id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
            const data = await rawData.json()
            setMovieDetail(data)
        }
        try {
            fetchData()
        } catch (err) {
            console.log(err.message)
        }

    }, [param.id, param.type])

    // Get Credits & Cast details.
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const rawData = await fetch(`https://api.themoviedb.org/3/${param.type}/${param.id}/credits?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
    //         const data = await rawData.json()
    //         setCredits(data)
    //     }
    //     try {
    //         fetchData()
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }, [param.id, param.type])


    return !movieDetail.success && movieDetail.id && config.images ?
        (
            <>
                <div className="bg-gray-900">
                    <div className="flex flex-col md:flex-row md:justify-center lg:p-20 md:p-10">
                        <img src={`${config.images.secure_base_url}${config.images.poster_sizes[4]}${movieDetail.poster_path}`} className=" w-2/3 sm:w-96 mx-auto mt-8 rounded-xl object-fit h-auto" alt="Poster Not Found"></img>
                        <div className="text-left px-12 my-4 md:my-12 mx-6 sm:mx-auto text-white sm:px-10">
                            <h1 className="font-extrabold antialiased font-sans text-4xl">{movieDetail.name || movieDetail.title || movieDetail.original_title || movieDetail.original_name}</h1>
                            <p className="text-gray-400 text-lg pb-1">{movieDetail.tagline}</p>
                            <div className="py-0.5">
                                <p className="text-xs text-gray-400 py-1">Genre : {movieDetail.genres.map(i => i.name).join(', ')}</p>
                                <p className="text-xs text-gray-400 py-1">{movieDetail.status}{movieDetail.release_date ? `: ${movieDetail.release_date}` : null}</p>
                                {movieDetail.runtime ? <p className="text-xs text-gray-300 py-1">{movieDetail.runtime} Minutes</p> : null}
                            </div>
                            <div className="py-4">
                                <p className="text-gray-300 text-sm py-1">Overview</p>
                                <p className="text-lg text-gray-200">{movieDetail.overview || "Plot unknown"}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <Reviews id={movieDetail.id} />
            </>
        ) : <div className="flex flex-col md:flex-row md:justify-center lg:p-20 md:p-10">
            <p>Oh, Something is probably broken.</p>
        </div>
}

export default MoviePage
