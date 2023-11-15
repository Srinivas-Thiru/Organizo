'use client'
import { useState, useEffect } from 'react';


import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // Ensure it's not imported during server-side rendering
  });


function EditCardForm({ boardUsers, delId, deleteReq,cardObj, onUpdate, session }) {
  const [title, setTitle] = useState(cardObj.title);
  const [description, setDescription] = useState(cardObj.description);
  const [label, setLabel] = useState(cardObj.label);
  const [dueDate, setDueDate] = useState(cardObj.dueDate.slice(0, 10));
  const [selectedUsers,setSelectedUsers ] = useState(cardObj.assignedUsers)
  const handleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
    // User is unchecking, remove the user ID from the list
    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
    // User is checking, add the user ID to the list
    setSelectedUsers([...selectedUsers, userId]);
    }

};




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedCard = {
      newTitle: title,
      newDescription: description,
      label: label,
      dueDate: dueDate,
      assignedUsers:selectedUsers,
      
    };
    const requestBody = JSON.stringify(updatedCard)
    
    try{
    const response = await fetch(`http://localhost:3000/api/cards/${cardObj._id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
        },
      body: requestBody,

    });
    
    if (response.ok) {
    const updated = await response.json();
      alert("Updated");
      console.log(updated)
      onUpdate(updated.card)
    }else{
        alert("Update Failed:(")
    }
}
    catch(err){console.log("Error in updating card", err)};
  };

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
    <form onSubmit={handleSubmit }>
      <div className="flex flex-col my-4">
        <label htmlFor="title">Card Title:</label>
        <input
          required={true}
          className="border-solid bg-gray-100 border-spacing-1"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* <div className="flex flex-col my-4">
        <label htmlFor="description">Card Description:</label>
        <textarea
          required={true}
          className="border-solid bg-gray-100 border-spacing-1"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
      <div className="flex flex-col my-4">
        <label htmlFor="label">Label:</label>
        <input
          required={true}
          className="border-solid bg-gray-100 border-spacing-1"
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-4">
        <label htmlFor="dueData">Due:</label>
        <input
          required={true}
          className="border-solid bg-gray-100 border-spacing-1"
          type="date"
          id="dueData"
          value={dueDate}
          min={getTomorrowDate()}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
      </div>

<div className='flex flex-col my-4'>
                        <label>Assign to a Member?</label>
                        {boardUsers.length === 1 && <>No Members!</>}
                        {boardUsers.map((user) => ( user._id !== session.user._id &&
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
        <div className='flex justify-between'>

      <button type="submit" className="px-4 py-1 mb-3 w-24 bg-[--bg-sideNav] hover:bg-[--bg-list] rounded-md text-white">
        Save
      </button>
      <button id={delId} className='bg-red-500 px-4 py-1 mb-3 w-24 rounded-md' onClick={deleteReq} >DELETE</button>
      </div>
    </form>
  );
}

export default EditCardForm;
