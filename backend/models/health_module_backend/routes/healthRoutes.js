const express = require("express");
const router = express.Router();
const HealthReport = require("../models/HealthReport");
const sendEmail = require("../utils/sendEmail"); // Utility function for email
const emailResponse = await sendEmail(coordinatorEmail, "Student Health Report", `${studentName} is reported sick. Reason: ${reason}`);

// Submit health report
router.post("/submit-health", async (req, res) => {
  try {
    const { studentName, studentEmail, rollNumber, reason } = req.body;

    // Save in database
    const newReport = new HealthReport({ studentName, studentEmail, rollNumber, reason });
    await newReport.save();

    // Send email to class coordinator
    const coordinatorEmail = "coordinator@example.com"; // Replace with actual coordinator email
    await sendEmail(coordinatorEmail, "Student Health Report", `${studentName} is reported sick. Reason: ${reason}`);

    res.json({ message: "Health report submitted & email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
if (!emailResponse.success) {
  console.error("❌ Email sending failed:", emailResponse.error);
  return res.status(500).json({ error: "Failed to send email!" });
}

module.exports = router;
