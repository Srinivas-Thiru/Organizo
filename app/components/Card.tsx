'use client'

import React, { useState } from 'react';
import AddCardModal from './AddCardModal';
import { Button } from '@mui/material';
import EditCardForm from './EditCardForm';
import "../globals.css"
import CardMoreBtn from './CardMoreBtn';


const Card = ({listObj, session ,boardUsers, cards, setCards, newCurrentB, cardObj, newLists, setNewLists }) => {
  const [cardIsopen, setCardIsOpen] = useState(false);

  const handleClick = () => {
    setCardIsOpen(!cardIsopen)
  }

  const updateCard = (response) => {
    const newCards = cards.map((card) => card._id === response._id ? response : card)
    setCards(newCards)
    console.log(newCards)
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
            <span className="text-center text-3xl font-bold ">{cardObj.title}</span>
          </div>
          <EditCardForm session={session} boardUsers={boardUsers} cardObj={cardObj} onUpdate={updateCard} delId={cardObj._id} deleteReq={deleteReq} />
        </AddCardModal>
      </>
      }

      {cardObj && 

      <div draggable='true'
      className="card bg-[--bg-card] flex items-center justify-between border rounded-lg p-2 my-2 m-1 z-2 cursor-pointer"
      >
        
      <span onClick={handleClick}  className=' w-max'>{cardObj.title}</span>
      <CardMoreBtn listObj={listObj} newLists={newLists} setNewLists={setNewLists} id={cardObj._id} deleteReq={deleteReq} handleClick={handleClick} updateCard={updateCard} />
      </div>
}
      </>
  );
};



export default Card;
