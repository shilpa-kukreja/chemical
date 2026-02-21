import express from "express";
import { adminLogin } from "../controllers/authController.js";

const adminRoute = express.Router();

adminRoute.post("/adminlogin", adminLogin);

export default adminRoute;
