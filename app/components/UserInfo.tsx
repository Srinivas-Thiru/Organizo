'use client'

import React from 'react'
import SignInBtn from './SignInBtn'
import { useSession} from 'next-auth/react'
import Image from 'next/image'
import HomeContent from './HomeContent'


const UserInfo = () => {
    const {status, data:session} = useSession();
    console.log(session)
  return (
    <div>
        { status === 'authenticated' ? 
        <div className='flex items-center justify-center my-10'>
        <Image src={session?.user?.image} width={50} height={50} alt='profile-pic.png' />
        <h1>{session?.user?.name}</h1>
      </div>:
     ( <> 
        <HomeContent />
        <SignInBtn />
        </>
     )   }
    </div>
  )
}

export default UserInfo