import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, status) => {
    const facultyRemark = prompt(`Enter remark for ${status}:`);
    if (!facultyRemark) return;

    try {
      await axios.put(`http://localhost:5000/applications/${id}`, { status, facultyRemark });
      alert(`Application marked as ${status}`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard</h2>
      <button className="styled-app-button" onClick={() => navigate("/apply-for-approval")}>
        Apply for Approval
      </button>

      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : applications.length === 0 ? (
        <p>No applications available</p>
      ) : (
        <div className="application-grid">
          {applications.map((app) => (
            <div key={app._id} className="application-card">
              <p><strong>Name:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Reg No:</strong> {app.regNo}</p>
              <p><strong>Designation:</strong> {app.designation}</p>
              <p><strong>Date:</strong> {app.date}</p>
              <p><strong>Explanation:</strong> {app.explanation}</p>
              {app.budgetFile && (
                <p>
                  <strong>Budget Document:</strong> 
                  <a href={`http://localhost:5000/uploads/${app.budgetFile}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
              )}
              <p><strong>Status:</strong> <b>{app.status}</b></p>
              <div className="button-group">
                <button className="approve" onClick={() => handleReview(app._id, "Approved")}>Approve</button>
                <button className="reject" onClick={() => handleReview(app._id, "Rejected")}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
