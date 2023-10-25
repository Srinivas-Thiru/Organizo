import connectMongoDB from "@/lib/mongodb"
import Board from "@/models/board"
import {NextResponse} from "next/server"
import List from "@/models/list"
import Card from "@/models/card"





export async function GET() {
    await connectMongoDB()
    const boards = await Board.find();
    return NextResponse.json({boards}, {status:200})
}

export async function POST(request) {

    const {title, users} = await request.json()
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let cards = []
    for(let i = 1; i < 4; i++){
        cards.push(new Card({
            title: ` Ticket ${i}` ,
            description: '',
            labels: [""],
            assignedUsers:[users[0]],
            dueDate: tomorrow
        }))
    }

    let demoLists = []    
    const demoList = new List({
        title: "To-Do",
        cards: cards
    })
    demoLists.push(demoList)


    await connectMongoDB()
    const newBoard = await Board.create({title, users})

    return NextResponse.json({message: 'Board Successfully created', board:newBoard }, {status: 201});
}

export async function DELETE(request)  {    
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()

    const deletedBoard = await Board.findById(id)

    if(deletedBoard.lists.length === 0){
        const deleted = await Board.findByIdAndDelete(id)
        return NextResponse.json({message: "Successfully Deleted", board:deleted}, {status: 200})
    }

    if(deletedBoard.lists.length !== 0){
        deletedBoard.lists.map(async (listId) => {
            const list = await List.findById(listId);
            console.log('LIST API: ', JSON.stringify(list))
            if (!list) {
                return NextResponse.json({ message: "List not found" }, { status: 404 });
            }
            if(list.cards){
                list.cards.map(async (cardId) => {
                    await Card.findByIdAndDelete({cardId })
                })
            }
            await List.findByIdAndDelete(listId);
        })
    }
    await Board.findByIdAndDelete(id)
    return NextResponse.json({message: "Successfully Deleted"}, {status: 200})
}