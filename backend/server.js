import exprees from "express";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { fileURLToPath } from 'url'; 
import path from "path";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import mainbannerRouter from "./routes/mainbannerRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import enuiryRoutes from "./routes/enquiryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = exprees();
app.use(exprees.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use("/api/admin", adminRoute);
app.use('/api/blog', blogRouter);
app.use("/api/categories",categoryRoutes)
app.use("/api/products", productRoutes);
app.use("/api/mainbanner", mainbannerRouter); 
app.use('/api/enquiries', enuiryRoutes);
app.use('/api/contact', contactRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});