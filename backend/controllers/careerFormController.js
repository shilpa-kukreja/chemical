import carrerFormModel from "../models/careerFormModel.js";
import fs from "fs";
import path from "path";

export const createCarrerForm = async (req, res) => {
    try {
        const carrerFormData = req.body;
        if (req.file) {
            carrerFormData.resume = `/uploads/resume/${req.file.filename}`;
        }
        const newCarrerForm = new carrerFormModel(carrerFormData);
        const savedCarrerForm = await newCarrerForm.save();
        res.status(201).json(savedCarrerForm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getCarrerFormById = async (req, res) => {
    try {
        const carrerForm = await carrerFormModel.findById(req.params.id);
        if (!carrerForm) return res.status(404).json({ message: "CarrerForm not found" });
        res.json(carrerForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCarrerForm = async (req, res) => {
    try {
        // First find the document to get the resume path
        const carrerForm = await carrerFormModel.findById(req.params.id);
        if (!carrerForm) {
            return res.status(404).json({ message: "CarrerForm not found" });
        }

        // Delete the resume file if it exists
        if (carrerForm.resume) {
            const filePath = path.join(process.cwd(), carrerForm.resume);
            // Check if file exists before deleting
            if (fs.existsSync(filePath)) {
                try {
                    await fs.promises.unlink(filePath);
                    console.log(`Deleted resume file: ${filePath}`);
                } catch (fileErr) {
                    // Log error but don't block deletion of the record
                    console.error(`Error deleting resume file: ${filePath}`, fileErr);
                }
            } else {
                console.log(`Resume file not found: ${filePath}, skipping`);
            }
        }

        // Delete the document
        await carrerFormModel.findByIdAndDelete(req.params.id);
        res.json({ message: "CarrerForm deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: error.message });
    }
}

export const getAllCarrerForms = async (req, res) => {
    try {
        const carrerForms = await carrerFormModel.find();
        res.json(carrerForms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}