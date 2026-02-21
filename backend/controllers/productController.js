// import productModel from "../models/productModel.js";
// import categoryModel from "../models/categoryModel.js";
// import fs from "fs";
// import path from "path";

// // Helper function to remove uploaded files
// const removeUploadedFiles = (files) => {
//   if (files.thumbImg) {
//     files.thumbImg.forEach(file => {
//       const filePath = path.join( 'uploads', 'products', file.filename);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     });
//   }
//   if (files.galleryImg) {
//     files.galleryImg.forEach(file => {
//       const filePath = path.join('uploads', 'products', file.filename);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     });
//   }
// };

// // ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       slug,
//       price,
//       description,
//       shortDescription,
//       category,
//       minimumOrderQuantity,
//     } = req.body;

//     // Validation
//     if (!name || !slug || !price || !description || !shortDescription || !category || !minimumOrderQuantity) {
//       if (req.files) removeUploadedFiles(req.files);
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!req.files || !req.files.thumbImg) {
//       return res.status(400).json({
//         success: false,
//         message: "Thumbnail image is required",
//       });
//     }

//     // Check if slug exists
//     const existingProduct = await productModel.findOne({ slug });
//     if (existingProduct) {
//       removeUploadedFiles(req.files);
//       return res.status(400).json({
//         success: false,
//         message: "Product with this slug already exists",
//       });
//     }

//     // Process category IDs
//     let categoryIds = [];
//     if (typeof category === 'string') {
//       categoryIds = category.split(',').map(id => id.trim());
//     } else if (Array.isArray(category)) {
//       categoryIds = category;
//     }

//     // Verify categories exist
//     const validCategories = await categoryModel.find({ _id: { $in: categoryIds } });
//     if (validCategories.length !== categoryIds.length) {
//       removeUploadedFiles(req.files);
//       return res.status(400).json({
//         success: false,
//         message: "One or more categories are invalid",
//       });
//     }

//     // Process images
//     const thumbImg = `/uploads/products/${req.files.thumbImg[0].filename}`;
    
//     let galleryImages = [];
//     if (req.files.galleryImg) {
//       galleryImages = req.files.galleryImg.map(file => `/uploads/products/${file.filename}`);
//     }

//     // Create product
//     const product = await productModel.create({
//       name,
//       slug: slug.startsWith('/') ? slug.slice(1) : slug,
//       thumbImg,
//       galleryImg: galleryImages,
//       price,
//       description,
//       shortDescription,
//       category: categoryIds,
//       minimumOrderQuantity,
//       isActive: true,
//     });

//     // Populate category data
//     const populatedProduct = await productModel
//       .findById(product._id)
//       .populate('category', 'name slug');

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: populatedProduct,
//     });
//   } catch (error) {
//     if (req.files) removeUploadedFiles(req.files);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Get All Products (Public)
// export const getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, category } = req.query;
//     const query = { isActive: true };

//     if (search) {
//       query.$text = { $search: search };
//     }

//     if (category) {
//       query.category = category;
//     }

//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;

//     const products = await productModel
//       .find(query)
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limitNum);

