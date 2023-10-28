import mongoose, {Schema, models} from "mongoose"
import User from "./user";
import List from "./list";



const cardSchema: Schema= new Schema( {
    title : {
        type: String,
        required: true
    },
    // listId: {
    //     type:Schema.Types.ObjectId,
    //     ref:List
    // },
    description:{
        type:String,
    },
    label:{
        type: String,
    },
    dueDate: {
        type: Date,
        validate: {
            validator:  (date: any ) => {
                return date >= new Date(); // Only allow dates that are today or in the future
            },
            message: "Due date must be today or in the future"
        }
    },
    assignedUsers: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],

}, {timestamps: true})

const Card = models.Cards || mongoose.model("Cards", cardSchema)

export default Card
 
/* 
{
  "_id": ObjectId("card_id"),
  "title": "Task 1",
  "description": "Description of the task",
  "dueDate": "2023-12-31T23:59:59Z",
  "label ": ["Label 1", "Label 2"],
  "assignedUsers": [ObjectId("user_id_1"), ObjectId("user_id_2")]
}
*/