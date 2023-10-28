'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const BoardTitleCard = ({ board}) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/board/${board._id}`)
    }

  return (
    <div className=' w-1/2 text-xl px-5 mb-4  '>
          <div id={board._id} onClick={handleClick} className=' cursor-pointer hover:scale-105 bg-[--bg-list] px-7 flex items-center justify-center h-36 rounded-md'>{board.title}</div>
     </div>
  )
}

export default BoardTitleCard