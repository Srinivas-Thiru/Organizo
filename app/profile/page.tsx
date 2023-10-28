
import UserInfo from '@/app/components/UserInfo'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import UserProfile from '../components/UserProfile';
import HomeContent from '../components/HomeContent';
import SignInBtn from '../components/SignInBtn';





export default async function Home() {

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
  
  
  const session = await getServerSession(authOptions)

  const userDetials= await getUserId(session)

  return (
    <div>
      {session?.user ? <>
   
        <UserProfile profilePic={session?.user?.image} name={session?.user?.name} email={session?.user?.email} />
        </>
      :<>
      <HomeContent />
      <SignInBtn /></>}
    </div>
    )
}
