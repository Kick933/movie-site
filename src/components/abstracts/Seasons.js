import React, { useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import EpisodeCard from './EpisodeCard'
import { BiChevronDown, BiChevronUp} from 'react-icons/bi'

export default function Seasons({id, seasons}) {
    const [season, setSeason] = useState(1)
    let url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    const deps = [id,season]
    const {data: episodes, loading, error} = useFetch(url,deps)
    const content = useRef(null)
    const [hidden,setHidden] = useState(true)
    function hide(){
        setHidden(prev => !prev)
        content.current.classList.toggle('hidden')
        content.current.classList.toggle('flex')
    }
    return (
    <div className='max-w-7xl my-12 grow-0 shrink-0 shadow-xl rounded-xl m-4 border py-8 w-full mx-auto flex flex-col lg:flex-col'>
        <div className='mx-auto my-4 text-xl text-sky-500 font-bold'>Season</div>
        <div className='flex gap-2 mx-auto'>
            {seasons.map(i =>{
                if(i.season_number === season) return <div key={i.season_number} className='bg-sky-500 w-6 flex justify-center items-center h-8 text-center rounded-md text-white'>{i.season_number}</div>
                return <div onClick={() => setSeason(i.season_number)} key={i.season_number} className='bg-white h-8 border w-6 flex justify-center items-center text-center rounded-md border-gray-300 hover:text-white active:text-white hover:bg-sky-300 active:bg-sky-400'>{i.season_number}</div>
            })}
        </div>
        <div  onClick={hide} className='mx-auto transition-all text-sky-500 my-4 py-2 px-8 items-center justify-between text-xl font-bold flex border-2 rounded-xl w-full lg:w-11/12'>
            <p>Episodes</p>
            {/* Show down arrow if episodes are hidden. Else show up */}
            {hidden ? <BiChevronDown className='animate-pulse text-3xl'/> : <BiChevronUp  className='animate-pulse text-3xl'  />}
            </div>
        <div ref={content} className='hidden flex-col overflow-hidden w-full transition-all lg:w-11/12 justify-center items-center mx-auto p-4 gap-4 lg:gap-8'>
            {!loading && !error
            ? episodes.episodes.map(i => <EpisodeCard key={i.episode_number} data={i}/>)
            : <div className='font-bold animate-bounce text-sky-300'>Loading...</div>}
            </div>
    </div>
    )
}
