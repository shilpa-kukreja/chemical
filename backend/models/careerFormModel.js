import mongoose from "mongoose";


const carrerFormSchema  = new mongoose.Schema({
     fullname: { type: String, required: true },
     email: { type: String, required: true },
     phone: { type: String, required: true },
     position: { type: String, required: true },
     resume: { type: String, required: true },
     coverLetter: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })
const carrerFormModel = mongoose.models.carrerForm || mongoose.model("carrerForm", carrerFormSchema);
export default carrerFormModel;
