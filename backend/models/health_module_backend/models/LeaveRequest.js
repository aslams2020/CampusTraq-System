const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  parentEmail: String,
  rollNumber: String,
  reason: String,
  leaveDate: Date,
  returnDate: Date
});

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
