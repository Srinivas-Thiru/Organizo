'use client'

import React, { useState } from 'react'
import DeleteBoard from './DeleteBoard'
import { RiMore2Fill } from 'react-icons/ri'
import "../../globals.css"

const BoardNav = ({ onBoardUpdate,newCurrentB, setNewCurrentB, newDelBoard}) => {
  
  

  return (
    <div className='z-40 boardNav items-center fixed bg-[--bg-boardNav] p-2 shadow-md flex justify-between'>
        {newCurrentB && <><h1 className='uppercase font-bold inline-block'>{newCurrentB.title}</h1>
      
        <DeleteBoard onBoardUpdate={onBoardUpdate} setNewCurrentB={setNewCurrentB} newCurrentB={newCurrentB} delBoard={newDelBoard}/></>}
    </div>

  )
}

export default BoardNav