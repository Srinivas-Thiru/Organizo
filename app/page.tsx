
import ListComponent from '@/app/components/ListComponent'
import ProfileView from '@/app/components/ProfileView'
import UserInfo from '@/app/components/UserInfo'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from './api/auth/[...nextauth]/route'
import AddCardModal from './components/AddCardModal'
import Board from './components/Board/Board'
import BoardList from './components/BoardList'
import Card from './components/Card'
import HomePage from './components/HomePage'
import SideNav from './components/SideNav'


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

const getUserSpecificBoards = (boards, userID) => {
  // Filter the boards to get only the ones where the user is included in the 'users' array.
  return boards.filter(board => board.users.includes(userID));
};
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

const getLists = async(listId) => {
        try {
            const getRequest = "http://localhost:3000/api/lists/" + listId;
            const res = await fetch(getRequest, {cache: "no-store"});
            if (!res.ok) {
                throw new Error("Fetching Failed")
            }
            const data = await res.json()
            return data
        } catch (err) {
            console.log("Error: ", err);
        }
}

const getCards = async(list) => {
    const allCards = list.every(async(card) => {
        try {
            const getRequest = "http://localhost:3000/api/cards/" + card;
            const res = await fetch(getRequest, {cache: "no-store"});
            if (!res.ok) {
                throw new Error("Fetching Failed")
            }
            const data = await res.json()

            return data
        } catch (err) {
            console.log("Error: ", err);
        }
    })

}

    const getCard = async (cardId) => {
        try {
          const getRequest = 'http:localhost:3000/api/cards/' + cardId;
          const res = await fetch(getRequest, {
            cache: 'no-store',
          });
          if (!res.ok) {
            throw new Error('Failed to fetch Cards.');
          }
          return res.json();
        } catch (err) {
          console.log(err);
        }
      }

      const getUserData = async (userId) => {
        try {
          const getRequest = 'http:localhost:3000/api/user/' + userId;
          const res = await fetch(getRequest, {
            cache: 'no-store',
          });
          if (!res.ok) {
            throw new Error('Failed to fetch Cards.');
          }
          return res.json();
        } catch (err) {
          console.log(err);
        }
      }


export default async function Home() {


  const session = await getServerSession(authOptions)
    if(!session ) {
        return (<>
        <UserInfo />
        </>)
    }

    const userDetials= await getUserId(session)
    const userId = userDetials.user._id

   
    const getData = async () => {
      const boards = await getBoards();

      const boardsArrayPromises = boards.boards.map(async (board) => {

        const listsListsPromises = await Promise.all(

          board.lists.map(async (listId: string) => {
            const list = await getLists(listId);

            if(list.list){

            
            const cardsListPromises = list.list.cards.map(async (cardId) => {
              const card = await getCard(cardId);

              const userPromises = card.card.assignedUsers.map(async (userId) => {
                const user = await getUserData(userId);
                return {
                  id: userId,
                  user: user.userData
                }
              });

              // Wait for all userPromises to complete
              const usersList = await Promise.all(userPromises);
    
              return {
                id: cardId,
                card: card.card,
                usersList: usersList,
              };
            });
    
            // Wait for all cardsListPromises to complete
            const cardsList = await Promise.all(cardsListPromises);

            return {
              id: listId,
              list: list.list,
              cardsList: cardsList,
            };
          }})
        );
    
        // Wait for all listsListsPromises to complete
        const listsLists = await Promise.all(listsListsPromises);
    
        return {
          id: board._id,
          board: board,
          listsList: listsLists,
        };
      });
    
      // Wait for all boardsArrayPromises to complete
      const boardsArray = await Promise.all(boardsArrayPromises);
      return boardsArray;
    };

    
  //   const boardsArray = await getData();    

  //   const addBoardMembers = async () => {
  //     for (const board of boardsArray) {
  //       board.boardMembers = [];
    
  //       for (const id of board.board.users) {
  //         const user = await getUserData(id);
  //         board.boardMembers.push(user.userData);
  //       }
  //     }
  //   }
    
  //   await addBoardMembers()

  //   const users = await getUsers()
  //   const allUsers = users.filter((user) => user.email !== session.user.email)

  //   const filteredBoards = boardsArray.filter((board) =>
  //   board.boardMembers.some((user) => user._id === userId)
  // );

    const allBoards = await getBoards()
    const boardsData = allBoards.boards.filter((board) => {
      return board.users.includes(userId) 
    })
    const newBoards = boardsData

    console.log("boardsData: ", boardsData)



  return (
    <div>
      <HomePage newBoards={newBoards} boardsData={allBoards.boards} session={userDetials} />
    </div>
    )
}
