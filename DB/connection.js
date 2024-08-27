import mongoose from "mongoose";

const connection = async()=>{
    return mongoose.connect(process.env.Db_url).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err.message);   
    })
}

export default connection