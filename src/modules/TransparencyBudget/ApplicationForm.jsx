import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import "./ApplicationForm.css";

const ApplicationForm = () => {  
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
      const response = await axios.post("http://localhost:5000/applications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Form submitted successfully:", response.data);
      alert("Application Submitted");

      navigate("/faculty-dashboard");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="transparency-budget-container"> 
      <form onSubmit={handleSubmit} className="transparency-budget-form">
        <h2>Transparency Budget Application Form</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="regNo" placeholder="Reg No" onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} required />
        <textarea name="explanation" placeholder="Explain your request" onChange={handleChange} required />
        
        <button type="submit" className={loading ? "transparency-budget-btn loading" : "transparency-budget-btn"} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <p>
          <Link className="transparency-budget-link" to="/faculty-dashboard">
            Go to Faculty Dashboard
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ApplicationForm;