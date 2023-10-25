'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'
import SignInBtn from './SignInBtn';

const ProfileView = () => {
    const {status, data: session} = useSession();

  return (
    <div>
        {status === "authenticated" ? (
                <div className= "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl" >
                <Image src={session?.user?.image} width={100} height={100} className='m-10 rounded-full' alt='profile-pic.png' />
                <h1>Name: {session?.user.name}</h1><br/>
                <p> Email: {session?.user.email}</p>
                </div>
            ) : (<div>
            <h1 className= "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-2xl">Please Sign in to Check your Profile</h1>
            <SignInBtn />
          </div>)}
    </div>
  )
}

export default ProfileView