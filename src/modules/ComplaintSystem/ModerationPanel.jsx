import { useState, useEffect } from "react";

const ModerationPanel = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/moderation")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  }, []);

  const approveComplaint = async (id) => {
    await fetch(`http://localhost:5000/api/complaints/approve/${id}`, { method: "PATCH" });
    setComplaints(complaints.filter((c) => c._id !== id));
  };

  const rejectComplaint = async (id) => {
    await fetch(`http://localhost:5000/api/complaints/reject/${id}`, { method: "DELETE" });
    setComplaints(complaints.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h2>Moderation Panel</h2>
      {complaints.map((c) => (
        <div key={c._id} style={{ border: "1px solid red", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Complaint:</strong> {c.complaint}</p>
          <button onClick={() => approveComplaint(c._id)}>Approve</button>
          <button onClick={() => rejectComplaint(c._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ModerationPanel;
