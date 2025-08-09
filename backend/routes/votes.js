const express = require("express");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

const router = express.Router();

// Vote for a candidate
router.post("/", async (req, res) => {
  const { studentEmail, candidateId } = req.body;

  try {
    const existingVote = await Vote.findOne({ studentEmail });
    if (existingVote) return res.status(400).json({ error: "You have already voted!" });

    // Record the vote
    await Vote.create({ studentEmail, candidateId });

    // Increment candidate votes
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

    res.json({ message: "Vote cast successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
