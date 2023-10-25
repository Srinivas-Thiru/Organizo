import connectMongoDB from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET
        })
    ],
    callbacks: {
        async signIn({user , account}) {
            const {name, email} = user
            if(account.provider == "google"){
                try{
                    await connectMongoDB()
                    const userExists = await User.findOne({ email })

                    if(!userExists){
                        const res = await fetch("http://localhost:3000/api/user",{
                            method: "POST",
                            headers: {
                                "Content-Type" : "application/json",
                            },
                            body: JSON.stringify({
                                name,email
                            })
                        })
                        if(res.ok){
    
                            return user
                        }
                    }else{
                        user.userExists = userExists
                        return userExists
                    }

                }
                catch(err) {
                    console.log(err)
                }

            }

        }

    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}