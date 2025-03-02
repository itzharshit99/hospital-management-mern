import doctorModel from "../models/doctormodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import prescriptionModel from "../models/prescriptionModel.js";
const changeAvailability = async (req,res)=>{
  try {
    const {docId} = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true,message:'Availability Changed '}) 
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }

}

const doctorList = async (req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }

}

const loginDoctor = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const doctor = await doctorModel.findOne({email})
    if(!doctor){
      return res.json({success:false,message:'Invalid Credentials'});
    }
    const isMatch = await bcrypt.compare(password,doctor.password);
    if(isMatch){
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:'Invalid Credentials'});
    }


  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const appointmentsDoctor = async(req,res)=>{
  try {
    const {docId} = req.body;
    const appointments = await appointmentModel.find({docId});
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }

}

const appointmentComplete = async(req,res)=>{
  try {
    const {docId,appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
      return res.json({success:true,message:'appointment completed'})
    }
    else{
      return res.json({success:false,message:"marked failed"});
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const appointmentCancel = async(req,res)=>{
  try {
    const {docId,appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      return res.json({success:true,message:'appointment cancelled'})
    }
    else{
      return res.json({success:false,message:"cancellation failed"});
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
const prescription = async (req, res) => {
  try {
    const { docId, userId, prescriptionText } = req.body; // Missing fields added
    console.log(docId);
    if (!docId || !userId || !prescriptionText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPrescription = new prescriptionModel({
      docId,
      userId,
      prescriptionText,
    });

    await newPrescription.save();
    res.status(201).json({ message: "Prescription sent successfully", prescription: newPrescription });
  } catch (error) {
    res.status(500).json({ message: "Error saving prescription", error: error.message });
  }
};

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,prescription}