const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB fails to connect
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/cheating", require("./routes/cheatingRoutes"));

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server only if DB is connected
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
