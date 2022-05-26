import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'
import Footer from './Footer'
import Menu from './Menu'

function Nav() {
    const [menuActive, setMenuActive] = useState(false)
    
    function handleMenu(){
            setMenuActive(prev => !prev)
    }
    return (
        <div className='min-h-screen transition-all dark:bg-black overflow-x-hidden flex justify-between flex-col'>
        <nav className="h-20 relative w-full dark:bg-gray-900 dark:shadow-none dark:border-gray-400 shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 grow-0 justify-between items-center h-12">
                <li onClick={handleMenu} className="flex text-4xl group ease-in-out transition-all text-sky-400 p-2 hover:scale-125 hover:rotate-180 justify-center align-center group m-4">
                    <AiFillCloseCircle className={menuActive ? "" : 'hidden'}/>
                    <GiHamburgerMenu className={menuActive ? 'hidden' : ''}/>
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
        <div className='flex relative flex-col grow-0 shrink-0 justify-center items-center w-full max-h-full'>
            {menuActive ? <Menu /> : null}
            <Outlet/>
        </div>
        <Footer />
        </div>
    )
}

export default Nav
