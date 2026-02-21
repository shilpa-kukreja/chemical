import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    thumbImg: {
      type: String,
      required: [true, "Thumbnail image is required"],
    },
    galleryImg: [
      {
        type: String,
      },
    ],
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "At least one category is required"],
      },
    ],
    minimumOrderQuantity: {
      type: String,
      required: [true, "Minimum order quantity is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
productSchema.index({ name: "text", description: "text", shortDescription: "text" });

const productModel =mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;