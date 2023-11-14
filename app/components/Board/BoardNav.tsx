'use client'

import React, { useState } from 'react'
import DeleteBoard from './DeleteBoard'
import { RiMore2Fill } from 'react-icons/ri'
import "../../globals.css"
import BoardMembers from './BoardMembers'

const BoardNav = ({session, allUsers, onBoardUpdate,newCurrentB, setNewCurrentB, newDelBoard}) => {
  
  

  return (
    <div className='z-40 boardNav opacity-100 items-center fixed bg-[--bg-boardNav] p-2 shadow-md flex justify-between'>
        {newCurrentB && <><h1 className='uppercase font-bold inline-block'>{newCurrentB.title}</h1>
        <div className='flex '>
          <BoardMembers onBoardUpdate={onBoardUpdate} session={session} allUsers={allUsers} newCurrentB={newCurrentB} setNewCurrentB={setNewCurrentB} />
          <DeleteBoard onBoardUpdate={onBoardUpdate} setNewCurrentB={setNewCurrentB} newCurrentB={newCurrentB} delBoard={newDelBoard}/>
        </div>
        </>}
    </div>

  )
}

export default BoardNav