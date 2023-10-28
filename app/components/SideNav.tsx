'use client'

import React from 'react'
import { useState  } from 'react'
import AddCardModal from './AddCardModal'
import { Button } from '@mui/material'
import { UsersDropdown } from './UsersDropdown'
import  './Button/ButtonCmp.css'
import "../globals.css"




const SideNav = ({allUsers,newCurrentB, setNewCurrentB, setAllBoards, allBoards, session }) => {
  const [isOpen, setIsOpen] = useState(false)

 

  function handleClick() {
     return setIsOpen(!isOpen)
 }

 async function createBoard(e: any) {
     e.preventDefault();
     const data = {
         title: e.target.title.value,
         lists: [],
         users: [...selectedUsers,session.user._id]
     }

     const res = await fetch("http://localhost:3000/api/boards", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
     });
     if (!res.ok) {
         throw new Error("Update Failed")
     }else {

         const newBoard= await res.json();

         // NEWWAY
         setNewCurrentB(newBoard.board)
         setAllBoards([...allBoards, newBoard.board])

     }
     setIsOpen(!isOpen)
 }


  const handleSideNavClick = (e: any) => {
    const selectedBoard = allBoards.find((board) => board._id === e.target.id) 
    setNewCurrentB(selectedBoard)
    console.log('clicked', selectedBoard);
}

const [selectedUsers, setSelectedUsers] = useState([])

   
  return (
    <div>
        {
          isOpen && 
          <AddCardModal setIsOpen={setIsOpen} isOpen = {isOpen} >

            <div className='mx-10'> 
                <span className="flex justify-center font-bold text-3xl">New Board</span>
                <form onSubmit={createBoard}>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="title">Board Title: </label>
                        <input required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title"/>
                    </div>                                        
                    <div className='flex flex-col my-4'>
                      <UsersDropdown session={session} allUsers={allUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}  />
                    </div>
                    <Button type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</Button>
                </form>
            </div>
          </AddCardModal>
        }



        <div className="sidenav  bg-[--bg-sideNav] text-[--text-sideNav] text-center " style={{ height: '90vh'}}>
        <div className='text-[15px] py-[2.35ch] mb-4 font-mono  text-center shadow-md'>
          YOUR BOARDS
        </div>
        {allBoards.map((board) => (
          board._id === newCurrentB._id ?
          <div key={board._id} onClick={handleSideNavClick} id={board._id} className=" text-black sidenavbtn-selected bg-[--bg-board]  cursor-pointer my-1  border-solid border-black py-3">
            {board.title}
          </div>
          :
          <div key={board._id}  onClick={handleSideNavClick} id={board._id} className="group sidenavbtn hover:bg-[--bg-board] cursor-pointer my-1 py-3 rounded border-solid border-black">
            {board.title}
          </div>
        ))}
        <div >
          <button style={{width: 'min(80%, 30ch)'}} className='mt-3 hover:bg-[#dcd6cc] hover:text-[#000] glass-button' onClick={handleClick}  id={session.user._id} > + Create New Board </button>
        </div>
      </div>

    </div>
  )
}

export default SideNav