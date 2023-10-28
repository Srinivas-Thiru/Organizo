'use client'

import React, { useEffect } from 'react'
import SideNav from './SideNav'
import Board from './Board/Board'
import { useState  } from 'react'
import RightNav from './RightNav'


const getBoards = async() => {
  try {
      const res = await fetch("http://localhost:3000/api/boards", {cache: "no-store"});
      if (!res.ok) {
          throw new Error("Fetching Failed")
      }
      const data = await res.json()
      return data
  } catch (err) {
      console.log("Error: ", err);
  }
}
const getCard = async (cardId) => {
  try {
    const getRequest = 'http:localhost:3000/api/cards/' + cardId;
    const res = await fetch(getRequest, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch Cards.');
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

const getUserData = async (userId) => {
  try {
    const getRequest = 'http:localhost:3000/api/user/' + userId;
    const res = await fetch(getRequest, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch Cards.');
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

const getLists = async(listId) => {
  try {
      const getRequest = "http://localhost:3000/api/lists/" + listId;
      const res = await fetch(getRequest, {cache: "no-store"});
      if (!res.ok) {
          throw new Error("Fetching Failed")
      }
      const data = await res.json()
      return data
  } catch (err) {
      console.log("Error: ", err);
  }
}

const SideNavAndBoard = ( {boardId ={}  ,allUsers,newBoards, boardsData, session}) => {

  const [newCurrentB, setNewCurrentB] = useState(newBoards.find((board) => board._id === boardId.id) || newBoards[0]);

  const [allBoards, setAllBoards] = useState(newBoards)
  const[isOpen, setIsOpen] = useState(false)

  function handleClick() {
    return setIsOpen(!isOpen)
}

    return (
    <div className='flex h-screen rounded-3xl bg-[--bg-board'> 
         { newCurrentB && <><SideNav allUsers={allUsers} newCurrentB={newCurrentB} setNewCurrentB = {setNewCurrentB}  allBoards={allBoards} setAllBoards={setAllBoards}  session={session}/>
       <div className=''>
          
        {newCurrentB && <Board session={session} allUsers={allUsers} newCurrentB={newCurrentB} setNewCurrentB = {setNewCurrentB}  allBoards={allBoards} setAllBoards={setAllBoards}></Board>}
       </div>
     {/* <RightNav currentBoardId={currentBoardId} boardsArray={boards}/> */}

        </>}
    </div>
  )
}

export default SideNavAndBoard