import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { AiFillHeart, AiFillMail } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'
import Logo from '../images/logo.svg'

export default function Footer() {
  return (
    <div className='w-full flex-wrap md:flex-row py-8 gap-16 relative text-gray-600 bottom-0 left-0 right-0 border-2 bg-white border-sky-300 rounded-t-xl flex items-center justify-evenly'>
        <p>Check out my Portfolio</p>
        <div className='flex flex-col md:flex-row gap-2'>
            <p className='text-gray-500'>Connect with me</p>
            <div className='items-center flex text-xl justify-center gap-4'>
            <a href="https://www.linkedin.com/in/pavitar-kumar-a964ab1a4/">
                <FaLinkedin className='text-blue-600 text-xl' />
            </a>
            <a href='https://github.com/Kick933'>
                <BsGithub className='text-gray-900' />
            </a>
            <a href='mailto:pavitrsheoran003@gmail.com'>
                <AiFillMail className='text-orange-500  text-xl hover:text-blue-600' />
            </a>
            </div>
        </div>
        <p>Made with <AiFillHeart className='inline text-xl text-red-500' /> by kick933</p>
        <span><a href='https://www.themoviedb.org/'>Powered by <img alt='TMDB Logo' src={Logo} /></a></span>
    </div>
  )
}
