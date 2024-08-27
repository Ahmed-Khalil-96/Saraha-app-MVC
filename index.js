import express from 'express'
import connection from './DB/connection.js'
import userRouter from './src/modules/user.routes.js'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session';
import messageRouter from './src/modules/messages/messages.routes.js';
import path from "path"
import cors from "cors"

const app = express()
const port = process.env.port||3000
const MongoDBStore = connectMongoDBSession(session);





app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(path.resolve("public"))))
app.set("views",path.resolve()+"/views")
app.set("view engine", "ejs")
connection()

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/saraha',
    collection: 'mySessions'
  });
  

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))



app.use("/",userRouter)
app.use("/message",messageRouter)
app.use('*', (req, res) => res.status(404).json("404 page not found"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))