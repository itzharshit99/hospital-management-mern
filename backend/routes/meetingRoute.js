import express from 'express';
import { startMeeting } from '../controllers/meetingController.js';
const meetingRouter = express.Router();

meetingRouter.post("/start-meeting",startMeeting)

export default meetingRouter;