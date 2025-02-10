import express, { json, urlencoded } from "express"
import { config } from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./Middlewares/errorMiddleware.js";
const app=express()
config({
    path:"./config/config.env"
})

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

dbConnection()
app.use(errorMiddleware)
export default app;