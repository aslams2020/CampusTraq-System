import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Automated Health & Leave System</h1>
        <p>Efficiently manage student records & reports</p>
      </header>

      <div className="content">
        <div className="card">
          <h2>📋 Student List</h2>
          <p>View and manage student records efficiently.</p>
          <Link to="/students" className="btn">View Students</Link>
        </div>

        <div className="card">
          <h2>🤒 Report Sick</h2>
          <p>Report a student's sickness quickly and notify parents.</p>
          <Link to="/report-sick" className="btn">Report Sick</Link>
        </div>

        <div className="card">
          <h2>🏫 Report Leave</h2>
          <p>Apply for student leave and inform coordinators.</p>
          <Link to="/report-leave" className="btn">Report Leave</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
