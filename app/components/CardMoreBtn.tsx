import React, { useState } from 'react';
import { RiArrowDropRightFill } from 'react-icons/ri';

const CardMoreBtn = ({listObj, id, handleClick, deleteReq, updateCard, newLists, setNewLists }) => {
  const [isMoveDropdownOpen, setIsMoveDropdownOpen] = useState(false);


  const onUpdate = (response) => {
      const fromList = response.list.fromList
      const toList = response.list.toList

    const newListsArray = newLists.map((list) => {
        if(list._id === fromList._id) {
            return fromList;
        }
        if(list._id === toList._id) {
            return toList;
        }  
        return list;
    })
      setNewLists([...newListsArray])

  }

  const moveCard = async(e) => {
    e.preventDefault();
    const data = {
        cardId: id,
        fromListId: listObj._id,
        toListId: e.target.id
    }

    try {
        const res = await fetch(`http://localhost:3000/api/lists/${listObj._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        if(res.ok){
          const response = await res.json()
            console.log(response)
          onUpdate(response)
        }
      }
      catch (err) {
        console.log("Update Failed: ", err)
      }
  }



  const toggleMoveDropdown = () => {
    setIsMoveDropdownOpen(!isMoveDropdownOpen);
  };


  return (
    <div>
      <div className="z-1 relative group">
        <div className="z-50 absolute w-[10ch] hidden group-hover:block bg-white right-0 mt-2 py-2 h-25 shadow-lg rounded-md">
          <button
            onClick={handleClick}
            className="z-50 block w-[10ch] px-4 py-2 text-slate-900 hover:bg-slate-100"
          >
            Edit
          </button>

          {/* Move button and dropdown */}
         {newLists.length > 1 &&  <div className="relative">
            <button
               onMouseEnter={() => setIsMoveDropdownOpen(true)}  
               onMouseLeave={() => setIsMoveDropdownOpen(false)}             
              className="z-50 block w-[10ch] px-4 py-2 text-slate-900 hover:bg-slate-100"
            >
              <span className=' flex justify-center '>Move<RiArrowDropRightFill  style={{
         display:"inline-block" ,fontSize: '3ch'
        }} /></span>
            </button>
            {isMoveDropdownOpen  && 
             <div id="listofLists" onMouseEnter={() => setIsMoveDropdownOpen(true)} onMouseLeave={() => setIsMoveDropdownOpen(false)} className="z-50 absolute w-[10ch] -top-[1ch] left-[10ch] bg-white mt-2 py-2 h-auto shadow-lg rounded-md">
            {newLists.map((list) => list._id !== listObj._id && (
              <div className="z-50 block w-[10ch] py-2 text-slate-900 hover:bg-slate-100 " >
                <button className='w-[10ch] ' onClick={moveCard} id={list._id}>{list.title.length > 6 ? list.title.slice(0,7) + '...' : list.title}</button>
              </div>
            ))}
            </div>}
          </div>}
          {/* End Move button and dropdown */}

          <button
            onClick={deleteReq}
            id={id}
            className="z-50 mr-3 w-[10ch] block px-4 py-2 text-slate-900 hover:bg-slate-100"
          >
            Delete
          </button>
        </div>
        <RiArrowDropRightFill style={{
          fontSize: '30px'
        }} />
      </div>
    </div>
  );
};

export default CardMoreBtn;
