'use client'
import React from 'react'
import { useState } from 'react'
import AddCardModal from './AddCardModal'
import { UsersDropdown } from './UsersDropdown'
import { useRouter } from 'next/navigation'
import UserSelection from './UserSelection'


const CreateBoard = ({ newBoards, userDetials, allUsers }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [allBoards,setAllBoards] = useState(newBoards)
    
    const getIds = (users) =>{ 
        return users.map((user) => user._id)
    }
    async function createBoard(e: any) {
      e.preventDefault();
    const newUsers = getIds(selectedUsers)
      const data = {
          title: e.target.title.value,
          lists: [],
          users: [userDetials.user._id, ...newUsers]
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
          setAllBoards([...allBoards, newBoard.board])
          onUpdate(newBoard)
          newBoards = [...allBoards, newBoard.board]
      }
      setSelectedUsers([])
      setIsOpen(!isOpen)
  }
  const router = useRouter()

  const onUpdate = (response) => {
      router.push(`/board/${response.board._id}`)
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
             
                <div className="flex flex-col my-4">
                <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} allUsers={allUsers} session={userDetials}/>
                </div>

                <button type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</button>
            </form>
        </div>
      </AddCardModal>

    }

<div onClick={() => setIsOpen(!isOpen)} className=' cursor-pointer hover:scale-110 bg-[--bg-list] px-7 flex items-center justify-center h-36  rounded-md font-mono uppercase' >+ create new board</div>
    </div>
  )
}

export default CreateBoard