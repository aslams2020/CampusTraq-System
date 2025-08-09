import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComplaintForm.css";
import "./ComplaintList.css";


const restrictedWords = ["violence", "kill", "attack", "abuse", "hate", "rape", "murder", "bomb", "terror", "shoot"];

const containsRestrictedWords = (text) => {
  const sanitizedText = text.toLowerCase().replace(/[^a-z\s]/g, ""); // Remove non-alphabetic characters except spaces
  return restrictedWords.some(word => new RegExp(`\\b${word}\\b`, "gi").test(sanitizedText)); // Match exact words
};


const ComplaintSystem = () => {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ name: "", regNo: "", text: "", isAnonymous: true });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    
    if (containsRestrictedWords(form.text)) {
      setError("Your complaint contains restricted words. Please remove them and try again.");
      return; // Stop submission
    }
    if (!containsRestrictedWords(form.text)) {
      setError(""); // Clear error if valid
    }
    

    setError(""); // Clear error if valid
    try {
      await axios.post("http://localhost:5000/api/complaints", form);
      fetchComplaints();
      setForm({ name: "", regNo: "", text: "", isAnonymous: true });
    } catch (err) {
      console.error("Error submitting complaint", err);
    }
  };

  return (
    <div className="container">
      <h1>Anonymous Complaint System</h1>

      {/* Complaint Form */}
      <form onSubmit={submitComplaint}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Registration Number" value={form.regNo} onChange={(e) => setForm({ ...form, regNo: e.target.value })} required />
        <textarea placeholder="Enter your complaint" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
        <label>
          <input type="checkbox" checked={form.isAnonymous} onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })} />
          Submit as Anonymous
        </label>
        <button type="submit">Submit Complaint</button>
      </form>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* Complaints List */}
      <h2>Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id} style={{ backgroundColor: complaint.isBlocked ? "red" : "lightgray" }}>
            <p><strong>Complaint:</strong> {complaint.isBlocked ? "[Blocked]" : complaint.text}</p>
            <p><strong>Submitted by:</strong> {complaint.identityRevealed ? complaint.name : "Anonymous"}</p>
            <p><strong>Status:</strong> {complaint.moderated ? "Moderated" : "Pending Moderation"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintSystem;
