const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    email: String,
    parentEmail: String,
    classCoordinatorEmail: String,
    status: { type: String, default: "Healthy" }
});

module.exports = mongoose.model("Student", StudentSchema);
