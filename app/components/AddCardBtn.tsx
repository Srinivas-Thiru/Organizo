
'use client'

import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddCardModal from './AddCardModal'

const AddCardBtn = ({newLists, setNewLists, cards, setCards, newCurrentB, id, session}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([]);
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
        // if (selectedUsers.length === 0) {
        //     alert("Please assign the card to atleast one of the users.");
        //     return; // Prevent form submission
        // }
        const data = {
            title: String(e.target.title.value),
            description: String(e.target.description.value),
            assignedUsers:[session.user._id],
            labels: String(e.target.label.value),
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
            <div> 
                <span className="flex justify-center font-bold text-3xl">New Card</span>
                <form onSubmit={handleClick}>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="title">Card Title: </label>
                        <input required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title"/>
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="description">Card Description: </label>
                        <textarea required={true} className='border-solid bg-gray-100 border-spacing-1' rows={4}  id="description"/>
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="label">Label: </label>
                        <input required={true} className='border-solid bg-gray-100 border-spacing-1' type="text" id="label"/>
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="dueDate">Due Date (Today onwards): </label>
                        <input required={true} className='border-solid bg-gray-100 border-spacing-1' type="date" id="dueDate" min={getTomorrowDate()}  />
                    </div>
                    {/* <div className='flex flex-col my-4'>
                        <label>Assigned Users(Select atleast one):</label>
                        {uniqueUsers.map((user) => (
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
                            
                    </div> */}

                                        
                    <Button type='submit' className='px-4 py-1 mb-3 w-24 bg-gray-700 text-white '>Submit</Button>
                </form>
            </div>
        </AddCardModal>
        }
        <Button id={id} onClick={handleClickAddCard}>+</Button>
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

// const handleUserSelection = (userId) => {
//     if (selectedUsers.includes(userId)) {
//     // User is unchecking, remove the user ID from the list
//     setSelectedUsers(selectedUsers.filter((id) => id !== userId));
//     } else {
//     // User is checking, add the user ID to the list
//     setSelectedUsers([...selectedUsers, userId]);
//     }
// };