//     const total = await productModel.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       total,
//       currentPage: pageNum,
//       totalPages: Math.ceil(total / limitNum),
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Get All Products (Admin)
// export const getAllProductsAdmin = async (req, res) => {
//   try {
//     const products = await productModel
//       .find()
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Get Single Product by Slug
// export const getProductBySlug = async (req, res) => {
//   try {
//     const product = await productModel
//       .findOne({ slug: req.params.slug, isActive: true })
//       .populate('category', 'name slug image');

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Get related products from same categories
//     const relatedProducts = await productModel
//       .find({
//         _id: { $ne: product._id },
//         category: { $in: product.category },
//         isActive: true,
//       })
//       .populate('category', 'name')
//       .limit(4)
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: product,
//       relatedProducts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Get Single Product by ID (Admin)
// export const getProductById = async (req, res) => {
//   try {
//     const product = await productModel
//       .findById(req.params.id)
//       .populate('category', 'name slug');

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const {
//       name,
//       slug,
//       price,
//       description,
//       shortDescription,
//       category,
//       minimumOrderQuantity,
//       isActive,
//     } = req.body;

//     const existingProduct = await productModel.findById(productId);
//     if (!existingProduct) {
//       if (req.files) removeUploadedFiles(req.files);
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Check if slug is being changed and if it already exists
//     if (slug && slug !== existingProduct.slug) {
//       const slugExists = await productModel.findOne({
//         slug: slug.startsWith('/') ? slug.slice(1) : slug,
//         _id: { $ne: productId },
//       });
//       if (slugExists) {
//         if (req.files) removeUploadedFiles(req.files);
//         return res.status(400).json({
//           success: false,
//           message: "Slug already exists",
//         });
//       }
//     }

//     // Handle thumbnail image update
//     let thumbImg = existingProduct.thumbImg;
//     if (req.files && req.files.thumbImg) {
//       // Remove old thumbnail
//       if (existingProduct.thumbImg) {
//         const oldThumbPath = path.join('public', existingProduct.thumbImg);
//         if (fs.existsSync(oldThumbPath)) fs.unlinkSync(oldThumbPath);
//       }
//       thumbImg = `/uploads/products/${req.files.thumbImg[0].filename}`;
//     }

//     // Handle gallery images update
//     let galleryImg = existingProduct.galleryImg;
//     if (req.files && req.files.galleryImg) {
//       // Remove old gallery images
//       if (existingProduct.galleryImg && existingProduct.galleryImg.length > 0) {
//         existingProduct.galleryImg.forEach(imgPath => {
//           const fullPath = path.join('public', imgPath);
//           if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
//         });
//       }
//       galleryImg = req.files.galleryImg.map(file => `/uploads/products/${file.filename}`);
//     }

//     // Process category IDs
//     let categoryIds = existingProduct.category;
//     if (category) {
//       if (typeof category === 'string') {
//         categoryIds = category.split(',').map(id => id.trim());
//       } else if (Array.isArray(category)) {
//         categoryIds = category;
//       }
//     }

//     // Update product
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       productId,
//       {
//         name: name || existingProduct.name,
//         slug: slug ? (slug.startsWith('/') ? slug.slice(1) : slug) : existingProduct.slug,
//         thumbImg,
//         galleryImg,
//         price: price || existingProduct.price,
//         description: description || existingProduct.description,
//         shortDescription: shortDescription || existingProduct.shortDescription,
//         category: categoryIds,
//         minimumOrderQuantity: minimumOrderQuantity || existingProduct.minimumOrderQuantity,
//         isActive: isActive !== undefined ? isActive : existingProduct.isActive,
//       },
//       { new: true, runValidators: true }
//     ).populate('category', 'name slug');

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (error) {
//     if (req.files) removeUploadedFiles(req.files);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Remove all product images
//     if (product.thumbImg) {
//       const thumbPath = path.join('public', product.thumbImg);
//       if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
//     }

//     if (product.galleryImg && product.galleryImg.length > 0) {
//       product.galleryImg.forEach(imgPath => {
//         const fullPath = path.join('public', imgPath);
//         if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
//       });
//     }

//     await productModel.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ Toggle Product Status
// export const toggleProductStatus = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     product.isActive = !product.isActive;
//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to remove uploaded files
const removeUploadedFiles = (files) => {
  if (files?.thumbImg) {
    files.thumbImg.forEach(file => {
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'products', file.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  }
  if (files?.galleryImg) {
    files.galleryImg.forEach(file => {
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'products', file.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  }
};

// Helper to remove specific image files
const removeImageFiles = (imagePaths) => {
  imagePaths.forEach(imgPath => {
    const fullPath = path.join(process.cwd(), 'public', imgPath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  });
};

// ✅ Create Product (unchanged from your original)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      price,
      description,
      shortDescription,
      category,
      minimumOrderQuantity,
    } = req.body;

    // Validation
    if (!name || !slug || !price || !description || !shortDescription || !category || !minimumOrderQuantity) {
      if (req.files) removeUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.files || !req.files.thumbImg) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    // Check if slug exists
    const existingProduct = await productModel.findOne({ slug });
    if (existingProduct) {
      removeUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    // Process category IDs
    let categoryIds = [];
    if (typeof category === 'string') {
      categoryIds = category.split(',').map(id => id.trim());
    } else if (Array.isArray(category)) {
      categoryIds = category;
    }

    // Verify categories exist
    const validCategories = await categoryModel.find({ _id: { $in: categoryIds } });
    if (validCategories.length !== categoryIds.length) {
      removeUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "One or more categories are invalid",
      });
    }

    // Process images
    const thumbImg = `/uploads/products/${req.files.thumbImg[0].filename}`;
    
    let galleryImages = [];
    if (req.files.galleryImg) {
      galleryImages = req.files.galleryImg.map(file => `/uploads/products/${file.filename}`);
    }

    // Create product
    const product = await productModel.create({
      name,
      slug: slug.startsWith('/') ? slug.slice(1) : slug,
      thumbImg,
      galleryImg: galleryImages,
      price,
      description,
      shortDescription,
      category: categoryIds,
      minimumOrderQuantity,
      isActive: true,
    });

    // Populate category data
    const populatedProduct = await productModel
      .findById(product._id)
      .populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    if (req.files) removeUploadedFiles(req.files);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get All Products (Public) - unchanged
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await productModel
      .find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await productModel.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get All Products (Admin) - unchanged
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get Single Product by Slug - unchanged
export const getProductBySlug = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug image');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get related products from same categories
    const relatedProducts = await productModel
      .find({
        _id: { $ne: product._id },
        category: { $in: product.category },
        isActive: true,
      })
      .populate('category', 'name')
      .limit(4)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: product,
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get Single Product by ID (Admin) - updated to handle populated fields
export const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Update Product - COMPLETELY REWRITTEN FOR BETTER IMAGE HANDLING
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      slug,
      price,
      description,
      shortDescription,
      category,
      minimumOrderQuantity,
      isActive,
      imagesToRemove, // JSON string of images to delete
    } = req.body;

    // Find existing product
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      if (req.files) removeUploadedFiles(req.files);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await productModel.findOne({
        slug: slug.startsWith('/') ? slug.slice(1) : slug,
        _id: { $ne: productId },
      });
      if (slugExists) {
        if (req.files) removeUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    // Handle images to remove
    if (imagesToRemove) {
      const imagesToDelete = JSON.parse(imagesToRemove);
      
      // Filter out removed images from gallery
      existingProduct.galleryImg = existingProduct.galleryImg.filter(
        img => !imagesToDelete.includes(img)
      );
      
      // Delete the actual files
      imagesToDelete.forEach(imgPath => {
        const fullPath = path.join(process.cwd(), 'public', imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    // Handle thumbnail update
    let thumbImg = existingProduct.thumbImg;
    if (req.files && req.files.thumbImg) {
      // Remove old thumbnail file
      if (existingProduct.thumbImg) {
        const oldThumbPath = path.join(process.cwd(), 'public', existingProduct.thumbImg);
        if (fs.existsSync(oldThumbPath)) {
          fs.unlinkSync(oldThumbPath);
        }
      }
      // Set new thumbnail
      thumbImg = `/uploads/products/${req.files.thumbImg[0].filename}`;
    }

    // Handle new gallery images
    let galleryImg = existingProduct.galleryImg || [];
    if (req.files && req.files.galleryImg) {
      const newGalleryImages = req.files.galleryImg.map(
        file => `/uploads/products/${file.filename}`
      );
      galleryImg = [...galleryImg, ...newGalleryImages];
    }

    // Process category IDs
    let categoryIds = existingProduct.category;
    if (category) {
      if (typeof category === 'string') {
        categoryIds = category.split(',').map(id => id.trim());
      } else if (Array.isArray(category)) {
        categoryIds = category;
      }
    }

    // Update product with all fields
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name: name || existingProduct.name,
        slug: slug ? (slug.startsWith('/') ? slug.slice(1) : slug) : existingProduct.slug,
        thumbImg,
        galleryImg,
        price: price || existingProduct.price,
        description: description || existingProduct.description,
        shortDescription: shortDescription || existingProduct.shortDescription,
        category: categoryIds,
        minimumOrderQuantity: minimumOrderQuantity || existingProduct.minimumOrderQuantity,
        isActive: isActive !== undefined ? isActive : existingProduct.isActive,
      },
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    if (req.files) removeUploadedFiles(req.files);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Delete Product - updated with correct path
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Remove all product images
    if (product.thumbImg) {
      const thumbPath = path.join(process.cwd(), 'public', product.thumbImg);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }

    if (product.galleryImg && product.galleryImg.length > 0) {
      product.galleryImg.forEach(imgPath => {
        const fullPath = path.join(process.cwd(), 'public', imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Toggle Product Status - unchanged
export const toggleProductStatus = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
