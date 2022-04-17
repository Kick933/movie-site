import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet, NavLink } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

function Nav() {
    const location = useLocation()
    const navigate = useNavigate()
    function goBack(){
        navigate(-1)
    }
    return (
        <div className='min-h-screen transition-all mb-16 dark:bg-black overflow-x-hidden'>
        <nav className="h-20 dark:bg-gray-900 dark:shadow-none  dark:border-gray-400 shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 grow-0 justify-between items-center h-12">
                {location.pathname !== '/' ? <li>
                    <IoArrowBackCircleOutline onClick={goBack} className='font-bold text-4xl hover:text-white hover:bg-sky-400 rounded-full transition-all hover:scale-125 mx-4'></IoArrowBackCircleOutline>
                </li> : null}
                <li><NavLink className="font-bold bg-transparent block mx-4 h-8 transition transform focus:text-sky-300 focus:outline-none hover:scale-105" to="/">The Movie Site</NavLink></li>
                <li>
                    <NavLink className='flex text-4xl hover:scale-125 justify-center align-center group m-4' to='/search'>
                        <AiOutlineSearch className='transition-all group-hover:text-white p-1 group-hover:bg-sky-400 rounded-full'></AiOutlineSearch>
                    </NavLink>
                </li>
            </ul>
        </nav >
        <Outlet className='transition-opacity'/>
        </div>
    )
}

export default Nav
