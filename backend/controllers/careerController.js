import carrerModel from "../models/careerModel.js";

export const createCareer = async (req, res) => {
  try {
    const { title, location, description, type, tags, experience, age, workingHours, qualification } = req.body;
    
    const career = await carrerModel.create({ 
      title, 
      location, 
      description, 
      type, 
      tags,
      experience,
      age,
      workingHours,
      qualification,
    });
    
    res.status(201).json({ message: "Career added successfully", career });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getCarrers = async (req, res) => {
  try {
    const carrers = await carrerModel.find().sort({ createdAt: -1 });
    console.log(carrers);
    res.status(200).json(carrers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getCarrerById = async (req, res) => {
  try {
    const { id } = req.params;
    const carrer = await carrerModel.findById(id);
    console.log(carrer);
    if (!carrer) {
      return res.status(404).json({ message: "Carrer not found" });
    }
    res.status(200).json(carrer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const removeCarrer = async (req, res) => {
  try {
    const { id } = req.params;
    await carrerModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Carrer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateCarrer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, type, tags, experience, age, workingHours, qualification } = req.body;
    const carrer = await carrerModel.findByIdAndUpdate(
      id, 
      { title, location, description, type, tags, experience, age, workingHours, qualification }, 
      { new: true }
    );
    if (!carrer) {
      return res.status(404).json({ message: "Carrer not found" });
    }
    console.log(carrer);
    res.status(200).json({ message: "Carrer updated successfully", carrer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}