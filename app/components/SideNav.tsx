'use client'

import React from 'react'
import { useState  } from 'react'
import AddCardModal from './AddCardModal'

import { UsersDropdown } from './UsersDropdown'
import  './Button/ButtonCmp.css'
import "../globals.css"
import UserSelection from './UserSelection'




const SideNav = ({allUsers,newCurrentB, setNewCurrentB, setAllBoards, allBoards, session }) => {
  const [isOpen, setIsOpen] = useState(false)

 

  function handleClick() {
     return setIsOpen(!isOpen)
 }

 const getIds = (users) => {
    return users.map((user) => user._id)
 }

 async function createBoard(e: any) {

     e.preventDefault();
      const newUsers = getIds(selectedUsers)

     const data = {
         title: e.target.title.value,
         lists: [],
         users: [session.user._id,...newUsers]
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
     setSelectedUsers([])
     setIsOpen(!isOpen)

 }


  const handleSideNavClick = (e: any) => {
    const selectedBoard = allBoards.find((board) => board._id === e.target.id) 
    setNewCurrentB(selectedBoard)
    console.log('clicked', selectedBoard);
}

const [selectedUsers, setSelectedUsers] = useState([])

   
  return (
    <div className=' '>
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
                    
                    <div className="flex flex-col my-4">
                      <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} allUsers={allUsers} session={session}/>
                    </div>
                    <button type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</button>
                </form>
            </div>
          </AddCardModal>
        }



        <div className="pb-10  overflow-y-scroll sidenav  bg-[--bg-sideNav] text-[--text-sideNav] text-center ">

        {/* <div className='text-[15px] py-[2.35ch] mb-4 font-mono  text-center shadow-md'>
        {session.user.name}
        </div> */}

        <div className='text-[15px] py-[2.35ch] mb-4 font-mono  text-center shadow-md'>
        YOUR BOARDS
        </div>

        {allBoards.map((board) => (
          board._id === newCurrentB._id ?
          <div key={board._id} onClick={handleSideNavClick} id={board._id} className=" sidenavbtn-selected bg-[--bg-board]  cursor-pointer my-1  border-solid border-black py-3">
            {board.title}
          </div>
          :
          <div key={board._id}  onClick={handleSideNavClick} id={board._id} className="group sidenavbtn hover:bg-[--bg-board] cursor-pointer my-1 py-3 rounded border-solid border-black">
            {board.title}
          </div>
        ))}

        <div >
          <button style={{width: 'min(90%, 30ch)'}} className='mt-3 hover:bg-[--bg-card] glass-button border hover:scale-105 hover:text-[#000] ' onClick={handleClick}  id={session.user._id} > + Create New Board </button>
        </div>
      </div>

    </div>
  )
}

export default SideNav