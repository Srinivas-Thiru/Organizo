'use client'

import React from 'react'
import DeleteBoard from './DeleteBoard'

const BoardNav = ({ newCurrentB, setNewCurrentB, newDelBoard}) => {
  
  return (
    <div className='w-[89vw] fixed  p-2 flex justify-between items-center shadow-md'>
        {newCurrentB && <><h1 className=''>{(newCurrentB.title)}</h1>
      <DeleteBoard currentBoardId={newCurrentB._id} delBoard={newDelBoard}/></>}
    </div>

  )
}

export default BoardNav