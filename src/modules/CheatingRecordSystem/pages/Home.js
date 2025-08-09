import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-3">🎓 Academic Integrity System</h1>
            <p className="mb-4">This system records and displays cheating incidents.</p>
            <div>
                <Link to="/add" className="btn btn-danger btn-lg me-3">🚨 Report Cheating</Link>
                <Link to="/records" className="btn btn-primary btn-lg">📜 View Records</Link>
            </div>
        </div>
    );
}

export default Home;
