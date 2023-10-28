import connectMongoDB from "@/lib/mongodb";
import List from "@/models/list";
import { NextResponse } from "next/server";


interface UpdatedList {
    updatedList?: List | null
    toList?: List | null;
    fromList?: List | null;
  }

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  let updatedList:UpdatedList = {};

  if (body.newTitle) {
    // If the request contains a newTitle, update the list title
    await connectMongoDB();
    updatedList.updatedList = await List.findOneAndUpdate(
      { _id: id },
      { $set: { title: body.newTitle } },
      { new: true }
    );
  }

  if (body.fromListId && body.toListId && body.cardId) {
    // If the request contains fromListId, toListId, and cardId, move the card
    await connectMongoDB();

    // Remove the card from the source list
    await List.findOneAndUpdate(
      { _id: body.fromListId },
      { $pull: { cards: body.cardId } }
    );

    // Add the card to the destination list
    await List.findOneAndUpdate(
      { _id: body.toListId },
      { $addToSet: { cards: body.cardId } }
    );

    // Get the updated list that the card was moved to
    updatedList.toList = await List.findOne({ _id: body.toListId });
    updatedList.fromList = await List.findOne({ _id: body.fromListId });
  }

  return NextResponse.json({ message: "Updated Successfully", list: updatedList }, { status: 200 });
}

export async function GET(request, {params}) {
    const {id}= params
    await connectMongoDB()
    const list= await List.findOne({_id: id})
    return NextResponse.json({list}, {status:200})
}