import React, { useState } from "react";
import "./ReportForm.css"; // Import the CSS file

const ReportSick = () => {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [classCoordinatorEmail, setClassCoordinatorEmail] = useState("");

  const handleReportSick = async () => {
    const response = await fetch("http://localhost:5000/api/report-sick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, registrationNumber, classCoordinatorEmail }),
    });
    const data = await response.json();
    alert(data.message);
  };
  

  return (
    <div className="report-container">
      <h2>Report Student as Sick</h2>
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
        placeholder="Class Coordinator Email (Optional)"
        value={classCoordinatorEmail}
        onChange={(e) => setClassCoordinatorEmail(e.target.value)}
      />

      <button onClick={handleReportSick}>Report Sick</button>
    </div>
  );
};

export default ReportSick;
