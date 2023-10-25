'use client'

import React from 'react'
import { Button } from '@mui/material'
import { RiDeleteBinLine } from 'react-icons/ri';
import "../../globals.css"


const DeleteBoard = ({currentBoardId, delBoard}) => {
 
  return (
    <div className='mr-3 text-[#dd8458] delBtn'>
        <button>
         <RiDeleteBinLine style={{fontSize:"24px"}} />
      </button>
    </div>
  )
}

export default DeleteBoard