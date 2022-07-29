import React, {useContext} from 'react'
import { Config} from '../../context/Config'

export default function EpisodeCard({data}) {
    const {config} = useContext(Config)
    let url = `${config.images.secure_base_url}${config.images.still_sizes[2]}${data.still_path}`
    return (
        <div className='grid grid-cols-3 grid-rows-1 shadow-md mx-auto bg-gray-100 rounded-xl group overflow-hidden w-full'>
                <img className='brightness-90 h-full w-full block group-hover:brightness-100 object-cover from-sky-400 to-sky-100 bg-gradient-to-bl' src={url} alt={`Poster for Episode ${data.episode_number}`} ></img>
                <div className='h-max col-span-2 w-full px-2 lg:px-6 py-2 lg:py-4 gap-1 lg:gap-2 justify-start flex flex-col'>
                    {/* Name of episode */}
                    <p title={data.name || "Episode" +  data.episode_number} className='font-bold line-clamp-1 lg:text-xl mt-2 text-sky-400'>{data.episode_number + `. ` + data.name}</p>
                    {/* Description of episode */}
                    <p title={data.overview} className='text-sm ml-1 lg:text-base line-clamp-3'>{data.overview}</p>
                    <p className='text-sm text-gray-500 ml-1 my-2' title={data.air_date}>Released: {data.air_date}</p>
                </div>
        </div>
    )
}
