import express from "express";

import {
    getResearch,
    createResearch,
    deleteResearch,
} from "../controllers/researchController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(getResearch)
    .post(protect, createResearch);

router.route("/:id")
    .delete(protect, deleteResearch);

export default router;