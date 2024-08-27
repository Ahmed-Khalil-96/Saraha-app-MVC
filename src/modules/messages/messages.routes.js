import { Router } from "express";
import { sendMessage } from "./messages.controller.js";

const messageRouter = Router()

messageRouter.post("/sendMessage/:id",sendMessage)


export default messageRouter