const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  studentEmail: { type: String, unique: true }, // Prevent multiple votes
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }
});

module.exports = mongoose.model("Vote", VoteSchema);
