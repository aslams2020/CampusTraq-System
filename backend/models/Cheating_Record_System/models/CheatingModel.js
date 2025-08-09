const mongoose = require("mongoose");

const CheatingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reason: { type: String, required: true },
  proof: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Cheating", CheatingSchema);
