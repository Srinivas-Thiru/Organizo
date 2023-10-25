
import React from 'react'
import HomeContent from './HomeContent'
import SignInBtn from './SignInBtn'
import SideNavAndBoard from './SideNavAndBoard'

const HomePage = ({newBoards, boardsData, session}) => {


    return (
        <>
        {
            session ? 
            <div className='flex h-screen'>
                <SideNavAndBoard newBoards={newBoards} boardsData={boardsData}  session={session}  />
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