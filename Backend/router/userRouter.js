import express from "express"
import { AddnewAdmin, login, patientRegister } from "../controller/userController.js";


const UserRouter=express.Router();

UserRouter.post("/register",patientRegister)
UserRouter.post("/login",login)
UserRouter.post("/admin/addnew",AddnewAdmin)
export default UserRouter
