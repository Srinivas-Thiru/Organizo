/*
{
  "_id": ObjectId("list_id"),
  "title": "To Do",
  "cards": [ObjectId("card_id_1"), ObjectId("card_id_2"), ...]
}
 */

import mongoose, {Schema, models} from "mongoose";
import Card from "./card";

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        type:Schema.Types.ObjectId,
        ref: Card
    }]
}, {timestamps: true});

const List = models.List || mongoose.model("List", listSchema);

export default List;
