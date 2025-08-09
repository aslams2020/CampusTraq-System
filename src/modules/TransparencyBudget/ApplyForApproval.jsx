import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FacultyDashboard.css"; // Keep styles consistent

const ApplyForApproval = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNo: "",
    designation: "",
    date: "",
    budgetFile: null,
    explanation: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, budgetFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/applications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application Submitted Successfully!");
      navigate("/faculty-dashboard"); // Redirect back
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }

    setLoading(false);
  };

  return (
    <form className="styled-app-form" onSubmit={handleSubmit}>
      <h2 className="styled-app-heading">Application Form</h2>
      <input className="styled-app-input" type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input className="styled-app-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input className="styled-app-input" type="text" name="regNo" placeholder="Reg No" onChange={handleChange} required />
      <input className="styled-app-input" type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
      <input className="styled-app-input" type="date" name="date" onChange={handleChange} required />
      <input className="styled-app-file" type="file" onChange={handleFileChange} required />
      <textarea className="styled-app-textarea" name="explanation" placeholder="Explain your request" onChange={handleChange} required />

      <button className={`styled-app-button ${loading ? "loading" : ""}`} type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ApplyForApproval;
