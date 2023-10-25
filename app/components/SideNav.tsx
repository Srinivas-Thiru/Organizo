'use client'

import React from 'react'
import { useState  } from 'react'
import AddCardModal from './AddCardModal'
import { Button } from '@mui/material'
import { UsersDropdown } from './UsersDropdown'
import ButtonCmp from './Button/ButtonCmp'
import "../globals.css"


const SideNav = ({newCurrentB, setNewCurrentB, setAllBoards, allBoards, session }) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
     return setIsOpen(!isOpen)
 }

 async function createBoard(e: any) {
     e.preventDefault();
     const data = {
         title: e.target.title.value,
         lists: [],
         users: [session.user._id]
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
}

   
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
                    {/* <div className='flex flex-col my-4'>
                      <UsersDropdown allUsers={allUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}  />
                    </div> */}
                    <Button type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</Button>
                </form>
            </div>
          </AddCardModal>
        }



        <div className="sidenav bg-[#f3efec] text-black text-center py-3 rounded-3xl" style={{ height: '90vh', width:'11vw'}}>
        <div className='w-[11vw] p-2 mb-3 text-center shadow-md'>
          YOUR BOARDS
        </div>
        {allBoards.map((board) => (
          board._id === newCurrentB._id ?
          <div key={board._id} onClick={handleSideNavClick} id={board._id} className=" sidenavbtn-selected  board cursor-pointer my-1  border-solid border-black py-3">
            {board.title}
          </div>
          :
          <div key={board._id}  onClick={handleSideNavClick} id={board._id} className="group sidenavbtn hover:bg-[#A9A59D] cursor-pointer my-1 py-3 rounded border-solid border-black">
            {board.title}
          </div>
        ))}
        <div className='mt-3 text-black'>
          <ButtonCmp handleClick={handleClick}  id={session.user._id} > + Create New Board </ButtonCmp>
        </div>
      </div>

    </div>
  )
}

export default SideNav