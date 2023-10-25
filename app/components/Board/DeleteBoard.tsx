'use client'

import React from 'react'
import { Button } from '@mui/material'

const DeleteBoard = ({currentBoardId, delBoard}) => {
  return (
    <div>
        <Button id={currentBoardId} onClick={delBoard} >Delete this Board</Button>
    </div>
  )
}

export default DeleteBoard