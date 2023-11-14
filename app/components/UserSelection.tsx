'use client'
import React, { useState } from 'react';

const UserSelection = ({ session, allUsers, selectedUsers, setSelectedUsers, newCurrentB = { users:[""] } }) => {
  const [searchText, setSearchText] = useState('');


  const [otherUsers, setOtherUsers] = useState(
    allUsers.filter((user) => newCurrentB.users[0] !== "" ?  !newCurrentB.users.includes(user._id) : user._id !== session.user._id)
  );

//   alert(JSON.stringify(otherUsers))

  const handleUserSelection = (user) => {
    // Move the selected user from otherUsers to selectedUsers
    setOtherUsers((prevOtherUsers) =>
      prevOtherUsers.filter((u) => u._id !== user._id)
    );
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
  };

  // Filter otherUsers based on search text
  const filteredOtherUsers = otherUsers.filter((user) =>
    searchText && user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='mx-2 my-2'>
      <div className='flex bg-white'>Available Users:</div>

      <input
        type='text'
        placeholder='Search users...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='border border-gray-300 mt-2 w-[27ch] '
        style={{borderRadius: '5px 5px 0 0'}}
      />
      {/* Display the filtered users */}
      {searchText && <ul className=' card w-[27ch]  bg-[--bg-board] ' style={{border: '1px solid', borderTop: 'none' , borderRadius: '0 0 5px 5px' }} >
        {filteredOtherUsers.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserSelection(user)} // Handle user selection
            className='cursor-pointer hover:bg-gray-200 py-1'
          >
            {user.name}
          </li>
        ))}
      </ul>}
      <div className='mt-3'>
        <span className='block'>Selected Users:</span>
        <div className='flex flex-wrap gap-5 mt-3 border p-2'>
        {selectedUsers.map((user) => (
            user._id !== session.user._id &&
          <div className='start-animation bg-[--bg-board] text-sm flex w-fit gap-2 py-1' key={user._id}>
            {user.name}
            <span
              className=' text-center  rounded-lg ml-auto w-5 h-[2.7ch] cursor-pointer'
              onClick={() => {
                // Move the selected user back to otherUsers
                setSelectedUsers((prevSelectedUsers) =>
                  prevSelectedUsers.filter((u) => u._id !== user._id)
                );
                setOtherUsers((prevOtherUsers) => [...prevOtherUsers, user]);
              }}
            >
              X
            </span>

          </div>
        ))}</div>
      </div>
    </div>
  );
};

export default UserSelection;




// import React, { useState } from 'react';

// const UserSelection = ({session, allUsers, newCurrentB }) => {

//     const [searchText, setSearchText] = useState('');
//     const [selectedUsers , setSelectedUsers] = useState(allUsers.filter((user) => newCurrentB.users.includes(user._id)))
//     const [otherUsers, setOtherUsers] = useState(allUsers.filter((user) => !newCurrentB.users.includes(user._id)))


//   return (
//     <div className='h-[10vh]'>
//       <div className='flex  bg-white w-32 '>Available Users:</div>
//       {otherUsers.map((user) => <>{user.name}</>)}
//       <p>Selected Users: 
//         {selectedUsers.map((user) => <div className='flex w-64 py-1 ' >{user.name} <span  className='bg-[--bg-list] text-center rounded-lg ml-auto w-5' >X</span>  <br /></div>)}</p>
//     </div>
//   );
// };

// export default UserSelection;