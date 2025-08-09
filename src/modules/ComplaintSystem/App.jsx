// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ComplaintForm from "./ComplaintForm";
// import ComplaintList from "./ComplaintList";

// const ComplaintSystem = () => {
//   return (
//     <div>
//       <h2>Anonymous Complaint System</h2>
//       <Routes>
//         <Route path="/submit" element={<ComplaintForm />} />
//         <Route path="/complaints" element={<ComplaintList />} />
//       </Routes>
//     </div>
//   );
// };

// export default ComplaintSystem;
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ComplaintForm from "./ComplaintForm";
import ComplaintList from "./ComplaintList";
import "./App.css";

const ComplaintSystem = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Anonymous Complaint System</h1>
        <nav className="navbar">
          <Link to="/complaint-system/submit" className="nav-link">Submit Complaint</Link>
          <Link to="/complaint-system/complaints" className="nav-link">View Complaints</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/submit" element={<ComplaintForm />} />
        <Route path="/complaints" element={<ComplaintList />} />
      </Routes>
    </div>
  );
};

export default ComplaintSystem;
