import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import Dashboard from "./Dashboard";
import LoginRegister from "./LoginRegister";
import VotingPage from "./pages/VotingPage";
import AdminPanel from "./pages/AdminPanel";
import ComplaintSystem from "./modules/ComplaintSystem/App";
import TransparencyBudget from "./modules/TransparencyBudget/App"; 
import CheatingRecordSystem from "./modules/CheatingRecordSystem/App";
import ApplyForApproval from "./modules/TransparencyBudget/ApplyForApproval";
import HealthSystem from "./modules/HealthSystem/App";
import StudentList from "./modules/HealthSystem/StudentList";
import ReportSick from "./modules/HealthSystem/ReportSick"; 
import ReportLeave from "./modules/HealthSystem/ReportLeave"; // Adjust the path if needed


import "./App.css";
import "./LoginRegister.css";

function LandingPage() {
  return (
    <motion.div className="hero">
      <h2>Empowering Students, Ensuring Transparency</h2>
      <p>A secure, paperless, and efficient system for student governance and college transparency.</p>
      <button className="login-btn" onClick={() => (window.location.href = "/login")}>
        Login / Register
      </button>
    </motion.div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Track role (admin/student)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const email = currentUser.email;

        // Set role based on email domain
        if (email.endsWith("@admin.sggs.ac.in")) {
          setRole("admin");
        } else if (email.endsWith("@sggs.ac.in")) {
          setRole("student");
        } else {
          setRole("unauthorized");
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (role === "unauthorized") {
    return <h2>Unauthorized Access</h2>;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">CampusTraq - Automated Paperless Transparent College System</h1>
        <div className="nav-links">
          <button onClick={() => (window.location.href = "/")}>Home</button>
          <button>About Us</button>
          {role === "admin" && <button onClick={() => (window.location.href = "/admin")}>Admin Panel</button>}
          {user && (
            <button
              className="logout"
              onClick={() => {
                signOut(auth).then(() => {
                  setUser(null);
                  setRole(null);
                  window.location.href = "/";
                });
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <LoginRegister /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/voting" element={user ? <VotingPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/complaint-system/*" element={user ? <ComplaintSystem /> : <Navigate to="/login" />} />
        <Route path="/transparency-budget/*" element={user ? <TransparencyBudget /> : <Navigate to="/login" />} />
        <Route path="/cheating-records/*" element={user ? <CheatingRecordSystem /> : <Navigate to="/login" />} /> 
        <Route path="/apply-for-approval" element={<ApplyForApproval />} />
        <Route path="/health-system/*" element={<HealthSystem />} />;
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/report-sick" element={user ? <ReportSick /> : <Navigate to="/login" />} />
        <Route path="/report-leave" element={user ? <ReportLeave /> : <Navigate to="/login" />} />

      </Routes>

      <footer className="footer">
        <div>© 2025 College Transparency System | Built for a better campus</div>
      </footer>
    </div>
  );
}

export default App;
