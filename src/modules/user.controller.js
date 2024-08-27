import messageModel from "../../DB/messages.model.js"
import userModel from "../../DB/user.model.js"
import QRCode from 'qrcode'

    let qrCodeUrl;


// =======================index========================
export const index = async(req,res,next)=>{

    res.render("index.ejs",{
        loggedIn:false
    })
}

// =============================register======================
export const register = async(req,res,next)=>{
    
    if(!req.session.loggedIn){
        const {error}=req.query
    return res.render("register.ejs",{error,
        loggedIn:false
    })
}
return res.redirect("/messages")
}

// ==============================login======================
export const login = async(req,res,next)=>{
    if(!req.session.loggedIn){
   return res.render("login.ejs",{
    error:req.query.error,
    loggedIn:false
   })
}
res.redirect("/messages")

}


// ==========================user===========================================
export const user = async(req,res,next)=>{


    const{id}=req.params
    const link =`${req.protocol}://${req.headers.host}/user/${id}`
     QRCode.toDataURL(link, function (err, url) {
        qrCodeUrl=url
      })
      

    const user = await userModel.findById(id)
    res.render("user.ejs",{
        loggedIn:req.session.loggedIn,
        name:user.name,
        link,
        id,
        qrCodeUrl
    })

}

// =========================messages====================================
export const messages = async(req,res,next)=>{
    
    if(req.session.loggedIn){
    const messages =await messageModel.find({user:req.session.userId})
    const link = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`

     QRCode.toDataURL(link, function (err, url) {
        qrCodeUrl=url    
      })
      
    return res.render("messages.ejs",{
        loggedIn:req.session.loggedIn,
        name:req.session.name,
        link,
        messages,
        qrCodeUrl
    })
    }
    return res.redirect("/login")
}

// =====================handleRegister====================================
export const handleRegister = async(req,res,next)=>{
    const {name, email, password, PasswordConfirmation}=req.body
    const userExist = await userModel.findOne({email})
    if(userExist){
        return res.redirect("/register?error=User already exist")
    }
    if(!name){
        return res.redirect("/register?error=Name is required")
    }
    if(!email){
        return res.redirect("/register?error=Email is required")
        }
     if(!password){
            return res.redirect("/register?error=Password is required")
        }
    if(PasswordConfirmation!==password){
        return res.redirect("/register?error=Password do not match")
    }

    const user = new userModel({name,email,password})
    await user.save()
    return res.redirect("/login")
}

// ======================handleLogin======================================
export const handleLogin = async(req,res,next)=>{
    const {email,password}=req.body
    const userExist = await userModel.findOne({email,password})
    if(!userExist){

        return res.redirect("/login?error=Invalid email or password")
    }
    if(!email){
        return res.redirect("/login?error=Email is required")
    }
    if(!password){
        return res.redirect("/login?error=Password is required")
        }


        req.session.userId=userExist._id
        req.session.name=userExist.name
        req.session.loggedIn=true
        return res.status(200).redirect("/messages")
}

// =========================logout========================
export const logOut = async(req,res,next)=>{
    req.session.destroy(function(err) {
        return res.redirect("/")
})
}