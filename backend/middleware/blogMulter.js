import multer from "multer";
import path from "path";
import fs from "fs";

// Make sure the destination folder exists (multer will NOT create it)
const uploadDir = "uploads/blogs";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // sanitize the base name so weird characters don't break the path
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 60);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,   // 25 MB per image
    fieldSize: 25 * 1024 * 1024,  // 25 MB per text field (blogDetail HTML)
    files: 5,
  },
});