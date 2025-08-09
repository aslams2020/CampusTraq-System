import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminPanel.css";

function AdminPanel() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [manifesto, setManifesto] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/candidates")
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  }, []);

  const addCandidate = () => {
    axios.post("http://localhost:5000/candidates", { name, manifesto }, {
      headers: { Authorization: token }
    }).then(() => {
      alert("Candidate added successfully");
      window.location.reload();
    }).catch(err => alert("Failed to add candidate"));
  };

  const removeCandidate = (id) => {
    axios.delete(`http://localhost:5000/candidates/${id}`, {
      headers: { Authorization: token }
    }).then(() => {
      alert("Candidate removed successfully");
      window.location.reload();
    }).catch(err => alert("Failed to remove candidate"));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage Candidates</h2>
      <input type="text" placeholder="Candidate Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Manifesto" value={manifesto} onChange={e => setManifesto(e.target.value)} />
      <button onClick={addCandidate}>Add Candidate</button>

      <h3>Candidate List</h3>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}>
            {candidate.name} - {candidate.manifesto}
            <button onClick={() => removeCandidate(candidate._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
