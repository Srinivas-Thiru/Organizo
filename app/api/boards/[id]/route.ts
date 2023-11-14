import Board from "@/models/board"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"



export async function PUT(request, {params}) {
    const {id} = params
    const body = await request.json()
    
    await connectMongoDB()
    
    if(body.newTitle){
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: id }, 
            { $set: { title: body.newTitle } }, 
            { new: true } 
          );
        return NextResponse.json({message: "Updated Successfully", board:updatedBoard}, {status: 200})
    }
    if(body.newUsers){
        console.log(body.newUsers)
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: id }, 
            { $set: { users: body.newUsers } }, 
            { new: true } 
          );
        console.log("UPDATED: ", updatedBoard)
          return NextResponse.json({message: "Updated Successfully", board:updatedBoard}, {status: 200})
    }
    
}

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const board= await Board.findOne({_id: id})
    return NextResponse.json({board}, {status:200})
}

