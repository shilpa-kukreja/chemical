import express from "express";
import { createCarrerForm, deleteCarrerForm, getAllCarrerForms, getCarrerFormById } from "../controllers/careerFormController.js";
import upload from "../middleware/careerMulter.js";


const carrerFormRoutes = express.Router();


carrerFormRoutes.post("/carrer-forms",upload.single("resume"), createCarrerForm);
carrerFormRoutes.get("/carrer-forms", getAllCarrerForms);
carrerFormRoutes.get("/carrer-forms/:id", getCarrerFormById);
carrerFormRoutes.delete("/carrer-forms/:id", deleteCarrerForm);


export default carrerFormRoutes;