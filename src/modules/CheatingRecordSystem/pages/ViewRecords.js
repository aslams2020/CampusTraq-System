import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/cheating")
            .then((response) => {
                setRecords(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching records:", error);
                alert("❌ Failed to fetch records!");
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-3">📜 Cheating Records</h2>
            {loading ? (
                <p>Loading records...</p>
            ) : records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <table className="table table-bordered table-hover shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Reason</th>
                            <th>Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record.name}</td>
                                <td>{record.reason}</td>
                                <td><a href={record.proof} target="_blank" rel="noopener noreferrer">🔗 View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewRecords;
