import connectMongoDB from '@/lib/mongodb'
import Card from '@/models/card'
import {NextResponse} from 'next/server'
import { getSession } from 'next-auth/react'
import List from '@/models/list'

export async function POST(request) {
    try {

        const { title, description, assignedUsers, label, dueDate, listId } = await request.json();
        await connectMongoDB();
        const newCard = await Card.create({ title, description, assignedUsers, label, dueDate });
        const list = await List.findById(listId);
        if (!list) {
            return NextResponse.json({ message: 'List not found' }, { status: 404 });
        }
        list.cards.push(newCard);
        await list.save();
        return NextResponse.json({ message: 'Card successfully created', card: newCard }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
    }
}

export async function GET() { 
    await connectMongoDB()
    const cards = await Card.find()
    return NextResponse.json(cards)
}

export async function DELETE(request) {
    const cardId = request.nextUrl.searchParams.get("id");
    
    try {
        await connectMongoDB();

        // Find the card by ID
        const card = await Card.findById(cardId);
        if (!card) {
            return NextResponse.json({ message: "Card not found" }, { status: 404 });
        }

        const list = await List.find();
        if (list) {
            list.map(async (listObj) =>{
                if(listObj.cards.includes(cardId)){
                    listObj.cards.pull(cardId); // Remove the card from the list's "cards" array
                    await listObj.save();
                }
            })
        }
        // Delete the card
        await Card.deleteOne({ _id: cardId });

        return NextResponse.json({ message: "Card successfully deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}
