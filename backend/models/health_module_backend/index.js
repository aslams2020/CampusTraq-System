const express = require("express");
const { connectDB, getDB } = require("./config");
const cors = require("cors");
const { sendEmail } = require("./emailService"); // Import email service
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to Database
connectDB().then(() => {
    console.log("✅ Database Initialized!");
}).catch((err) => {
    console.error("❌ Database connection failed:", err);
});

// 📌 Route 1: Report Sick (Email ONLY to Class Coordinator)
app.post("/api/report-sick", async (req, res) => {
    try {
        const db = getDB();
        const studentsCollection = db.collection("students");

        const { name, registrationNumber, classCoordinatorEmail } = req.body;

        console.log("✅ Received Sick Report Data:", req.body);

        // Update or Insert Student Status as "Sick"
        let student = await studentsCollection.findOne({ registrationNumber });
        if (student) {
            await studentsCollection.updateOne(
                { _id: student._id },
                { $set: { status: "Sick" } }
            );
            console.log(`📝 Updated status: ${name} marked as Sick.`);
        } else {
            student = { name, registrationNumber, classCoordinatorEmail, status: "Sick" };
            await studentsCollection.insertOne(student);
            console.log(`🆕 New student added: ${name} marked as Sick.`);
        }

        // 📩 Send Email to Class Coordinator ONLY
        console.log("📩 Sending email to Class Coordinator...");

        const coordinatorEmailStatus = await sendEmail(
            classCoordinatorEmail,
            "Health Notification",
            `${name} has been marked as sick.`
        );

        console.log("✅ Email Sent Status:", { coordinatorEmailStatus });

        res.status(200).json({ 
            success: true, 
            message: "Student marked as sick.",
            emailStatus: { coordinatorEmailStatus }
        });

    } catch (error) {
        console.error("❌ Error reporting sick student:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// 📌 Route 2: Report Leave (Email ONLY to Parent)
app.post("/api/report-leave", async (req, res) => {
    try {
        const db = getDB();
        const studentsCollection = db.collection("students");

        const { name, registrationNumber, parentEmail } = req.body;

        console.log("✅ Received Leave Report Data:", req.body);

        // Update or Insert Student Status as "Left Campus"
        let student = await studentsCollection.findOne({ registrationNumber });
        if (student) {
            await studentsCollection.updateOne(
                { _id: student._id },
                { $set: { status: "Left Campus" } }
            );
            console.log(`🚶‍♂️ Updated status: ${name} marked as Left Campus.`);
        } else {
            student = { name, registrationNumber, parentEmail, status: "Left Campus" };
            await studentsCollection.insertOne(student);
            console.log(`🆕 New student added: ${name} marked as Left Campus.`);
        }

        // 📩 Send Email to Parent ONLY
        console.log("📩 Sending email to Parent...");

        const parentEmailStatus = await sendEmail(
            parentEmail,
            "Leave Notification",
            `${name} has left the campus for safety tracking.`
        );

        console.log("✅ Email Sent Status:", { parentEmailStatus });

        res.status(200).json({ 
            success: true, 
            message: "Student marked as left campus.",
            emailStatus: { parentEmailStatus }
        });

    } catch (error) {
        console.error("❌ Error reporting student leave:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
