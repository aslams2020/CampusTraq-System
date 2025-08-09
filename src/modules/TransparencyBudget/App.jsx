import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import FacultyDashboard from "./FacultyDashboard";

const TransparencyBudget = () => {
  return (
    <div className="container">
      <h1>Transparency Budget System</h1>

      <nav className="navbar">
        <Link to="/transparency-budget/apply" className="nav-link">Apply for Budget</Link>
        <Link to="/transparency-budget/faculty-dashboard" className="nav-link">Faculty Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>
    </div>
  );
};

export default TransparencyBudget;
