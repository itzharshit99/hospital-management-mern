import express from "express";
import {appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, loginDoctor, prescription} from "../controllers/doctorController.js"
import authDoctor from "../middleware/auth.doctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list",doctorList)
doctorRouter.post("/login",loginDoctor)
doctorRouter.get("/appointments",authDoctor,appointmentsDoctor);
doctorRouter.post("/complete-appointment",authDoctor,appointmentComplete);
doctorRouter.post("/cancel-appointment",authDoctor,appointmentCancel);
doctorRouter.post("/prescription",authDoctor,prescription)


export default doctorRouter;