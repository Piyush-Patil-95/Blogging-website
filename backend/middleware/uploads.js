import multer from "multer";
import path from "path";

// Define storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to /uploads folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // e.g. 1695923819.png
    );
  },
});

// Filter only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
