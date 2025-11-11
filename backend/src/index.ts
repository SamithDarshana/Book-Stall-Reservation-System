import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
