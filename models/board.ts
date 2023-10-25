/* 
{
  "_id": ObjectId("board_id"),
  "title": "Project Board",
  "lists": [ObjectId("list_id_1"), ObjectId("list_id_2"), ...]
}
*/

import mongoose, {Schema, models} from "mongoose";
import List from "./list";
import User from "./user";

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lists: [{
        type:Schema.Types.ObjectId,
        ref: List
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
}, {timestamps: true});

const Board= models.Board || mongoose.model("Board", boardSchema);

export default Board;
 