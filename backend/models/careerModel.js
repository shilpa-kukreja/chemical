import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    qualification: { type: String, required: true},
    experience: { type: String, default: "" },
    age: { type: String, default: "" },            // e.g., "18-30"
    workingHours: { type: String, default: "" },   // e.g., "9-5", "Flexible"
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const careerModel = mongoose.models.Career || mongoose.model("Career", careerSchema);
export default careerModel;