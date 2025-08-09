import React, { useState } from "react";
import "./ReportStudent.css"; // Import the new CSS file

const ReportStudent = () => {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [parentEmail, setParentEmail] = useState("");
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
      <h2>Report Student Status</h2>
      
      <div className="form-group">
        <label>Student Name:</label>
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Registration Number:</label>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </div>

      {/* Report Sick Section */}
      <div className="form-group">
        <label>Class Coordinator Email:</label>
        <input
          type="email"
          placeholder="Enter Class Coordinator Email (Optional)"
          value={classCoordinatorEmail}
          onChange={(e) => setClassCoordinatorEmail(e.target.value)}
        />
      </div>
      <button className="btn report-sick" onClick={handleReportSick}>
        Report Sick
      </button>

      {/* Report Leave Section */}
      <div className="form-group">
        <label>Parent's Email:</label>
        <input
          type="email"
          placeholder="Enter Parent's Email"
          value={parentEmail}
          onChange={(e) => setParentEmail(e.target.value)}
        />
      </div>
      <button className="btn report-leave" onClick={handleReportLeave}>
        Report Leave
      </button>
    </div>
  );
};

export default ReportStudent;
