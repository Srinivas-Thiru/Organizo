
import UserInfo from '@/app/components/UserInfo'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import NavBar from '../components/NavBar'



export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
        <UserInfo />
    </div>
    )
}
