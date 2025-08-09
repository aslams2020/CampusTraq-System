import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ReportSick from "./ReportSick";
import ReportLeave from "./ReportLeave";
import StudentList from "./StudentList";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/report-sick" element={<ReportSick />} />
      <Route path="/report-leave" element={<ReportLeave />} />
    </Routes>
  </Router>
);
