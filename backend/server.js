import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import meetingRouter from './routes/meetingRoute.js';

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
app.use("/api/admin",adminRouter);  // api/admin/add-doctor
app.use("/api/doctor",doctorRouter);  
app.use("/api/user", userRouter);  // api/user/register
app.use("/api/meeting",meetingRouter)

app.listen(port,()=>{
  console.log("server is running on:",port);
})