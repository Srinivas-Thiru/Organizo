'use client'

import React from 'react'
import Image from 'next/image'
import {signIn} from 'next-auth/react'

const SignInBtn = () => {
    return (
        <div className='flex justify-center items-center'>
            <button
                onClick={() => signIn('google')}
                className='flex pl-4 items-center gap-4 shadow-xl rounded-lg'>
                <Image
                    className='rounded-full'
                    src='/google.png'
                    height={40}
                    width={40}
                    alt='Google logo'/>
                <span className='bg-blue-500 text-white p-3'>
                    Sign In with Google
                </span>
            </button>
        </div>
    )
}

export default SignInBtn