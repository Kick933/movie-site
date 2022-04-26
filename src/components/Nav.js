import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai'
import { useLocation , useNavigate } from 'react-router-dom'
import Footer from './Footer'

function Nav() {
    const [menuActive, setMenuActive] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    
    function handleMenu(){
        if(location.pathname === '/menu'){
            navigate(-1)
            setMenuActive(prev => !prev)
        }else{
            navigate('/menu')
            setMenuActive(prev => !prev)
        }

    }
    return (
        <div className='min-h-screen dark:bg-black overflow-x-hidden flex justify-between flex-col'>
        <nav className="h-20 relative w-full dark:bg-gray-900 dark:shadow-none dark:border-gray-400 shadow-xl flex text-2xl text-sky-400 items-center">
            <ul className="flex mx-auto w-11/12 grow-0 justify-between items-center h-12">
                <li onClick={handleMenu} className="flex text-4xl group text-sky-400 p-2 hover:scale-125 justify-center align-center group m-4">
                    <AiFillCloseCircle className={menuActive ? "" : 'hidden'}/>
                    <GiHamburgerMenu className={menuActive ? 'hidden transition-all' : ''}/>
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
        <div className='flex flex-col grow-0 shrink-0 justify-center items-center w-full max-h-full'>
            <Outlet/>
        </div>
        <Footer />
        </div>
    )
}

export default Nav
