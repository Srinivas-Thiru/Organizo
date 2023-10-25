import connectMongoDB from "@/lib/mongodb"
import User from "@/models/user"
import {NextResponse} from "next/server"

export async function GET(request, {params}){
    const {email} = params;

    await connectMongoDB()
    const user = await User.findOne({email: email})
    if(!user){
        const userData = await User.findOne({_id: email})
        return NextResponse.json({userData}, {status:200})
    }
    return NextResponse.json({user}, {status:200})
}
