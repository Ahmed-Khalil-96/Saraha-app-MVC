import messageModel from "../../../DB/messages.model.js"


export const sendMessage = async(req,res,next)=>{
    const {message}=req.body
    await messageModel.create({content:message,user:req.params.id})
    return res.redirect(`/user/${req.params.id}`)

    
}


