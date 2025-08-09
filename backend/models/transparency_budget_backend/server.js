const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config(); // ✅ Load env variables at the top

const app = express();
const PORT = 5000;


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send emails
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ MongoDB Connection (ONLY ONCE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Application Schema
const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  regNo: String,
  designation: String,
  date: String,
  budgetFile: String,
  explanation: String,
  status: { type: String, default: "Pending" },
  facultyRemark: String,
});

const Application = mongoose.model("Application", ApplicationSchema);

// ✅ POST: Submit applications
app.post("/applications", upload.single("budgetFile"), async (req, res) => {
  try {
    const { name, email, regNo, designation, date, explanation } = req.body;
    const budgetFile = req.file ? req.file.filename : null;

    const newApplication = new Application({
      name,
      email,
      regNo,
      designation,
      date,
      budgetFile,
      explanation,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving application:", error);
    res.status(500).json({ error: "Server error while saving application" });
  }
});

// ✅ GET: Fetch all applications
app.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ error: "Server error while fetching applications" });
  }
});

// ✅ PUT: Update application status & send email
app.put("/applications/:id", async (req, res) => {
  try {
    const { status, facultyRemark } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // ✅ Update application status
    application.status = status;
    application.facultyRemark = facultyRemark;
    await application.save();

    // ✅ Send Email Notification
    const emailMessage = `Dear ${application.name},\n\nYour application has been ${status}.\n\nRemarks: ${facultyRemark}\n\nThank you.`;
    await sendEmail(application.email, `Application ${status}`, emailMessage);

    res.status(200).json({ message: `Application marked as ${status} and email sent!` });
  } catch (error) {
    console.error("❌ Error updating application status:", error);
    res.status(500).json({ error: "Server error while updating status" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
