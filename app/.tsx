import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/app/components/NavBar'

import UserInfo from '@/app/components/UserInfo'
import NextAuthProvider from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Organizo'
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/LOGO 2.ico" className='rounded-full' />
      </head>
      <body className={inter.className}>
      <NextAuthProvider>

        <NavBar />
        <div className=''>{children}</div>
        </NextAuthProvider>
        </body>
    </html>
  )
}

