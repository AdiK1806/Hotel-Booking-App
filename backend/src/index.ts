import express, { Request,Response,urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from './routes/users.route'
import authRoutes from './routes/auth.route'
import cookieParser from "cookie-parser"
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app=express();
app.use(cookieParser());
app.use(express.json()); //Converts body of API req to JSON automatically
app.use(urlencoded({extended:true}));//helps parses entire url
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));//For security: blocks certain urls as required


app.use(express.static(path.join(__dirname, "../../frontend/dist")));




app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(7000,()=>{
    console.log("Server running on http://localhost:7000/")    
});