import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
})


const messageModel = model("Message",messageSchema)

export default messageModel