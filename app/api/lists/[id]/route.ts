import connectMongoDB from "@/lib/mongodb"
import List from "@/models/list"
import {NextResponse} from "next/server"

export async function PUT(request, {params}) {
    const {id} = params
    const {newTitle: title, newCards: cards} = await request.json()
    await connectMongoDB()
    await List.findByIdAndUpdate(id, {title, cards})
    return NextResponse.json({message: "Updated Successfully"}, {status: 200})
}

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const list= await List.findOne({_id: id})
    return NextResponse.json({list}, {status:200})
}