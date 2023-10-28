'use client'

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { RiMenu2Fill, RiMenuFill } from 'react-icons/ri';

const NavBar = () => {
  const { status, data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className='z-50 pl-9 pr-2 py-4 bg-[--bg-navbar] text-[--text-navbar] flex justify-between items-center h-[11vh]'>
      <Link className='font-bold text-3xl font-mono'  href='/'>
        Organizo
      </Link>
      {status === 'authenticated' ? (
        <div className='z-50 relative group'>
          <div className='absolute w-[10ch] hidden group-hover:block bg-white right-0 mt-2 py-2 h-25  shadow-lg rounded-md'>
            <Link href='/home'>
              <button className='block w-[10ch] px-4 py-2 text-slate-900 hover:bg-slate-100'>
                Home
              </button>
            </Link>
            <Link href='/profile'>
              <button className='block w-[10ch] px-4 py-2 text-slate-900 hover:bg-slate-100'>
                Profile
              </button>
            </Link>
            <Link href='/'>
              <button onClick={() => handleSignOut()} className='w-[10ch] block px-4 py-2 text-slate-900 hover:bg-slate-100'>
                Signout
              </button>
            </Link>
          </div>
          <RiMenuFill style={{fontSize: '40px'}} />
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
