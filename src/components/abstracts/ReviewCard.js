import React, {useRef, useState} from 'react'
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

export default function ReviewCard({review}) {
    const ref = useRef(null)
    const [hidden,setHidden] = useState(true)
    function handleClick(){
        ref.current.classList.toggle('line-clamp-3')
        setHidden(prev => !prev)
    }

    function timeProvider(arg){
        let date = arg.substring(0,10)
        date = date.split('-').reverse().join('-')
        let time = arg.substring(11,16)
        return time + " " + date
    }
    const cleaned = DOMPurify.sanitize(review.content)
  return (
    <div className='w-11/12 border border-gray-300 rounded-lg lg:p-4 flex flex-col justify-center content-center shadow-sm'>
        <div className='border-b bg-gray-100 flex p-2 justify-between items-center text-gray-600'>
            <p>By <em>{review.author}</em></p>
            <p>{timeProvider(review.updated_at)}</p>
        </div>
        <div className='flex flex-col p-2 md:p-4'>
            <p ref={ref} className='text-gray-600 text-xs md:text-base text-justify line-clamp-3'>{parse(cleaned)}</p>
            <button 
            onClick={handleClick} 
            className='text-sky-400 flex justify-items-center items-center font-light underline-offset-4 underline self-end'
            >
                {
                    hidden ?
                    <><AiOutlineDown /> More</> :
                    <><AiOutlineUp /> Less</>
                }
            </button>
        </div>
    </div>
  )
}
