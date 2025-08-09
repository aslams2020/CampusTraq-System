const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    text: { type: String, required: true },
    isAnonymous: { type: Boolean, default: true },
    submittedAt: { type: Date, default: Date.now },
    moderated: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    boardVotes: { type: Number, default: 0 },  // Votes to reveal identity
    identityRevealed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
