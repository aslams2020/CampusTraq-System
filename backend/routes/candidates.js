const express = require("express");
const Candidate = require("../models/Candidate");

const router = express.Router();

// Fetch all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await candidates.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
