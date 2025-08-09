const express = require("express");
const Candidate = require("../models/Candidate");

const router = express.Router();

// Get all candidates
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.error("Error fetching candidates:", err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

// Vote for a candidate
router.post("/vote", async (req, res) => {
  try {
    const { candidateId, voterId } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    if (candidate.voters.includes(voterId)) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    candidate.votes += 1;
    candidate.voters.push(voterId);
    await candidate.save();

    res.json(candidate);
  } catch (err) {
    console.error("Error in voting:", err);
    res.status(500).json({ error: "Voting failed" });
  }
});

module.exports = router;
