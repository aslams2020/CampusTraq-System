const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("complaints");
  console.log("Connected to MongoDB");
}

connectDB();

// POST route to save a complaint
app.post("/submit-complaint", async (req, res) => {
  try {
    const { name, regNumber, complaint, anonymous } = req.body;

    const newComplaint = {
      name: anonymous ? "Anonymous" : name,
      regNumber: anonymous ? "Hidden" : regNumber,
      complaint,
      timestamp: new Date(),
    };

    const result = await db.collection("complaints").insertOne(newComplaint);
    res.json({ message: "Complaint submitted successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});