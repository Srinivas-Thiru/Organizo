import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserInfo from '../components/UserInfo';
import { split } from 'postcss/lib/list';
import BoardTitleCard from '../components/Board/BoardTitleCard';
import { useRouter } from 'next/router';
import HomeContent from '../components/HomeContent';
import SignInBtn from '../components/SignInBtn';
import CreateBoard from '../components/CreateBoard';
import UserSelection from '../components/UserSelection';


const getBoards = async() => {
  try {
      const res = await fetch("http://localhost:3000/api/boards", {cache: "no-store"});
      if (!res.ok) {
          throw new Error("Fetching Failed")
      }
      const data = await res.json()
      return data
  } catch (err) {
      console.log("Error: ", err);
  }
}
const getUserId = async (session) => {
  try {
      const getRequest = "http://localhost:3000/api/user/" + session?.user?.email;
      const res = await fetch(getRequest, {
          cache: "no-store"
      });
      if(!res.ok){
          throw new Error("Fetching Failed")
      }
      return await res.json()
  }
  catch(err) {
      console.log("Error: ", err);
  }
}

const getUsers = async () => {
  try {
      const getRequest = "http://localhost:3000/api/user/";
      const res = await fetch(getRequest, {
          cache: "no-store"
      });
      if(!res.ok){
          throw new Error("Fetching Failed")
      }
      return await res.json()
  }
  catch(err) {
      console.log("Error: ", err);
  }
}

const Home =async () => {

  const session = await getServerSession(authOptions)
    if(!session ) {
        return (<>
                  <HomeContent />
                  <SignInBtn />
                </>)
    }

    const userDetials= await getUserId(session)
    const userId = userDetials.user._id

    const allUsers = await getUsers()



    const allBoards = await getBoards()
    const boardsData = allBoards.boards.filter((board) => {
      return board.users.includes(userId) 
    })
    const newBoards = boardsData
    const firstName =(session?.user?.name || '').split(' ')[0]
  return (
    <>
    <div className="py-4 mx-auto mt-5 rounded-lg  bg-[--bg-board]" style={{width: 'min(1000px,80vw)'}}>
    <div className="flex w-full p-8 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold mt-4 w-full flex justify-center items-center">{`Welcome, ${firstName}`}</h1>

    </div>
    <div className='flex w-96 text-xl justify-between mx-auto my-4 '>
      </div>
      
      <h1 className='text-center font-bold mb-3 underline'>{firstName}'s Workspace!</h1>

      <div className='flex flex-wrap ' style={{ overflowY:'scroll', maxHeight: '55vh'}}>
      
      {newBoards &&
        newBoards.map((board) => 
        <BoardTitleCard  board={board} />
        )
      }

      <div className=' w-1/2 text-xl px-5 mb-4 '>
        <CreateBoard newBoards={newBoards} userDetials={userDetials} allUsers={allUsers}  /> 
      </div>

    </div>
    </div>

  </>
  )
}

export default Home


