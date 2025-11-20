import React from "react";
import '../index.css';

export default function Signup() {
  return (
    <div className="full-screen-center bg-gradient-green">
      <div className="card-blur">
        <h2 className="heading-xl" style={{ color: "#22c55e" }}>Book Stall Signup</h2>

        <form>
          <div>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" className="focus-green" />
          </div>

          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" className="focus-green" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" className="focus-green" />
          </div>

          <button type="submit" className="btn-full btn-green">Signup</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#333" }}>
          Already have an account?{" "}
          <a href="/login" className="link">Login</a>
        </p>
      </div>
    </div>
  );
}
