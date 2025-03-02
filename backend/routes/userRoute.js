import express from 'express';
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancleAppointment, addFeedback, getPrescription } from '../controllers/userController.js';
import authUser from '../middleware/auth.user.js';
import upload from '../middleware/multer.js';
import { getMedicalCamps } from '../controllers/adminController.js';
const userRouter = express.Router();
userRouter.post('/register', registerUser);

userRouter.post("/login", loginUser);
userRouter.get("/get-profile",authUser,getProfile);
userRouter.post("/update-profile",upload.single('image'),authUser,updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment);
userRouter.get("/appointments",authUser,listAppointment);
userRouter.post("/cancel-appointment",authUser,cancleAppointment)
userRouter.post("/add-feedback",authUser,addFeedback)
userRouter.get("/get-camps",authUser,getMedicalCamps);
userRouter.get("/get-prescription",authUser,getPrescription);


export default userRouter;