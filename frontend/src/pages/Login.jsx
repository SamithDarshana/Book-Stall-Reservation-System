import React from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would normally validate credentials
    // For now, we just redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="full-screen-center bg-gradient-purple">
      <div className="card-blur">
        <h2 className="heading-xl" style={{ color: "#7c3aed" }}>Book Stall Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" className="focus-purple" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" className="focus-purple" />
          </div>

     

          <button type="submit" className="btn-full btn-purple">Login</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#333" }}>
          Don't have an account?{" "}
          <a href="/signup" className="link">Signup</a>
        </p>
      </div>
    </div>
  );
}
