import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import path from "path";

// ✅ Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    
    if (!name || !slug) {
      return res.status(400).json({ 
        success: false,
        message: "Name and slug are required" 
      });
    }
    
    if(!req.file){
      return res.status(400).json({ 
        success: false,
        message: "Image is required" 
      });
    }
    
    const image = `/uploads/categories/${req.file.filename}`;
    
    const existing = await categoryModel.findOne({ slug });
    if (existing) {
      // Remove uploaded file if slug exists
      if(req.file) {
        const filePath = path.join('uploads', 'categories', req.file.filename);
        if(fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      return res.status(400).json({ 
        success: false,
        message: "Slug already exists" 
      });
    }
    
    const category = await categoryModel.create({
      name, 
      image, 
      slug,
      description: description || ""
    });
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    // Remove uploaded file on error
    if(req.file) {
      const filePath = path.join('uploads', 'categories', req.file.filename);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Get All Categories (Admin - includes inactive)
export const getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await categoryModel
      .find()
      .sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Get Single Category by Slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });
    
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Get Single Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, isActive, order } = req.body;
    const categoryId = req.params.id;
    
    // Find existing category
    const existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    
    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingCategory.slug) {
      const slugExists = await categoryModel.findOne({ 
        slug, 
        _id: { $ne: categoryId } 
      });
      if (slugExists) {
        return res.status(400).json({ 
          success: false,
          message: "Slug already exists" 
        });
      }
    }
    
    // Handle image update
    let image = existingCategory.image;
    if (req.file) {
      // Remove old image
      if (existingCategory.image) {
        const oldImagePath = path.join('public', existingCategory.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = `/uploads/categories/${req.file.filename}`;
    }
    
    // Update category
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        name: name || existingCategory.name,
        slug: slug || existingCategory.slug,
        description: description || existingCategory.description,
        image,
        isActive: isActive !== undefined ? isActive : existingCategory.isActive,
        order: order || existingCategory.order,
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    
    // Remove image file
    if (category.image) {
      const imagePath = path.join('public', category.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await categoryModel.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};