const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    name: String,
    email: String, // <-- Add this field
    regNo: String,
    designation: String,
    date: String,
    budgetFile: String,
    explanation: String,
    status: { type: String, default: "Pending" },
    facultyRemark: String
});

module.exports = mongoose.model("Application", applicationSchema);
