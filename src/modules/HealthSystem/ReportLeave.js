import React, { useState } from "react";
import "./ReportForm.css"; // Import the CSS file

const ReportLeave = () => {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const handleReportLeave = async () => {
    const response = await fetch("http://localhost:5000/api/report-leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, registrationNumber, parentEmail }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="report-container">
      <h2>Report Student Leaving Campus</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Registration Number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />
      <input
        type="email"
        placeholder="Parent's Email"
        value={parentEmail}
        onChange={(e) => setParentEmail(e.target.value)}
      />

      <button onClick={handleReportLeave}>Submit</button>
    </div>
  );
};

export default ReportLeave;
