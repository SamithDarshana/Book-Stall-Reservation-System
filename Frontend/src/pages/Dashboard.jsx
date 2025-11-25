import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalReservations: 0,
    totalUsers: 0,
    pendingApprovals: 0,
    recentReservations: [],
  });

  useEffect(() => {
    // Define the async function inside the effect
    const loadDashboardData = async () => {
      try {
        // Fetch all users
        const usersRes = await fetch("http://localhost:5000/api/users");
        const usersData = await usersRes.json();

        // Fetch all reservations
        const resRes = await fetch("http://localhost:5000/api/reservation/getAll");
        const reservationsData = await resRes.json();

        // Calculate pending approvals
        const pending = reservationsData.filter(r => r.status === "pending");

        // Take 5 most recent reservations
        const recent = reservationsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setDashboardData({
          totalReservations: reservationsData.length,
          totalUsers: usersData.length,
          pendingApprovals: pending.length,
          recentReservations: recent,
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    loadDashboardData(); // Call async function
  }, []); // empty dependency array, runs once

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Book Stall Reservation System</h2>
        <nav className="sidebar-nav">
          <Link className="sidebar-link active" to="/dashboard">Dashboard</Link>
          <Link className="sidebar-link" to="/reservations">Reservations</Link>
          <Link className="sidebar-link" to="/users">Users</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main-content">
        <h1 className="dashboard-heading">Dashboard Overview</h1>

        <div className="cards-grid">
          <div className="dash-card">
            <h3>Total Reservations</h3>
            <p className="card-number">{dashboardData.totalReservations}</p>
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

        <div className="section-box">
          <h2>Recent Reservations</h2>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Reservation ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentReservations.map(r => (
                <tr key={r.reservationId}>
                  <td>{r.userId}</td>
                  <td>{r.reservationId}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="quick-actions">
          <Link to="/reservations" className="action-card">Manage Reservations</Link>
          <Link to="/users" className="action-card">Manage Users</Link>
        </div>
      </main>
    </div>
  );
}
