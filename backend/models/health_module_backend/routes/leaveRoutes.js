const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const sendEmail = require("../utils/sendEmail");

// Submit leave request
router.post("/submit-leave", async (req, res) => {
  try {
    const { studentName, studentEmail, parentEmail, rollNumber, reason, leaveDate, returnDate } = req.body;

    // Save to database
    const newLeave = new LeaveRequest({ studentName, studentEmail, parentEmail, rollNumber, reason, leaveDate, returnDate });
    await newLeave.save();

    // Send email to parent
    await sendEmail(parentEmail, "Student Leave Notification", `${studentName} has left campus. Expected return: ${returnDate}`);

    res.json({ message: "Leave request submitted & email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
