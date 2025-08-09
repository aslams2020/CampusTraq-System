const express = require("express");
const router = express.Router();
const Cheating = require("../models/CheatingModel"); // Ensure this model exists

// @desc   Get all cheating records
// @route  GET /api/cheating
// @access Public
router.get("/", async (req, res) => {
  try {
    const records = await Cheating.find();
    res.json(records);
  } catch (err) {
    console.error("Error fetching cheating records:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Add a cheating record
// @route  POST /api/cheating
// @access Public
router.post("/", async (req, res) => {
  try {
    const { name, reason, proof } = req.body;

    if (!name || !reason || !proof) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecord = new Cheating({ name, reason, proof });
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Error saving cheating record:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
