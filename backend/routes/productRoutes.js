import express from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsAdmin,
  getProductBySlug,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "../controllers/productController.js";
import { uploadProductImages } from "../middleware/productMiddleware.js";


const productRoutes = express.Router();

// Public routes
productRoutes.get("/", getAllProducts);
productRoutes.get("/:slug", getProductBySlug);

// Admin routes
productRoutes.post("/", uploadProductImages, createProduct);
productRoutes.get("/admin/all", getAllProductsAdmin);
productRoutes.get("/admin/:id", getProductById);
productRoutes.put("/:id", uploadProductImages, updateProduct);
productRoutes.delete("/:id", deleteProduct);
productRoutes.patch("/:id/toggle-status", toggleProductStatus);

export default productRoutes;