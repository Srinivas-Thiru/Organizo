'use client'

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const NavBar = () => {
  const { status, data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className=' px-9 py-4 bg-[white] flex justify-between items-center h-[11vh]'>
      <Link className='font-bold text-lg '  href='/'>
        Organizo
      </Link>
      {status === 'authenticated' ? (
        <div className='relative group'>
          <div className='absolute hidden group-hover:block bg-white right-0 mt-2 py-2 w-40 shadow-lg rounded-md'>
            <Link href='/profile'>
              <button className='block px-4 py-2 text-slate-900 hover:bg-slate-100'>
                Profile
              </button>
            </Link>
            <Link href='/'>
              <button onClick={() => handleSignOut()} className=' block px-4 py-2 text-slate-900 hover:bg-slate-100'>
                Signout
              </button>
            </Link>
          </div>
          <Image
            src={session?.user?.image}
            width={50}
            height={50}
            className='rounded-full cursor-pointer'
          />
        </div>
      ) : (
        <button onClick={() => signIn('google')} className='bg-slate-900 text-white px-6 py-2 rounded-md'>
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBar;
