'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card';
import AddCardBtn from './AddCardBtn';
import { RiDeleteBinLine,RiMoreLine } from 'react-icons/ri';
import "../globals.css"
import AddCardModal from './AddCardModal';

const ListComponent =  ({allUsers, allBoards, setAllBoards, newCurrentB, newLists, setNewLists,listObj, setNewCurrentB, session      }) => {  

  const [cards, setCards] = useState(listObj?.cards || []);
  const boardUsers = allUsers.filter((user) => newCurrentB.users.includes(user._id))
  const [title, setTitle] = useState(listObj.title)
  const [showModal, setShowModal] = useState(false)


  const updateList = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/lists/${listObj._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ newTitle:title })
      })
      if(res.ok){
        const response = await res.json()
        alert("List Updated Successfully!")
          setShowModal(!showModal)
        }
    }
    catch (err) {
      console.log("Update Failed: ", err)
    }
  }
    
  
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
        setCards(cardsData);
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
          setNewLists((prev) => prev.filter((obj) => obj && obj._id !== listObj._id))
        
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


<>
    {showModal && 
      <AddCardModal setIsOpen={setShowModal} isOpen = {showModal} >
      <div className='FormModal'> 
          <span className=" flex justify-center font-bold text-3xl">Edit List</span>
          <form onSubmit={updateList}>
              <div className='flex flex-col my-4'>
                  <label htmlFor="title">List Title: </label>
                  <input required={true}  className='border-solid bg-gray-100 border-spacing-1' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <button type='submit' className='px-4 py-1 my-4 w-24 bg-[--bg-sideNav] hover:bg-[--bg-list] rounded-md text-white '>Submit</button>
          </form>
      </div>
  </AddCardModal>
  }




    <div style={{height: 'auto'}}>
    <div className="w-[250px] rounded-lg shadow-md bg-[--bg-list] mx-5 list"  >
    <div className='flex justify-between items-center p-2'>
    <h2 className="text-lg font-semibold  w-screen text-center">{newLists && (title)}</h2>



      {/* <RiDeleteBinLine  /> */}

      <div className='relative group z-10 '>
          <div className='w-[10ch] absolute hidden group-hover:block bg-white right-0 mt-2 py-2 h-25 z-50 shadow-lg rounded-md'>

              <button onClick={() => setShowModal(!showModal)} className='block px-4 py-2  w-[10ch] text-slate-900 hover:bg-slate-100'>
                Edit
              </button>
              <button onClick={delList} className='mr-3 w-[10ch] block px-4 py-2  text-slate-900 hover:bg-slate-100'>
                Delete
              </button>

          </div>
          <div className='z-10'>
          <RiMoreLine style={{fontSize: '40px'}} />
          </div>
        </div>

    </div> 

    <div >
      {cards && cards.map((card) => (
        <>
          <Card listObj={listObj} session={session} boardUsers={boardUsers} cards={cards} setCards={setCards} newCurrentB={newCurrentB}  cardObj={card} newLists={newLists} setNewLists={setNewLists} />
        </>
      ))}

      <AddCardBtn boardUsers={boardUsers} cards={cards} setCards={setCards} newCurrentB={newCurrentB} id={listObj._id} newLists={newLists} setNewLists={setNewLists} session={session}/>

    </div>
  </div></div>
  </>
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





