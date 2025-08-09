import React, { useState, useEffect } from "react";
import "./ComplaintList.css"; // Ensure the CSS file is imported

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [isBoardMember, setIsBoardMember] = useState(false);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  const handleDelete = (index) => {
    if (!isBoardMember) {
      alert("Only board members can delete complaints.");
      return;
    }
    const updatedComplaints = complaints.filter((_, i) => i !== index);
    setComplaints(updatedComplaints);
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
  };

  return (
    <div className="complaint-list-container">
      <h2 className="complaint-title">All Complaints</h2>

      {/* Board Member Toggle */}
      <div className="board-member-checkbox">
        <input
          type="checkbox"
          checked={isBoardMember}
          onChange={() => setIsBoardMember(!isBoardMember)}
        />
        <span>I am a Board Member</span>
      </div>

      {/* Complaints Grid */}
      <div className="complaint-list">
        {complaints.length === 0 ? (
          <p className="no-complaints">No complaints submitted yet.</p>
        ) : (
          complaints.map((complaint, index) => (
            <div key={index} className="complaint-card">
              <p><strong>Complaint:</strong> {complaint.complaint}</p>
              <p><strong>Submitted By:</strong> {complaint.anonymous ? "Anonymous" : complaint.name}</p>
              <p><strong>Reg No:</strong> {complaint.anonymous ? "Hidden" : complaint.regNo}</p>

              {isBoardMember && (
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  ❌ Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
