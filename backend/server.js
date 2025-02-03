import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middlewares
app.use(express.json());
app.use(cors());


//api endpoint
app.get("/",(req,res)=>{
  res.send("working");
})
app.use("/api/admin", adminRouter);  // api/admin/add-doctor
app.use("/api/user", userRouter);  // api/user/register

app.listen(port,()=>{
  console.log("server is running on:",port);
})