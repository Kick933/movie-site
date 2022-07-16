// Get faourite movies of the user.
// This component also provides watchList of user
import { useContext, useState } from 'react'
import { Config } from '../../context/Config'
import { useFetch } from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import CardList from '../abstracts/CardList'
import Loading from '../Loading'

export default function AccountLists() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const { session } = useContext(Config)
    const [type, setType] = useState('movies') // For fetching the list
    if(session === undefined) navigate('/login', {replace:true})
    const [page,setPage] = useState(1)
    let url = `https://api.themoviedb.org/3/account/{account_id}${pathname}/${type}?api_key=${process.env.REACT_APP_KEY}&session_id=${session}&language=en-US&sort_by=created_at.asc&page=${page}`
    const deps = [page,type, pathname]
    const {data, loading, error, setData} = useFetch(url,deps)
    document.title = `Movie Site : Favorite ${type}`
    function toggleType(arg){
      if(type === arg) return
      else{
        setType(arg)
        setData({})
        setPage(1)
      }
    }
    console.log(data)
    function nextPage(){
      if(page < data.total_pages) setPage(page => ++page)
    }
    function prevpage(){
      if(page > 1) setPage(page => --page)
    }
    if(error) navigate('/error')
    return (
      <div className='min-h-screen p-4'>
        <div className='flex w-screen h-16 border-b-2 border-sky-300 transition-all'>
          {type === 'movies' ?
          <>
          <button onClick={() => toggleType('movies')}  className='flex scale-125 text-sky-500 text-2xl font-bold transition-all justify-center items-center w-full h-full rounded-l-md'>Movies</button>
          <button onClick={() => toggleType('tv')} className='flex text-xl text-sky-500 hover:text-2xl hover:font-bold transition-all justify-center items-center w-full h-full rounded-r-md'>Tv Shows</button>
          </>
          : null
          }
          {type === 'tv' ?
          <>
          <button onClick={() => toggleType('tv')} className='flex text-sky-500 text-2xl font-bold transition-all justify-center items-center w-full h-full rounded-r-md'>Tv Shows</button>
          <button onClick={() => toggleType('movies')}  className='flex shadow-sm text-xl text-sky-500 hover:text-2xl hover:font-bold transition-all justify-center items-center w-full h-full rounded-l-md'>Movies</button>
          </>
          : null
          }
        </div>
        {!loading && data && data.results ? <CardList data={data.results} type={type === 'movies' ? 'movie' : 'tv'} /> : <Loading />}
        {/* Show next and previous button if total_pages > 1 */}
        {
        data && data.page && data.total_pages > 1
        ?<div className='mx-auto flex justify-center m-8 gap-4 items-center' >
          <button disabled={page === 1} onClick={prevpage} className="p-2 bg-gray-300 disabled:opacity-0 rounded-md hover:bg-sky-300 active:sky-400 "> Previous</button>
          <span>{page} of {data.total_pages} pages</span>
          <button disabled={page === data.total_pages} onClick={nextPage} className="p-2 bg-gray-300 disabled:opacity-0 rounded-md hover:bg-sky-300 active:sky-400 ">Next</button>
        </div> 
        : null
        }
      </div>
  )
}
