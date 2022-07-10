import React from 'react'
import ListCard from './ListCard'

export default function CardList({data, type}) {
  return (
    <div className='w-full flex flex-col justify-center content-center'>
        {data.map(i => <ListCard type={type} movie={i} key={i.id}/>)}
    </div>
  )
}

