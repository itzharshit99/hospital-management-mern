import mongoose from 'mongoose';


const meetingSchema = new mongoose.Schema({
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "Doctor",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "User",
        required: true
    },
    meetingLink: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Meeting = mongoose.model("Meeting",meetingSchema);
export default Meeting