const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

// 📌 Fetch Student by Name & Registration Number
router.get("/students/find", async (req, res) => {
    try {
        const { name, registrationNumber } = req.query;

        if (!name || !registrationNumber) {
            return res.status(400).json({ message: "❌ Name and Registration Number required!" });
        }

        const student = await Student.findOne({
            name: new RegExp("^" + name + "$", "i"), // ✅ Case-insensitive search
            registrationNumber,
        });

        if (!student) {
            return res.status(404).json({ message: "❌ Student not found!" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "❌ Server error!", error });
    }
});

// 📌 Report Student as Sick
router.put("/report-sick", async (req, res) => {
    try {
        console.log("✅ Received Data:", req.body);
        let { name, registrationNumber } = req.body;

        // Trim values to remove unwanted spaces
        name = name.trim();
        registrationNumber = registrationNumber.trim();

        if (!name || !registrationNumber) {
            return res.status(400).json({ message: "❌ Name and Registration Number required!" });
        }

        // 🟢 Check if MongoDB data types match (string comparison issue?)
        console.log("🔍 Checking MongoDB data types...");
        const studentCheck = await Student.findOne({});
        if (studentCheck) {
            console.log("📝 Sample Student Data from DB:", studentCheck);
            console.log(`📌 DB name type: ${typeof studentCheck.name}, Received name type: ${typeof name}`);
            console.log(`📌 DB regNumber type: ${typeof studentCheck.registrationNumber}, Received regNumber type: ${typeof registrationNumber}`);
        } else {
            console.log("❌ No students found in MongoDB!");
        }

        // ✅ Try direct string matching without regex
        console.log("🔍 Searching with direct match...");
        let student = await Student.findOne({ name, registrationNumber });

        if (!student) {
            console.log("❌ Direct match failed. Trying regex...");
            student = await Student.findOne({
                name: new RegExp(`^${name}$`, "i"),
                registrationNumber: new RegExp(`^${registrationNumber}$`, "i")
            });
        }

        if (!student) {
            console.log("❌ Student not found in MongoDB!");
            return res.status(404).json({ message: "❌ Student not found!" });
        }

        console.log("📝 Found Student:", JSON.stringify(student, null, 2));

        student.status = "Sick";
        await student.save();

        res.status(200).json({ message: "✅ Health report submitted!" });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "❌ Server Error", error });
    }
});



// 📌 Report Student Leaving Campus (Using Name + Registration Number Instead of ID)
router.put("/report-leave", async (req, res) => {
    try {
        const { name, registrationNumber } = req.body;

        if (!name || !registrationNumber) {
            return res.status(400).json({ message: "❌ Name and Registration Number required!" });
        }

        const student = await Student.findOne({
            name: new RegExp("^" + name + "$", "i"),
            registrationNumber,
        });

        if (!student) return res.status(404).json({ message: "❌ Student not found!" });

        student.status = "Left Campus";
        await student.save();

        // ✅ Send Email to Parent
        const emailResponse = await sendEmail(
            student.parentEmail,
            "📢 Safety Notification: Student Left Campus",
            `Student ${student.name} (Registration Number: ${student.registrationNumber}) has left campus.\nThis is an automated notification for safety tracking.`
        );

        if (!emailResponse.success) return res.status(500).json(emailResponse);

        res.status(200).json({ message: "✅ Leave report submitted & email sent!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Server Error", error });
    }
});

module.exports = router;
