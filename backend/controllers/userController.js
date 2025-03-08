import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctormodel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
import Feedback from "../models/feedbackModel.js";
import Meeting from "../models/meetingModel.js";
import prescriptionModel from "../models/prescriptionModel.js";
import MedicalCamp from "../models/campModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "enter a strong password password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const updateData = req.body;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }
    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "doctor not available" });
    }
    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "appointment booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const listAppointment = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const appointments = await appointmentModel.find({ userId });
//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Fetch all appointments for the given user
    const appointments = await appointmentModel.find({ userId });

    // Fetch meeting links for each appointment
    const appointmentsWithMeetings = await Promise.all(
      appointments.map(async (appointment) => {
        const meeting = await Meeting.findOne({
          docId: appointment.docId, 
          userId: appointment.userId,
        });

        return {
          ...appointment._doc, 
          meetingLink: meeting ? meeting.meetingLink : null, // Attach meeting link
          meetingStatus: meeting ? meeting.status : "Not Scheduled",
        };
      })
    );

    res.json({ success: true, appointments: appointmentsWithMeetings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancleAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment canceled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const addFeedback = async (req, res) => {
  try {
    const { doctorName, feedback } = req.body;

    // Validate input
    if (!doctorName || !feedback) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({ doctorName, feedback });
    await newFeedback.save();

    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getPrescription = async(req,res)=>{
  try {
    const {userId} = req.body;
    const prescriptions = await prescriptionModel.find({ userId}).populate("docId", "name");
    res.json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
}
const razorpayInstance = new razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});


const sendSMS = async (req,res)=>{
  try {
    const { name, location, date } = req.body;

    // Save the camp to the database
    const newCamp = new MedicalCamp({ name, location, date });
    await newCamp.save();

    // Fetch all users' phone numbers
    const users = await User.find({}, { phoneNumber: 1, _id: 0 });
    const phoneNumbers = users.map((user) => user.phoneNumber).join(","); // Join numbers with a comma

    // Send SMS to all users
    const message = `New Camp Added: ${name} at ${location} on ${date}. Visit us!`;
    await sendSMS(phoneNumbers, message);

    res.status(201).json({ message: "Camp added and SMS sent successfully!" });
  } catch (error) {
    console.error("Error adding camp:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


const paymentRazorpay = async (req, res) => {};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancleAppointment,
  addFeedback,
  getPrescription
};
