'use client'

import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { RiDeleteBinLine, RiMore2Fill, RiMore2Line, RiMoreLine } from 'react-icons/ri';
import "../../globals.css"
import Link from 'next/link';
import AddCardModal from '../AddCardModal';
import { useState } from 'react';


const DeleteBoard = ({onBoardUpdate,newCurrentB, delBoard, setNewCurrentB}) => {
 

  const [title, setTitle] = useState(newCurrentB.title)
  const [showModal, setShowModal] = useState(false)
  
  useEffect (() => {
    setTitle(newCurrentB.title)
  },[newCurrentB])

  const updateBoard = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/boards/${newCurrentB._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ newTitle:title })
      })
      if(res.ok){
        const response = await res.json()
        alert("Board Updated Successfully!")
        onBoardUpdate(response)
        setShowModal(!showModal)
      }
    }
    catch (err) {
      console.log("Update Failed: ", err)
    }
  }
    
  return (
    <div>
      {showModal && 
       <AddCardModal setIsOpen={setShowModal} isOpen = {showModal} >
       <div className='FormModal'> 
           <span className=" flex justify-center font-bold text-3xl">Edit Board</span>
           <form onSubmit={updateBoard}>
               <div className='flex flex-col my-4'>
                   <label htmlFor="title">Board Title: </label>
                   <input autoFocus required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
               </div>
               <button type='submit' className='px-4 py-1 my-4 w-24 bg-[--bg-sideNav] hover:bg-[--bg-list] rounded-md text-white '>Submit</button>
           </form>
       </div>
   </AddCardModal>
   }



      <div className=' relative group '>
          <div className='dropDown absolute w-[10ch] hidden group-hover:block  bg-white right-0 mt-2 py-2 h-25  shadow-lg rounded-md'>
              <button onClick={() => setShowModal(!showModal)} className=' block w-[10ch] px-4 py-2  text-slate-900 hover:bg-slate-100'>
                Edit
              </button>
              <button  id={newCurrentB._id}   onClick={delBoard} className=' mr-3 w-[10ch] block px-4 py-2  text-slate-900 hover:bg-slate-100'>
                Delete
              </button>
          </div>
          <RiMoreLine style={{fontSize: '40px'}} />
        </div>
    </div>
  )
} 

export default DeleteBoard