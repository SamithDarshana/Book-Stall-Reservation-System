import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Book Stall Reservation System</h2>

        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/dashboard">Dashboard</Link>
          <Link className="sidebar-link" to="/reservations">Reservations</Link>
          <Link className="sidebar-link" to="/users">Users</Link>
          <Link className="sidebar-link" to="/stalls">Stalls</Link>
          <Link className="sidebar-link" to="/reports">Reports</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main-content">
        <h1 className="dashboard-heading">Dashboard Overview</h1>

        <div className="cards-grid">
          <div className="dash-card">
            <h3>Total Reservations</h3>
            <p className="card-number">28</p>
          </div>

          <div className="dash-card">
            <h3>Available Stalls</h3>
            <p className="card-number">12</p>
          </div>

          <div className="dash-card">
            <h3>Total Users</h3>
            <p className="card-number">54</p>
          </div>

          <div className="dash-card">
            <h3>Pending Approvals</h3>
            <p className="card-number">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
