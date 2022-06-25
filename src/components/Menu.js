import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../context/Config'
import {User} from '../context/User'

export default function Menu() {
  const user = useContext(User)
  const {logOut} = useContext(Config)
  return (
    <nav className='w-full flex justify-center top-0 left-0 right-0 min-h-screen absolute bg-white z-30 text-center text-2xl text-sky-600 flex-grow-0 flex-shrink-0'>
      <ul className='w-full flex flex-col justify-center items-center gap-4'>
        {/* Show login and signup if no user is defined. Else show Hi, {user.name} */}
        {!user.username ?
        <>
          <li className='w-80 h-20'><Link className='hover:text-sky-300 w-full p-2 block hover:scale-110 hover:border-b-4 rounded-md border-sky-300 border-b transition-all' to= '/login'>Login</Link></li>
          <li className='w-80 h-20'><Link className='hover:text-sky-300 w-full p-2 block hover:scale-110 hover:border-b-4 rounded-md border-sky-300 border-b transition-all' to= '/signup'>Sign Up</Link></li>
        </>: 
        <>
          {/* TODO : Add User Avatar. */}
          <li className='w-80 h-20'><span className='hover:text-sky-300 w-full p-2 block rounded-md border-sky-300 border-b transition-all'>Hi, {user.username}</span></li>
          <li className='w-80 h-20'><Link className='hover:text-sky-300 w-full p-2 block hover:scale-110 hover:border-b-4 rounded-md border-sky-300 border-b transition-all' to= '/movies'>My Movies</Link></li>
          <li className='w-80 h-20'><Link className='hover:text-sky-300 w-full p-2 block hover:scale-110 hover:border-b-4 rounded-md border-sky-300 border-b transition-all' to= '/shows'>My Shows</Link></li>  
          <li className='w-80 h-20'><button className='hover:text-white active:text-white active:bg-red-700 text-red-400 w-full p-2 block hover:bg-red-600 rounded-md border-red-400 border transition-all' onClick={logOut}>Log Out</button></li>  
        </>}
        </ul>
    </nav>
  )
}
