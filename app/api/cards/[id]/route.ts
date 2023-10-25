import connectMongoDB from "@/lib/mongodb"
import Card from "@/models/card"
import {NextResponse} from "next/server"

export async function PUT(request, {params}) {
    const {id} = params
    const {newTitle: title, newDescription: description, assignedUsers: assignedUsers, label: label, dueDate:dueDate} = await request.json()
    await connectMongoDB()
    await Card.findByIdAndUpdate(id, {title, description, assignedUsers, label, dueDate})
    return NextResponse.json({message: "Updated Successfully"}, {status: 200})
}

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const card= await Card.findOne({_id: id})
    return NextResponse.json({card}, {status:200})
}