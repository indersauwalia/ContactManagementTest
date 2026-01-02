import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js"; // ← NEW

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/contacts", contactRoutes); // ← NEW

// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend API is working!" });
});

// Serve React frontend
const clientPath = path.join(__dirname, "../../client");
app.use(express.static(clientPath));

// Catch-all for React routing (named wildcard)
app.get("/*anything", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/contactdb")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});