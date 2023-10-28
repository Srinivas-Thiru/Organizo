import Board from "@/models/board"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function PUT(request, {params}) {
    const {id} = params
    const {newTitle: title} = await request.json()
    await connectMongoDB()
    const updatedBoard = await Board.findOneAndUpdate(
        { _id: id }, 
        { $set: { title } }, 
        { new: true } 
      );
    return NextResponse.json({message: "Updated Successfully", board:updatedBoard}, {status: 200})
}

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const board= await Board.findOne({_id: id})
    return NextResponse.json({board}, {status:200})
}

