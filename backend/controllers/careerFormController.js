import carrerFormModel from "../models/careerFormModel.js";



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
        const deletedCarrerForm = await carrerFormModel.findByIdAndDelete(req.params.id);
        if (!deletedCarrerForm) return res.status(404).json({ message: "CarrerForm not found" });
        res.json({ message: "CarrerForm deleted successfully" });
    } catch (error) {
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




