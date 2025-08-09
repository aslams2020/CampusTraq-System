const express = require("express");
const Application = require("../models/Application");
const sendEmailNotification = require("../emailService"); // Import email service

const router = express.Router();

// Fetch all applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications" });
    }
});

// Approve or Reject application
router.put("/:id", async (req, res) => {
    const { status, facultyRemark } = req.body;

    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        application.status = status;
        application.facultyRemark = facultyRemark;
        await application.save();

        // Send email notification
        await sendEmailNotification(application.email, status, facultyRemark);

        res.json({ message: `Application ${status} successfully!` });
    } catch (error) {
        res.status(500).json({ error: "Error updating application status" });
    }
});

module.exports = router;
