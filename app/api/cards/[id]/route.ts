import connectMongoDB from "@/lib/mongodb"
import Card from "@/models/card"
import {NextResponse} from "next/server"

export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { newTitle: title, newDescription: description, assignedUsers, label, dueDate } = await request.json();
  
      if (!id) {
        return new Response('Card ID is required', { status: 400 });
      }
  
      await connectMongoDB();
      const updatedCard = await Card.findOneAndUpdate(
        { _id: id }, 
        { $set: { title, description, assignedUsers, label, dueDate } }, 
        { new: true } 
      );
      
      if (updatedCard) {
        // Document updated successfully
        console.log('Updated card:', updatedCard);
             return NextResponse.json({message: "Successfully updated",card:updatedCard}, {status:200})
      }
  
      if (!updatedCard) {
        return new Response('Card not found', { status: 404 });
      }
  
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const card= await Card.findOne({_id: id})
    return NextResponse.json({card}, {status:200})
}