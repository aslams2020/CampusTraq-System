import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCheatingRecord() {
    const [formData, setFormData] = useState({
        name: "",
        reason: "",
        proof: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.reason || !formData.proof) {
            alert("⚠️ All fields are required!");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/cheating", formData);
            alert("✅ Record successfully added!");
            navigate("/records");
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Failed to add record!");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">🚨 Report a Cheating Incident</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label fw-bold">Student Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Reason</label>
                    <textarea name="reason" className="form-control" value={formData.reason} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Proof (URL)</label>
                    <input type="url" name="proof" className="form-control" value={formData.proof} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Record"}
                </button>
            </form>
        </div>
    );
}

export default AddCheatingRecord;
