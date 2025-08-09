import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SignInwithGoogle from "./signInWithGoogle";
import "./LoginRegister.css"; 

function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // ✅ Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "Users", user.uid));

      // if (userDoc.exists()) {
      //   toast.success("User logged in successfully!", { position: "top-center" });
      //   navigate("/dashboard");
      // } else {
      //   toast.error("User data not found!", { position: "bottom-center" });
      // }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  // ✅ Register Function (Fixed)
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Fix: Allow only @sggs.ac.in and @admin.sggs.ac.in emails
    if (!(email.endsWith("@sggs.ac.in") || email.endsWith("@admin.sggs.ac.in"))) {
      toast.error("Only college emails (@sggs.ac.in or @admin.sggs.ac.in) are allowed!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Determine role dynamically
      const role = email.endsWith("@admin.sggs.ac.in") ? "admin" : "student";

      // Store user details in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
        role: role,  // ✅ Store role in Firestore
      });

      toast.success("User registered successfully!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <ToastContainer position="top-center" autoClose={3000} />
        
        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First Name</label>
              <input type="text" placeholder="First name" onChange={(e) => setFname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input type="text" placeholder="Last name" onChange={(e) => setLname(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Email Address</label>
              <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
            <p>Already registered? <a href="#" onClick={() => setIsRegistering(false)}>Login Here</a></p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <div className="mb-3">
              <label>Email Address</label>
              <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary">Login</button>
            <p>New user? <a href="#" onClick={() => setIsRegistering(true)}>Register Here</a></p>
            <SignInwithGoogle />
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
