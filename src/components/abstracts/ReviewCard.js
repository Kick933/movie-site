import React, {useRef, useState} from 'react'
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'

export default function ReviewCard({review}) {
    const ref = useRef(null)
    const [hidden,setHidden] = useState(true)
    console.log(review)
    function handleClick(){
        ref.current.classList.toggle('line-clamp-2')
        setHidden(prev => !prev)
    }

    function timeProvider(arg){
        let date = arg.substring(0,10)
        date = date.split('-').reverse().join('-')
        let time = arg.substring(11,16)
        return time + " " + date
    }
  return (
    <div className='w-11/12 border border-gray-300 rounded-lg lg:p-2 flex flex-col justify-center content-center shadow-sm'>
        <div className='border-b bg-gray-100 flex p-2 justify-between items-center text-gray-600'>
            <p>By <em>{review.author}</em></p>
            <p>{timeProvider(review.updated_at)}</p>
        </div>
        <div className='flex flex-col p-4'>
            <p ref={ref} className='text-gray-600 text-start line-clamp-2'>{review.content}</p>
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
