import React from 'react'

export default function FullScreen(props) {
  return (
    <div className='w-full h-screen flex justify-center flex-col flex-shrink-0 flex-grow-0 items-center'>
        {props.children}
    </div>
  )
}
