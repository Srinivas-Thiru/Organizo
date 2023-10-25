import mongoose, {Schema, models} from "mongoose";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type :String ,
            required: true,
            unique: true
       }
     },
     {timestamps:true}
);

const User = models.User || mongoose.model("User", userSchema);

export default User;




/* {
  "_id": ObjectId("user_id"),
  "username": "username",
  "email": "user@example.com",
  "password": "hashed_password",
  "boards": [ObjectId("board_id_1"), ObjectId("board_id_2"), ...]
}
*/