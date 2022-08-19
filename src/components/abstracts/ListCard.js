import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Config } from '../../context/Config'
import { AccountStates } from '../abstracts/AccountStates'

function ListCard({movie, type}) {
    const {config} = useContext(Config)
    const navigate = useNavigate()
    function goToLink(){
        navigate(`/media/${movie.id}/${type}`)
    }
    const [text,setText] = useState('Loading...')
    if (config.images) {
        const posterSM = `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
        return (
                <div className='rounded-xl grow-0 shrink-0 mt-8 mx-auto bg-white w-11/12 md:w-4/5 shadow-lg'>
                        <div onClick={goToLink} title={movie.title} className='grid h-min grid-cols-4 cursor-pointer' draggable='false'>
                            <img loading="lazy" draggable="false" onError={() => setText("Poster not available.")} className="rounded-l-xl max-h-fit font-bold" src={posterSM} alt={text} ></img >
                            <div className='col-span-3 m-2 md:m-4 flex flex-col items-start'>
                                <p className="block text-xl mb lg:mb-4 md:text-2xl font-bold text-sky-400">{movie.name || movie.title}</p>
                                <AccountStates type={type} id={movie.id} />
                                <p className='block mt lg:mt-8 text-sm text-gray-600 lg:text-base line-clamp-3'>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default React.memo(ListCard)
