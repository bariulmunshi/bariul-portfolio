import express from "express";
import {
    getPublishedBlogs,
    getBlogBySlug,
    getAllBlogsAdmin,
    getBlogByIdAdmin,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// --- Admin routes (must come before /:slug so "admin" isn't read as a slug) ---
router.get("/admin/all", protect, getAllBlogsAdmin);
router.get("/admin/:id", protect, getBlogByIdAdmin);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// --- Public routes ---
router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

export default router;
