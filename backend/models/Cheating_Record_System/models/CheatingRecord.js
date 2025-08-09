const mongoose = require("mongoose");

const CheatingRecordSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    reason: { type: String, required: true },
    proof: { type: String }, // Optional URL to proof (image, document)
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CheatingRecord", CheatingRecordSchema);
