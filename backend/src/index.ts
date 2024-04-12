import express, { Request,Response,urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users.route';
import authRoutes from './routes/auth.route';
import myHotelRoutes from './routes/my-hotels.route'
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import hotelRoutes from './routes/hotels.route'
import bookingRoutes from './routes/my-bookings.route'


//CLOUDINARY CONNECTION
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

// DB CONNECTION
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);


// BACKEND SETUP
const app=express();
app.use(cookieParser());
app.use(express.json()); //Converts body of API req to JSON automatically
app.use(urlencoded({extended:true}));//helps parses entire url
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));//For security: blocks certain urls as required


// FRONTEND CONNECTION FOR BUILD
app.use(express.static(path.join(__dirname, "../../frontend/dist")));


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/my-hotels",myHotelRoutes);
app.use("/api/hotels",hotelRoutes);
app.use("/api/my-bookings",bookingRoutes);


app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  
app.listen(7000,()=>{
    console.log("Server running on http://localhost:7000/")    
});