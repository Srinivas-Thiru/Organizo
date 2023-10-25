import connectMongoDB from "@/lib/mongodb"
import Board from "@/models/board";
import List from "@/models/list";
import {NextResponse} from "next/server"
import Card from "@/models/card";




export async function GET() {
    await connectMongoDB()
    const lists = await List.find();
    if(!lists) {
        return NextResponse.json({message: "No data"})
    }
    return NextResponse.json(lists)
}


export async function POST(request) {
    try {
    const {title, cards, boardId} = await request.json();
    await connectMongoDB()
    const newList =  await List.create({title, cards})
    const board = await Board.findById(boardId)
    board.lists.push(newList)
    await board.save();
    return NextResponse.json({ message: 'List successfully created', list: newList }, { status: 201 });
} catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
}
}



export async function DELETE(request) {
    const { boardId, listId } = await request.json();
    if (!boardId || !listId) {
        return NextResponse.json({ message: "Both boardId and listId are required" }, { status: 400 });
    }

    try {
        await connectMongoDB();
        const list = await List.findById(listId);

        if (!list) {
            return NextResponse.json({ message: "List not found" }, { status: 404 });
        }
        if(list.cards.length > 0){
            list.cards.map(async (cardId) => {
                await Card.findByIdAndDelete({cardId })
            })
        }

        const deletedList = await List.findByIdAndDelete(listId);

        if (!deletedList) {
            return NextResponse.json({ message: "List not found" }, { status: 404 });
        }

        const board = await Board.findById(boardId);
        if (board) {
            board.lists = board.lists.filter(list => list.toString() !== listId);
            await board.save();
        }



        return NextResponse.json({ message: "List succsessfully deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
    }
}

