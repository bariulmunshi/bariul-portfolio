import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Temporary fix for local DNS resolution issues
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

connectDB();

const app = express();

/*
Middlewares
*/
app.use(cors()); 
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use(
    "/api/auth",
    authRoutes
);  
app.use("/api/upload", uploadRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/blog", blogRoutes);
/*
Health Check Route
*/
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running successfully."
    });
});

/*
Server
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});