import React from "react";
import '../index.css';

export default function Dashboard() {
  return (
    <div className="full-screen-center bg-gradient-green">
      <div className="card-blur">
        <h2 className="heading-xl" style={{ color: "#22c55e" }}>Dashboard</h2>
        <p style={{ textAlign: "center", marginTop: "16px", color: "#333" }}>
          Welcome! You are now logged in.
        </p>
      </div>
    </div>
  );
}
