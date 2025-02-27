import mongoose from "mongoose";
const campSchema = new mongoose.Schema({
  campName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const MedicalCamp = mongoose.model("MedicalCamp", campSchema);
export default MedicalCamp;
