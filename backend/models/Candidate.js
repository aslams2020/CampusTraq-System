const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  manifesto: String,
  votes: { type: Number, default: 0 },
  voters: [String], // Store voter emails to prevent multiple votes
});

module.exports = mongoose.model("Candidate", candidateSchema);
