import express from "express";
import multer from "multer";
import { handleText, handleFileUpload } from "../controllers/contentController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Text API
router.post("/analyze-text", handleText);

// File upload API
router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
