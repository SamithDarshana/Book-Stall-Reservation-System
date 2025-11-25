import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalReservations: 28,
    availableStalls: 12,
    totalUsers: 54,
    pendingApprovals: 5,
    stallsByType: { small: 10, medium: 8, large: 4 },
    vendorCount: 45,
    organizerCount: 9,
    recentReservations: [
        { id: 1, vendor: "Pearson Publishers", stall: "A12", status: "Pending" },
        { id: 2, vendor: "Sarasavi", stall: "B05", status: "Confirmed" },
        { id: 3, vendor: "M.D Gunasena", stall: "C02", status: "Pending" }
    ]
    });


  // Later you will replace with GET /api/dashboard

  useEffect(() => {
    fetch("/api/dashboard")
        .then(res => res.json())
        .then(data => setDashboardData(data));
    }, []);


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

        {/* KPI CARDS */}
        <div className="cards-grid">
          <div className="dash-card">
            <h3>Total Reservations</h3>
            <p className="card-number">{dashboardData.totalReservations}</p>
          </div>

          <div className="dash-card">
            <h3>Available Stalls</h3>
            <p className="card-number">{dashboardData.availableStalls}</p>
          </div>

          <div className="dash-card">
            <h3>Total Users</h3>
            <p className="card-number">{dashboardData.totalUsers}</p>
          </div>

          <div className="dash-card">
            <h3>Pending Approvals</h3>
            <p className="card-number">{dashboardData.pendingApprovals}</p>
          </div>
        </div>

        {/* STALL SUMMARY */}
        <div className="section-box">
          <h2>Stall Summary</h2>
          <ul>
            <li>Small Stalls: {dashboardData.stallsByType.small}</li>
            <li>Medium Stalls: {dashboardData.stallsByType.medium}</li>
            <li>Large Stalls: {dashboardData.stallsByType.large}</li>
          </ul>
        </div>

        {/* USER SUMMARY */}
        <div className="section-box">
          <h2>User Statistics</h2>
          <p>Vendors Registered: {dashboardData.vendorCount}</p>
          <p>Organizers: {dashboardData.organizerCount}</p>
        </div>

        {/* MINI STALL MAP */}
        <div className="section-box">
          <h2>Stall Map Preview</h2>
          <div className="stall-map-preview">
            <p>[Mini Map UI placeholder — later replace with SVG/Canvas map]</p>
          </div>
          <Link className="btn-view-map" to="/stalls">View Full Stall Map</Link>
        </div>

        {/* LATEST RESERVATIONS */}
        <div className="section-box">
          <h2>Recent Reservations</h2>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Stall</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentReservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.vendor}</td>
                  <td>{r.stall}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ACTION BUTTONS */}
        <div className="quick-actions">
          <Link to="/reservations" className="action-card">Manage Reservations</Link>
          <Link to="/stalls" className="action-card">Manage Stalls</Link>
          <Link to="/users" className="action-card">Manage Users</Link>
          <Link to="/reports" className="action-card">Generate Reports</Link>
        </div>
      </main>
    </div>
  );
}
