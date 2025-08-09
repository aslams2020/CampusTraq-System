import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/students")
  //     .then((res) => setStudents(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    console.log("Fetching students...");  // Debug log
    axios.get("http://localhost:5000/api/students")
      .then((res) => {
        console.log("Data received:", res.data);  // Debug log
        setStudents(res.data);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h2>Automated Health and leave Notifications</h2>
      <Link to="/report-sick"><button>Report Sick</button></Link>
      <Link to="/report-leave"><button>Report Leave</button></Link>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
