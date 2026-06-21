import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No image file provided",
                });
            }

            const file = req.file.buffer;

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        { folder: "portfolio-projects" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    )
                    .end(file);
            });

            res.json({
                success: true,
                imageUrl: result.secure_url,
            });
        } catch (error) {
            console.error("Upload Error:", error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

export default router;
