import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

function Nav() {
    const [searchTerm, setSearchTerm] = useState('Search...')
    const history = useHistory()

    let theForm = useRef()

    function showMenu(){
        theForm.current.classList.toggle('hidden')
    }

    function handleChange(e) {
        const target = e.target
        setSearchTerm(target.value)
    }
    function search(e) {
        e.preventDefault()
        theForm.current.classList.remove('hidden')
        history.push(`/search/${searchTerm}`)
    }
    function empty(e) {
        const target = e.target
        if (target.value === "Search...") {
            setSearchTerm('')
        }
        if (target.value === '') {
            setSearchTerm('Search...')
        }
    }
    return (
        <>
        <nav className="h-20 rounded-xl shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 justify-between items-center h-12">
                <li><a className="font-bold transform block h-8 mx-auto transition" href="/">The Movie Site</a></li>
                <li><AiOutlineSearch className='text-3xl transition-transform hover:text-4xl hover:rotate-90'></AiOutlineSearch></li>
            </ul>
        </nav >
        {/* <nav className='h-20 shadow-xl md:hidden flex items-center justify-evenly'>
            <div onClick={showMenu} className='text-3xl text-sky-400 ml-4 flex items-center'><AiOutlineMenu></AiOutlineMenu></div>
            <ul className='w-full flex justify-center'>
                <li><a href="/" className='text-xl font-bold text-sky-400'>The Movie Site</a></li>
            </ul>
        </nav>
        <div ref={theForm} className='bg-white z-99 w-screen h-screen mt-20 relative'>
            <form onSubmit={search} className='flex flex-col gap-20 justify-center items-center'>
                <input
                    className="w-2/3 p-4 rounded-lg border-2 text-center" type="search"
                    onChange={handleChange}
                    onFocus={empty}
                    onBlur={empty}
                    value={searchTerm}>
                </input>
                <button className='w-56'>Submit</button>
            </form>
        </div> */}
        </>
    )
}

export default Nav
