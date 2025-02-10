import express from "express";
import { sendMail } from "../../controllers/userControllers/userController.js";

const userRouter = express.Router();

userRouter.post('/send-email', sendMail);

export default userRouter;