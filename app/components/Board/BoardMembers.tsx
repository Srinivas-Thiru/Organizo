import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import {FaUserPlus, FaPlus} from 'react-icons/fa';
import AddCardModal from '../AddCardModal';
import {UsersDropdown} from '../UsersDropdown';
import UserSelection from '../UserSelection';

const BoardMembers = ({ onBoardUpdate, session, allUsers, newCurrentB, setNewCurrentB}) => {

    const [showModal, setShowModal] = useState(false)
    const boardMembers = allUsers.filter((user) => newCurrentB.users.includes(user._id))
    const [selectedUsers, setSelectedUsers] = useState(allUsers.filter((user) => newCurrentB.users.includes(user._id) && user._id !== session.user._id ));



    const getIds = (users) => {
      return users.map((user) => user._id);
    }

    const updateBoard = async(e) => {
        e.preventDefault()
        const userIds = getIds(selectedUsers)
        const newUsers = [session.user._id, ...userIds]

        try{
            const res = await fetch(`http://localhost:3000/api/boards/${newCurrentB._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newUsers : newUsers})
            })
            if(res.ok){
                const response = await res.json()
                alert("Update Successfull")
                onBoardUpdate(response)
            }else{
                throw Error('Could not add member')
            }
        }catch(err){
            console.log("Update Failed: ", err)
        }
        setShowModal(!showModal)
    }


    const handleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            // User is unchecking, remove the user ID from the list
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            // User is checking, add the user ID to the list
            setSelectedUsers([
                ...selectedUsers,
                userId
            ]);
        }
    };

    
    useEffect(() => {
        setSelectedUsers(allUsers.filter((user) => newCurrentB.users.includes(user._id) && user._id !== session.user._id ))
    }, [newCurrentB])

    return (
    <> 
    {
        showModal && 
        <div className='absolute top-36 right-96 w-auto'>
        <AddCardModal setIsOpen={setShowModal} isOpen={showModal}>
                <div className=''>
                    <span className=" flex justify-center font-bold text-3xl">Edit Board</span>
                    <form onSubmit={updateBoard}>
                        <div className=' my-4'>
                            <div className='text-sm text-center px-5 mx-7 rounded-sm py-1 mb-4 bg-[--bg-list]'> Note: Users will be automatically removed from their assigned cards if removed form board! </div>
                            <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} allUsers={allUsers} session={session} newCurrentB={newCurrentB}/>
                        </div>
                        <button
                            type='submit'
                            className='px-4 py-1 my-4 mx-2 w-24 bg-[--bg-sideNav] hover:bg-[--bg-list] rounded-md text-white '>Submit</button>
                    </form>
                </div>
            </AddCardModal>
            </div>
    }

    {newCurrentB && 
        (boardMembers.length === 1
            ? <div className='flex'>
                    <Image
                        className='rounded-full'
                        height={38}
                        width={38}
                        src={boardMembers[0].image}/>
                    <button onClick={() => setShowModal(!showModal)}>
                        <FaUserPlus
                            style={{
                            position: "relative",
                            right: "19px"
                        }}
                            className='bg-white rounded-full p-2'
                            size={38}/>
                    </button>
                </div>
            : <div className={`relative ${boardMembers.length === 2 ? ' left-5' : ' left-9'}`}>
                    <div className='flex'>
                        {boardMembers
                            .slice(0, 3)
                            .map((user, index) => user.image && index === 0
                                ? <Image className='rounded-full' height={38} width={38} src={user.image}/>
                                : <>
                                <Image
                                    style={{
                                    position: "relative",
                                    right: `${index * 19}px`
                                }}
                                    className='rounded-full'
                                    height={38}
                                    width={38}
                                    src={user.image}
                                    alt='Profile Pic'/>
                                    </>)}
                        <button onClick={() => setShowModal(!showModal)}>
                            <FaUserPlus
                                style={{
                                position: "relative",
                                right: `${ (boardMembers.length > 3 ? 3 : boardMembers.length ) * 19}px`
                            }}
                                className='bg-white rounded-full p-2'
                                size={38}/>
                        </button>
                    </div>
                </div>)
    } 
    </>
  )
}

export default BoardMembers