import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    salary: { type: String, default: "" },
    experience: { type: String, default: "" },
    applicationDeadline: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true } 
);

const carrerModel = mongoose.models.Career || mongoose.model("Career", careerSchema);
export default carrerModel;