const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
// app.use("/api/students", studentRoutes);
// app.use("/api/applications", applicationRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed", err));

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  name: String,
  manifesto: String,
  votes: { type: Number, default: 0 },
  voters: { type: [String], default: [] }, // Store voter IDs to prevent duplicate voting
});

const Candidate = mongoose.model("Candidate", candidateSchema);

// Middleware for verifying Admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== "admin") return res.status(403).json({ error: "Unauthorized" });
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

// Get all candidates
app.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

// Add a new candidate (Admin Only)
app.post("/candidates", verifyAdmin, async (req, res) => {
  try {
    const { name, manifesto } = req.body;
    const newCandidate = new Candidate({ name, manifesto });
    await newCandidate.save();
    io.emit("updateCandidates", await Candidate.find()); // Notify all clients
    res.json({ message: "Candidate added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add candidate" });
  }
});

// Remove a candidate (Admin Only)
app.delete("/candidates/:id", verifyAdmin, async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    io.emit("updateCandidates", await Candidate.find()); // Notify all clients
    res.json({ message: "Candidate removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove candidate" });
  }
});

// Voting Endpoint
app.post("/vote", async (req, res) => {
  try {
    const { candidateId, voterId } = req.body;
    const candidate = await Candidate.findById(candidateId);
    
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });
    if (candidate.voters.includes(voterId)) return res.status(400).json({ error: "You have already voted" });

    candidate.votes += 1;
    candidate.voters.push(voterId);
    await candidate.save();
    
    io.emit("updateVotes", await Candidate.find()); // Notify all clients
    res.json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cast vote" });
  }
});

// Socket.io for real-time updates
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
