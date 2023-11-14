import React from 'react';

const UserProfile = ({ profilePic, name, email }) => {
  return (
    <div className="py-4 mx-auto mt-5 rounded-lg bg-[--bg-board]" style={{width: 'min(1000px, 80vw)'}}>
      <div className="flex w-full p-8 rounded-lg shadow-md">
        <img
          src={profilePic}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-4 shadow-md border-[--bg-navbar]"
        />
        <h1 className="text-3xl font-bold mt-4 w-full flex justify-center items-center">{name}</h1>
      </div>
      <div className='flex w-96 text-xl justify-between mx-auto my-4 '>
           <span >Email:</span>
           <span>{email}</span>
        </div>
        <div className='flex w-96 text-xl justify-between mx-auto my-4 '>
           <span >Name:</span>
           <span>{name}</span>
        </div>
        
    </div>
  );
};

export default UserProfile;
