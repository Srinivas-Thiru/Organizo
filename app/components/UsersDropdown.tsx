import React, { useState } from 'react';

export const UsersDropdown = ({session, setSelectedUsers, selectedUsers, allUsers }) => {
  const [searchText, setSearchText] = useState('');

  const handleUserChange = (event) => {

    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.id);
    console.log(selectedOptions)
    setSelectedUsers(selectedOptions);
  };
  const removeUser = (e) => {
    const userId = e.target.dataset.userId; // Access the id attribute of the clicked element
    const selectedOptions = selectedUsers.filter((user) => user.name !== userId); // Filter out the user with the matching _id
    setSelectedUsers(selectedOptions);
  };
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    searchText !== "" && user.name.toLowerCase().includes(searchText.toLowerCase() )
  );

 

  return (
    <div >
      {/* <label htmlFor="users">Select Users:</label>
      
      <input
        type="text"
        placeholder="Search Users"
        value={searchText}
        onChange={handleSearchChange}
      /> */}
      <div className='flex '>Available Users:</div>
      
      
      
      <select
        id="users"
        multiple
        onChange={handleUserChange}
        value={selectedUsers}
        className='rounded-md my-3 w-[25ch] p-1 border-spacing-1 border border-solid border-black'
      >
        {allUsers.map((user) => ( user._id !== session.user._id &&
          <option key={user._id} id={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <p>Selected Users: 
        {selectedUsers.map((user) => <div className='flex w-64 py-1 ' >{user} <span  className='bg-[--bg-list] text-center rounded-lg ml-auto w-5' >X</span>  <br /></div>)}</p>
    </div>
  );
};
