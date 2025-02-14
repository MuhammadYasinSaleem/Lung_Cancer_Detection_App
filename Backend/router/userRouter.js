import express from "express"
import { patientRegister } from "../controller/userController.js";


const UserRouter=express.Router();

UserRouter.post("/register",patientRegister)
export default UserRouter
