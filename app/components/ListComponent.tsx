'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card';
import AddCardBtn from './AddCardBtn';

const ListComponent =  ({allBoards, setAllBoards, newCurrentB, newLists, setNewLists,listObj, setNewCurrentB, session      }) => {  

  const [cards, setCards] = useState(listObj?.cards || []);

  const getCard = async(cardId) => {
    try {
        const getRequest = "http://localhost:3000/api/cards/" + cardId;
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

  // Update the cards details everytime a change is made in the Lists(client) 
  useEffect(() => {
    if(!listObj.cards){
      setCards([])
    }
    const fetchCards = async () => {
      try {
        const cardDataPromises = listObj.cards.map((cardId) => getCard(cardId).then(ans => ans.card));
        const cardsData = await Promise.all(cardDataPromises);
      console.log("CARDSDATA: ", cardsData)
        setCards(cardsData);
        console.log("NEWARDSS: ", cards)
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [newLists])

  async function delList(){
      try {
        const data = {
          listId: listObj._id,
          boardId: newCurrentB._id
        }
        const response = await fetch(`http://localhost:3000/api/lists`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
        if (response.ok) {
          alert("List Deleted!")
          // Card was successfully deleted, update your UI as needed
          setNewLists((prev) => prev.filter((obj) =>obj._id !== listObj._id))
        
          const Boards =  allBoards.map((board) => {
            if (board._id === newCurrentB._id) {
              return {
                ...board,
                lists: board.lists.filter((list) => list !== listObj._id),
              };
            } else {
              return board;
            }
          })
          console.log("NEWBOARDS: ", Boards)
          setAllBoards(Boards);
       
          
        } else {
          console.error('Error deleting card:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }

   return (
    <div style={{height: 'auto'}}>
    <div className="w-[225px] rounded-lg p-4 shadow-md bg-slate-50 mx-5 my-5"  >
    <div className='flex'>
    <h2 className="text-lg font-semibold mb-2">LIST NAME: {newLists && (listObj.title)}</h2>


    <button onClick={delList}>Del</button>
    </div>

    <div className="space-y-4">
      {cards && cards.map((card) => (
        <>
          <Card cards={cards} setCards={setCards} newCurrentB={newCurrentB}  cardObj={card} newLists={newLists} setNewLists={setNewLists} />
        </>
      ))}

      <AddCardBtn cards={cards} setCards={setCards} newCurrentB={newCurrentB} id={listObj._id} newLists={newLists} setNewLists={setNewLists} session={session}/>

    </div>
  </div></div>
  )
}

export default ListComponent

// const getBoards = async () => {
//     try {
//         const res = await fetch("http://localhost:3000/api/boards", {
//             cache: "no-store"
//         });
//         if(!res.ok){
//             throw new Error("Fetching Failed")
//         }
//         return res.json()
//     }
//     catch(err) {
//         console.log("Error: ", err);
//     }
// }



// const getCards = async (list) => {
//     const cardList = list.cards;
//     const allCards  = cardList.every(async (card) => {
//         try {
//             const getRequest = "http://localhost:3000/api/cards/" + card;
//             const res = await fetch(getRequest, {
//                 cache: "no-store"
//             });
//             if(!res.ok){
//                 throw new Error("Fetching Failed")
//             }
//         const data = await res.json() 

//             return data
//         }
//         catch(err) {
//             console.log("Error: ", err);
//         }
//     })


// }

// const getLists = async (lists) => {

//     const allLists  = lists.every(async (list) => {
//         try {
//             const getRequest = "http://localhost:3000/api/lists/" + list;
//             const res = await fetch(getRequest, {
//                 cache: "no-store"
//             });
//             if(!res.ok){
//                 throw new Error("Fetching Failed")
//             }
//         const data = await res.json() 
//         console.log(data)

//         return data
//         }
//         catch(err) {
//             console.log("Error: ", err);
//         }
//     })
// }






// const getUserId = async () => {
//     const { data: session, status } = useSession();
//     try {
//         const getRequest = "http://localhost:3000/api/user/" + session?.user?.email;
//         const res = await fetch(getRequest, {
//             cache: "no-store"
//         });
//         if(!res.ok){
//             throw new Error("Fetching Failed")
//         }
//         return res.json()
//     }
//     catch(err) {
//         console.log("Error: ", err);
//     }
// }





