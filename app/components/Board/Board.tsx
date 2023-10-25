'use client'

import React, { useEffect, useState } from 'react'
import UserInfo from '../UserInfo'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ListComponent from '../ListComponent';
import { useSession } from 'next-auth/react';
import AddListBtn from '../AddListBtn';
import { Button } from '@mui/material';
import RightNav from '../RightNav';
import DeleteBoard from './DeleteBoard';
import BoardNav from './BoardNav';
import "./board.css"
  
const Board =  ({newCurrentB, setNewCurrentB, setAllBoards, allBoards, session }) => {
  //NEWWAY

  const getList = async(listId) => {
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

const[newLists, setNewLists] = useState([])

useEffect(() => {
  if(!newCurrentB.lists){
    setNewLists([])
  }
  const fetchLists = async () => {
    try {
      const listDataPromises = newCurrentB.lists.map((listId) => getList(listId).then(ans => ans.list));
      const listsData = await Promise.all(listDataPromises);
     console.log("NEWLISTSDATA: ", listsData)
      setNewLists(listsData);
      console.log("NEWLISTS: ", newLists)
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  fetchLists();
}, [newCurrentB])

useEffect(() => {
  if (newCurrentB) {
    // Find the current newCurrentB object in the updated allBoards
    const updatedCurrentB = allBoards.find(board => board._id === newCurrentB._id);
    if (updatedCurrentB) {
      // Update newCurrentB with the same object reference
      setNewCurrentB(updatedCurrentB);
    }
  }
}, [allBoards]);


  async function newDelBoard(e: any) {
    e.preventDefault();
    
    if (window.confirm('Are you sure?')){
    try {
      const res = await fetch(`http://localhost:3000/api/boards?id=${e.target.id}`,{
        method: "DELETE"
      })

    if (res.ok) {
      alert("Board Deleted!")
      setAllBoards((prevAllBoards) => prevAllBoards.filter((obj) => obj._id !== e.target.id))
      console.log("AFTER DELETED: ",allBoards)
      if (allBoards.length > 0) {
        setNewCurrentB(allBoards[allBoards.length - 2]);
      } else {
        setNewCurrentB(null); // No boards left
      }

    } else {
      console.error('Error deleting card:', res.statusText);
    }} catch (error) {
      console.error('Error deleting card:', error);
    }
  } 
}

  return (
    <div className='flex rounded-lg '>
    <div className='board scrollbar-invisble mr-3 ' style={{  height: '89vh', width:'89vw', overflowX: "scroll" }}>
      <BoardNav newCurrentB={newCurrentB} setNewCurrentB={setNewCurrentB} newDelBoard={newDelBoard} />
     {/* {// w-screen} */}

     <div className='flex pt-5 mt-10'>

     {newLists && newLists.map((obj) => obj && <ListComponent key={obj._id} session={session}  newCurrentB={newCurrentB}  newLists={newLists} setNewLists={setNewLists} listObj={obj} setNewCurrentB={setNewCurrentB} allBoards={allBoards} setAllBoards={setAllBoards} />)}
     <AddListBtn allBoards={allBoards} setAllBoards={setAllBoards} newCurrentB={newCurrentB} newLists={newLists} setNewLists={setNewLists} boardId={newCurrentB._id} setNewCurrentB={setNewCurrentB} >
        + Add List
     </AddListBtn>

    </div>
    </div>
    </div>
  )
}

export default Board

