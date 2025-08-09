import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCheatingRecord from "./pages/AddCheatingRecord";
import ViewRecords from "./pages/ViewRecords";


function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar">
                    <h2>📜 Academic Integrity System</h2>
                    <div className="nav-links">
                        <Link to="/">🏠 Home</Link>
                        <Link to="/add">📝 Report Cheating</Link>
                        <Link to="/records">📂 View Records</Link>
                    </div>
                </nav>

                <Router>  {/* ✅ Only one Router at the top level */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>

            </div>

            <style>
                {`
                .container {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .navbar {
                    background: #007bff;
                    color: white;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-links a {
                    color: white;
                    text-decoration: none;
                    margin: 0 10px;
                    font-weight: bold;
                }
                .nav-links a:hover {
                    text-decoration: underline;
                }
                `}
            </style>
        </Router>
    );
}

export default App;
