import React, { useState } from "react";
import "./ComplaintForm.css";
import { Link } from "react-router-dom";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    complaint: "",
    anonymous: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake Moderation System
    const vulgarWords = ["badword1", "badword2", "badword3"];
    const containsVulgar = vulgarWords.some((word) =>
      formData.complaint.toLowerCase().includes(word)
    );

    if (containsVulgar) {
      setMessage("🚫 Complaint blocked due to vulgar content.");
      return;
    }

    // Fake Submission (Just storing in Local Storage)
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(formData);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    setMessage("✅ Complaint submitted successfully!");
    setFormData({ name: "", regNo: "", complaint: "", anonymous: false });
  };
  
  
  return (
    <div className="complaint-form-container">
      <div className="complaint-form">
        <h2>Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            value={formData.regNo}
            onChange={handleChange}
            required
          />
          <textarea
            name="complaint"
            placeholder="Write your complaint here..."
            value={formData.complaint}
            onChange={handleChange}
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            <label>Submit as Anonymous</label>
          </div>
          <button type="submit">Submit Complaint</button>
        </form>
        <p className="message">{message}</p>
         {/* View Complaints Link */}
        
      <Link className="link" to="/complaints">View Complaints</Link>
      
       
      </div>
    </div>
  );
};

export default ComplaintForm;