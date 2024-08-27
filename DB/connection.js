import mongoose from "mongoose";

const connection = async()=>{
    return mongoose.connect("mongodb://localhost:27017/saraha").then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err.message);   
    })
}

export default connection