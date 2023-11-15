'use client'


import React, { useState } from 'react'
import AddCardModal from './AddCardModal'
import  './Button/ButtonCmp.css'
import "../globals.css"

const AddListBtn = ({allBoards, setAllBoards,  newLists, setNewLists, boardId, setNewCurrentB, newCurrentB}) => {
    const [isOpen, setIsOpen] = useState(false)

     function handleClick() {
        setIsOpen(!isOpen)
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const data = {
            title:e.target.title.value,
            cards: [],
            boardId:boardId
        }

        const res = await fetch("http://localhost:3000/api/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error("Update Failed")
        }else {
            const newList= await res.json();
            setNewLists((prevNewLists) => [...prevNewLists, newList ]);
            const Boards = allBoards.map((board) => {
                if(board._id === newCurrentB._id) {
                    return { ...board, lists:[...board.lists,newList.list._id]};
                }
                else{
                    return board;
                    }
            })
            console.log("NEW BOARDS AFTER DELETING A LIST:" ,Boards)
            setAllBoards(Boards)          
        }
        setIsOpen(!isOpen)
    }

  return (
    <div >
        {isOpen && 
        <AddCardModal setIsOpen={setIsOpen} isOpen = {isOpen} >
            <div className='mx-10'> 
                <span className="flex justify-center font-bold text-3xl">New List</span>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="title">List Title: </label>
                        <input required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title"/>
                    </div>                                        
                    <button id={boardId} type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</button>
                </form>
            </div>
        </AddCardModal>
        }
        <div className='w-[30ch] px-4 text-[rgba(0,0,0,0.7)] ' >
          <button className='list-button z-10 opacity-90  hover:opacity-100 ' id={"addListBtn"} onClick={handleClick}  style={{boxShadow: '2px 2px 4px black'}}> + Add New List</button>
        </div>
        
    </div>
  )
}

export default AddListBtn