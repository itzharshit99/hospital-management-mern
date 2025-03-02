import Meeting from "../models/meetingModel.js";


const startMeeting = async(req,res)=>{
  try {
    const { docId, userId } = req.body;

    // Generate a unique meeting link
    const meetingLink = `https://meet.jit.si/${docId}-${userId}-${Date.now()}`;

    // Save the meeting link in the database
    const newMeeting = new Meeting({ docId, userId, meetingLink });
    await newMeeting.save();
    res.status(200).json({ success: true, meetingLink });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export {startMeeting};