
'use client'

import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddCardModal from './AddCardModal'
import ButtonCmp from './Button/ButtonCmp'
import "./Button/ButtonCmp.css"
import "../globals.css"

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // Ensure it's not imported during server-side rendering
  });

const AddCardBtn = ({boardUsers, newLists, setNewLists, cards, setCards, newCurrentB, id, session}) => {

      
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [description, setDescription] = useState('')
    
    const handleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
        // User is unchecking, remove the user ID from the list
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
        // User is checking, add the user ID to the list
        setSelectedUsers([...selectedUsers, userId]);
        }
    };
    

    
    
    const setModal = (prev) => {
        return setIsOpen(!prev)
    }

   
    const formatDueDate = (dateValue) => {
    const selectedDate = new Date(dateValue);
    selectedDate.setHours(23, 59, 59, 0); // Set the time to 23:59:59.000
    return selectedDate.toISOString(); // Convert to ISO string
    };

    async function handleClick(e: any) {
        e.preventDefault()

        const data = {
            title: String(e.target.title.value),
            description: description,
            assignedUsers:[...selectedUsers, session.user._id],
            label: String(e.target.label.value),
            dueDate: formatDueDate(e.target.dueDate.value),
            listId:id
        }        
        setModal(isOpen)

        const res = await fetch("http://localhost:3000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error("Update Failed")
        }else {
            const newCard = await res.json();
            setCards((prevCards) => [...prevCards, newCard.card]);
            console.log('newcard:', newCard)
            setDescription('')
        }            
    }

    const handleClickAddCard = () => {
        setIsOpen(!isOpen)
    }

    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months are 0-based
        let dd = today.getDate();
    
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }
    
        return `${yyyy}-${mm}-${dd}`;
    }

    return (
    <>
        {isOpen && 
        <AddCardModal setIsOpen={setIsOpen} isOpen = {isOpen} >
            <div className='FormModal'> 
                <span className=" flex justify-center font-bold text-3xl">New Card</span>
                <form onSubmit={handleClick}>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="title">Card Title: </label>
                        <input required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title"/>
                    </div>
                    {/* <div className='flex flex-col my-4'>
                        <label htmlFor="description">Card Description: </label>
                        <textarea required={true} className='border-solid bg-gray-100 border-spacing-1' rows={4}  id="description"/>
                    </div> */}
                    <div className="flex flex-col my-4 ">
                        <label htmlFor="description">Card Description:</label>
                        <div className=' bg-gray-300' >
                            <ReactQuill
                            value={description}
                            onChange={(value) => setDescription(value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="label">Label: </label>
                        <input required={true} className='border-solid bg-gray-100 border-spacing-1' type="text" id="label"/>
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="dueDate">Due Date (Today onwards): </label>
                        <input required={true} className='border-solid bg-gray-100 border-spacing-1' type="date" id="dueDate" min={getTomorrowDate()}  />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label>Assign to a Member?</label>
                        {boardUsers.length === 1 && <>No Members!</>}
                        {boardUsers.map((user) => (user._id !== session.user._id &&
                            <div key={user._id} className='flex items-center'>
                            <input
                                type='checkbox'
                                id={user._id}
                                name='assignedUsers'
                                value={user._id}
                                checked={selectedUsers.includes(user._id)}
                                onChange={() => handleUserSelection(user._id)}
                            />
                        <label htmlFor={user._id}>{user.name}</label>
                        </div>
                            ))}
                            
                    </div>

                    <button type='submit' className='px-4 py-1 my-4 w-24 bg-[--bg-sideNav] hover:bg-[--bg-list] rounded-md text-white '>Submit</button>
                </form>
            </div>
        </AddCardModal>
        }
        <div className=' -z-10 flex justify-center text-black '>
            <button className='glass-button mx-1 my-4 bg-[#dcd6cc73] w-36 hover:bg-[#dcd6cc]' id={id} onClick={handleClickAddCard}>+</button>
        </div>
    </>
  )
}

export default AddCardBtn






    // Convert the Set back to an array of unique user IDs
    // const uniqueUsersArray = currentBoardObj[0].listsList.map((list) => list.cardsList.map((card) => card.usersList.map((user) => user.user))).flat(3)

// Convert the Set back to an array

// uniqueUsersArray.map((user) => {
    
//     if (!uniqueId.includes(user._id)){
//         uniqueId.push(user._id)
//         uniqueUsers.push(user)
//     }
// })

