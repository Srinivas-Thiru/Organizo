import React, { useState } from 'react';

export const UsersDropdown = ({setSelectedUsers, selectedUsers, allUsers }) => {
  const [searchText, setSearchText] = useState('');

  const handleUserChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option);
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
      <label htmlFor="users">Select Users:</label>
      
      <input
        type="text"
        placeholder="Search Users"
        value={searchText}
        onChange={handleSearchChange}
      />
      <select
        id="users"
        multiple
        onChange={handleUserChange}
        value={selectedUsers}
      >
        {filteredUsers.map((user) => (
          <option key={user.id} id={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <p>Selected Users: 
        {selectedUsers.map((user) => <p>{user.value} <br /></p>)}</p>
    </div>
  );
};
