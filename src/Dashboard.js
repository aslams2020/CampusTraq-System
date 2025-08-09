import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { FaCheckCircle, FaUserShield, FaVoteYea, FaMoneyBillWave, FaHospitalUser, FaCalendarCheck, FaGavel, FaUniversity } from "react-icons/fa";

const features = [
  { name: "Student Elections", description: "Secure online voting with real-time results.", icon: <FaVoteYea className="icon yellow" />, path: "/voting" }, 
  { name: "Anonymous Complaints", description: "Submit complaints with ensured anonymity.", icon: <FaUserShield className="icon blue" />, path: "/complaint-system" },
  { name: "Transparency Budget", description: "Track college expenses and sponsorships.", icon: <FaMoneyBillWave className="icon green" />, path: "/transparency-budget" },
  { name: "Approval System", description: "Submit and track approvals for events and funds.", icon: <FaCheckCircle className="icon red" /> },
  { name: "Health & Leave Notifications", 
    description: "Automated emails for student safety and health tracking.", icon: <FaHospitalUser className="icon indigo" />, path: "/student-list" 
  },
  { name: "Facility Booking", description: "Book campus facilities with ease.", icon: <FaCalendarCheck className="icon orange" /> },
 { name: "Academic Integrity | Cheating Records", description: "Transparent record of cheating incidents.", icon: <FaGavel className="icon gray" />, path: "/cheating-records" }, 
  { name: "Restricted College Access", description: "Access limited to verified college members only.", icon: <FaUniversity className="icon teal" /> },
];

function Dashboard() {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <motion.div className="dashboard">
      <h2>Dashboard</h2>
      <div className="grid">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="feature-card" 
            onClick={() => feature.path && navigate(feature.path)} // ✅ Navigate if path exists
            style={{ cursor: feature.path ? "pointer" : "default" }} // Change cursor if clickable
          >
            <div className="feature-content">
              {feature.icon}
              <div>
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Dashboard;
