import React from 'react'
import { Button } from '@mui/material'

const RightNav = ({currentBoardId , boardsArray}) => {

  if(!boardsArray) {
    return null
  }
  
  const userList = boardsArray[0].boardMembers 
  return (
        <div className= 'pt-3 bg-gray-300 mt-3 rounded-xl text-center' style={{height: '80vh',width: '10vw'}} >
          { userList && userList.map((user) => <><h1 className='my-2' >{user.name.length > 15? user.name.slice(0,16)+"..." : user.name.slice(0,16)}</h1> </>)}
          <Button>Add member</Button>
        </div>
    )
}

export default RightNav