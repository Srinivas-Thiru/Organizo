
import React from 'react'
import HomeContent from './HomeContent'
import SignInBtn from './SignInBtn'
import SideNavAndBoard from './SideNavAndBoard'

const HomePage = ({allUsers, newBoards, boardsData, session}) => {


    return (
        <>
        {
            session.user ? 
            <div className='flex h-screen'>
                <SideNavAndBoard allUsers={allUsers} newBoards={newBoards} boardsData={boardsData}  session={session}  />
            </div>
            :
            <>
                <HomeContent />
                <SignInBtn />
            </>
        }
        </>
    )
}





export default HomePage