import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'
import { location , useNavigate } from 'react-router-dom'

function Nav() {
    const [menuActive, setMenuActive] = useState(false)
    
    function handleMenu(){
        setMenuActive(prev => !prev)
    }
    return (
        <div className='min-h-screen mb-16 dark:bg-black overflow-x-hidden'>
        <nav className="h-20 relative dark:bg-gray-900 dark:shadow-none  dark:border-gray-400 shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 grow-0 justify-between items-center h-12">
                <li onClick={handleMenu} className="flex transition-all text-4xl group text-sky-400 p-2 hover:scale-125 justify-center align-center group m-4">
                    {menuActive ? 
                    <AiFillCloseCircle />
                    : <GiHamburgerMenu />}
                    </li>
                <li>
                    <NavLink className="font-bold bg-transparent block mx-4 h-8 transition transform focus:text-sky-300 focus:outline-none hover:scale-105" to="/">The Movie Site</NavLink>
                    </li>
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
