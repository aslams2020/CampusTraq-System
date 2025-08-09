// import React, { useState, useEffect } from "react";
// import "../VotingPage.css";

// function VotingPage() {
//   const [role, setRole] = useState(null);
//   const [candidates, setCandidates] = useState([]);
//   const [name, setName] = useState("");
//   const [manifesto, setManifesto] = useState("");
//   const [votedCandidate, setVotedCandidate] = useState(null); // Store the candidate index the student voted for

//   useEffect(() => {
//     const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
//     const storedVote = JSON.parse(localStorage.getItem("votedCandidate")); // Retrieve voted candidate
//     setCandidates(storedCandidates);
//     setVotedCandidate(storedVote);
//   }, []);

//   const updateLocalStorage = (newCandidates) => {
//     localStorage.setItem("candidates", JSON.stringify(newCandidates));
//     setCandidates(newCandidates);
//   };

//   const addCandidate = () => {
//     if (name && manifesto) {
//       const newCandidates = [...candidates, { name, manifesto, votes: 0 }];
//       updateLocalStorage(newCandidates);
//       setName("");
//       setManifesto("");
//     }
//   };

//   const removeCandidate = (index) => {
//     const newCandidates = candidates.filter((_, i) => i !== index);
//     updateLocalStorage(newCandidates);
//   };

//   const voteCandidate = (index) => {
//     if (votedCandidate === null) {
//       const updatedCandidates = [...candidates];
//       updatedCandidates[index].votes += 1;
//       updateLocalStorage(updatedCandidates);
//       setVotedCandidate(index);
//       localStorage.setItem("votedCandidate", JSON.stringify(index)); // Store the voted candidate
//     }
//   };

//   return (
//     <div className="voting-container">
//       {!role ? (
//         <div className="role-selection">
//           <h2>Select Your Role</h2>
//           <button onClick={() => setRole("admin")}>Admin</button>
//           <button onClick={() => setRole("student")}>Student</button>
//         </div>
//       ) : role === "admin" ? (
//         <div className="admin-panel">
//           <h2>Admin Panel - Manage Candidates</h2>
//           <input type="text" placeholder="Candidate Name" value={name} onChange={(e) => setName(e.target.value)} />
//           <input type="text" placeholder="Manifesto" value={manifesto} onChange={(e) => setManifesto(e.target.value)} />
//           <button onClick={addCandidate}>Add Candidate</button>
//           <h3>Candidate List</h3>
//           <ul>
//             {candidates.map((candidate, index) => (
//               <li key={index}>
//                 {candidate.name} - {candidate.manifesto} - Votes: {candidate.votes}
//                 <button onClick={() => removeCandidate(index)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="student-panel">
//           <h2>Vote for Your Candidate</h2>
//           <ul>
//             {candidates.map((candidate, index) => (
//               <li key={index}>
//                 {candidate.name} - {candidate.manifesto}
//                 <button onClick={() => voteCandidate(index)} disabled={votedCandidate !== null}>
//                   {votedCandidate === index ? "Vote Casted" : "Vote"}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           {votedCandidate !== null && <p>You have already voted.</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VotingPage;

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Authentication
import "../VotingPage.css";

function VotingPage() {
  const [userEmail, setUserEmail] = useState(null);
  const [role, setRole] = useState(null); // Auto-detect role
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [votedCandidate, setVotedCandidate] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        // Determine role based on email
        if (user.email.endsWith("@admin.sggs.ac.in")) {
          setRole("admin");
        } else if (user.email.endsWith("@sggs.ac.in")) {
          setRole("student");
        } else {
          setRole("unauthorized"); // No access if email does not match college domain
        }
      } else {
        setRole(null);
        setUserEmail(null);
      }
    });

    // Load existing candidates and voting data
    const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const storedVote = JSON.parse(localStorage.getItem("votedCandidate"));
    setCandidates(storedCandidates);
    setVotedCandidate(storedVote);
  }, []);

  const updateLocalStorage = (newCandidates) => {
    localStorage.setItem("candidates", JSON.stringify(newCandidates));
    setCandidates(newCandidates);
  };

  const addCandidate = () => {
    // if (name && manifesto && candidates.length <= 2) {
    //   alert("At least 2 candidates are required.");
    //   return;
    // }
    const newCandidates = [...candidates, { name, manifesto, votes: 0 }];
    updateLocalStorage(newCandidates);
    setName("");
    setManifesto("");
  };

  const removeCandidate = (index) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    updateLocalStorage(newCandidates);
  };

  const voteCandidate = (index) => {
    if (votedCandidate === null) {
      const updatedCandidates = [...candidates];
      updatedCandidates[index].votes += 1;
      updateLocalStorage(updatedCandidates);
      setVotedCandidate(index);
      localStorage.setItem("votedCandidate", JSON.stringify(index));
    }
  };

  return (
    <div className="voting-container">
      {role === null ? (
        <h2>Checking authentication...</h2>
      ) : role === "unauthorized" ? (
        <h2>Unauthorized Access</h2>
      ) : role === "admin" ? (
        <div className="admin-panel">
          <h2>Admin Panel - Manage Candidates</h2>
          <input type="text" placeholder="Candidate Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Manifesto" value={manifesto} onChange={(e) => setManifesto(e.target.value)} />
          <button onClick={addCandidate}>Add Candidate</button>
          <h3>Candidate List</h3>
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                {candidate.name} - {candidate.manifesto} - Votes: {candidate.votes}
                <button onClick={() => removeCandidate(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="student-panel">
          <h2>Vote for Your Candidate</h2>
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                {candidate.name} - {candidate.manifesto}
                <button onClick={() => voteCandidate(index)} disabled={votedCandidate !== null}>
                  {votedCandidate === index ? "Vote Casted" : "Vote"}
                </button>
              </li>
            ))}
          </ul>
          {votedCandidate !== null && <p>You have already voted.</p>}
        </div>
      )}
    </div>
  );
}

export default VotingPage;
