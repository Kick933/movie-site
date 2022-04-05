import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

function Nav() {
    return (
        <div className='min-h-screen dark:bg-black overflow-x-hidden'>
        <nav className="h-20 dark:bg-gray-900 dark:shadow-none  dark:border-gray-400 shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 justify-between items-center h-12">
                <li><NavLink className="font-bold bg-transparent block h-8 mx-auto transition transform focus:text-sky-300 focus:outline-none hover:scale-105" to="/">The Movie Site</NavLink></li>
                <li>
                    <NavLink to='/search'>
                        <AiOutlineSearch className='text-3xl transition-transform hover:text-4xl hover:rotate-90'></AiOutlineSearch>
                    </NavLink>
                </li>
            </ul>
        </nav >
        <Outlet className='transition-opacity'/>
        </div>
    )
}

export default Nav
