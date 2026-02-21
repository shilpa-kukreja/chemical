import express from "express";
import {
  createCategory,
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoryBySlug,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";
import { upload } from "../middleware/categoryMiddleware.js";

const categoryRoutes = express.Router();

// Public routes
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:slug", getCategoryBySlug);

// Admin routes
categoryRoutes.post("/", upload.single("image"), createCategory);
categoryRoutes.get("/admin/all", getAllCategoriesAdmin);
categoryRoutes.get("/admin/:id", getCategoryById);
categoryRoutes.put("/:id", upload.single("image"), updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;