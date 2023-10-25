'use client'

import React, { useState } from 'react';
import AddCardModal from './AddCardModal';
import { Button } from '@mui/material';

const Card = ({cards, setCards, newCurrentB, cardObj, newLists, setNewLists }) => {
  const [cardIsopen, setCardIsOpen] = useState(false);

  const handleClick = () => {
    setCardIsOpen(!cardIsopen)
  }

  async function deleteReq(e: any) {
    try {
      const response = await fetch(`http://localhost:3000/api/cards?id=${e.target.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("card Deleted!")
        // Card was successfully deleted, update your UI as needed
        setCards((prevCards) => prevCards.filter((obj) => obj._id !== e.target.id));
        console.log("CARDS AFTER DELETION: ", cards)
      } else {
        console.error('Error deleting card:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
    setCardIsOpen(!cardIsopen)
  }
  
  return (
      <>
      {cardIsopen && <>
        <AddCardModal setIsOpen={setCardIsOpen} isOpen = {cardIsopen} >
          <div className='flex justify-center p-5'>
            <span className="text-center text-3xl font-bold bg-[#f3efec]">{cardObj.title}</span>
            <br />Description: {cardObj.description}
          </div>
          <Button id={cardObj._id} className='bg-red-500 p-2' onClick={deleteReq} >DELETE</Button>
        </AddCardModal>
      </>
      }

      {cardObj && <div 
        onClick={handleClick}
        className="bg-white border rounded-lg p-2 my-2 m-1 cursor-pointer"
        id={cardObj._id}
      >
        TITLE: {cardObj.title}
      </div>}</>
  );
};



export default Card;
