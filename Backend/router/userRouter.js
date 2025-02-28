import express from "express"
import { AddnewAdmin, getAllDoctors, getUserDetails, login, patientRegister } from "../controller/userController.js";
import {isAdminauthenticated,isPatientauthenticated} from "../Middlewares/auth.js"

const UserRouter=express.Router();

UserRouter.post("/register",patientRegister)
UserRouter.post("/login",login)
UserRouter.post("/admin/addnew",isAdminauthenticated,AddnewAdmin)
UserRouter.get("/doctors",getAllDoctors)
UserRouter.get("/admin/me",isAdminauthenticated,getUserDetails)
UserRouter.get("/patient/me",isPatientauthenticated,getUserDetails)
export default UserRouter
