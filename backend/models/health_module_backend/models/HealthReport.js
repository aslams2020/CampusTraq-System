const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  rollNumber: String,
  reason: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthReport", HealthReportSchema);
