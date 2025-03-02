import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  docId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  prescriptionText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const prescriptionModel = mongoose.model('prescription', prescriptionSchema);
export default prescriptionModel;
