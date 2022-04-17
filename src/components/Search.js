import React, {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState()
  const searchBox = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    searchBox.current.focus()
  })

  function handleChange(e){
    const text = e.target.value.trim()
    if(text){
      setSearchTerm(text)
    }
  }

  function submit(e){
    e.preventDefault()
    let text = `/search/${searchTerm}`
    console.log(text)
    navigate(text)
  }
  return (
    <div className='my-28 mx-auto'>
        <form className='flex flex-col justify-center gap-8 items-center'>
          <label className='text-xl font-semibold' htmlFor='search'>Search for</label>
          <input type='text' ref={searchBox} onChange={handleChange} name='search' id='search' className='w-3/4 transition-all font-bold dark:bg-gray-900 text-center sm:w-96 mx-auto focus-visible:outline-none focus:border-sky-400 active:border-sky-400 border-sky-800 text-xl text-sky-600 h-16 p-2 block border-2 rounded-xl' placeholder='Enter Movie name' />
          <button onClick={submit} className='w-48 rounded-xl bg-sky-200 hover:bg-sky-400 hover:border-0 h-10 border-sky-300 border-2'>Search</button>
        </form>
    </div>
  )
}
