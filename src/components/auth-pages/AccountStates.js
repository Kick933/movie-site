import React from 'react'
import {useGetRatings} from '../../hooks/useGetRatings'
import {AiFillClockCircle, AiOutlineClockCircle, AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

export const AccountStates = ({type,id}) => {
	const {data,loading,error,addWatchlist,addFavorite} = useGetRatings(type,id)
	if(error) return <div className='h-8 text-red-300'>Something went wrong!</div>
  if(loading) return <div className='h-8 text-gray-600'>Loading...</div>
	function addWatch(e){
		e.stopPropagation()
		addWatchlist()
	}
	function addFav(e){
		e.stopPropagation()
		addFavorite()
	}
	return (
    <div className='flex gap-4 h-8'>
    <button onClick={addWatch} title={data.watchlist ? "Remove from watchlist" : "Add to watchlist"} className='text-2xl lg:text-3xl text-black'>{data.watchlist ? <AiFillClockCircle/> : <AiOutlineClockCircle/>}</button>
    <button onClick={addFav} title={data.favorite ? "Remove from favourites" : "Add to favourites"} className='text-2xl lg:text-3xl text-red-500'>{data.favorite ? <AiFillHeart/> : <AiOutlineHeart/>}</button>
    </div>
  )
}
