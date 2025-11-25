import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationModal from "../components/Reservations/ReservationModal";
import ReservationCard from "../components/Reservations/ReservationCard";
import "../Style/Reservation.css";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load all reservations
  const loadReservations = () => {
    fetch("http://localhost:5000/api/reservation/getAll")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("Error loading reservations:", err));
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // Update reservation status
  const handleStatusUpdate = async (reservationId, status) => {
    try {
      await fetch(`http://localhost:5000/api/reservation/update/${reservationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      loadReservations();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleApprove = id => handleStatusUpdate(id, "confirmed");
  const handleReject = id => handleStatusUpdate(id, "cancelled");

  // Delete reservation
  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try {
      await fetch(`http://localhost:5000/api/reservation/delete/${id}`, { method: "DELETE" });
      loadReservations();
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Book Stall Reservation System</h2>

        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/dashboard">Dashboard</Link>
          <Link className="sidebar-link active" to="/reservations">Reservations</Link>
          <Link className="sidebar-link" to="/users">Users</Link>
          <Link className="sidebar-link" to="/stalls">Stalls</Link>
          <Link className="sidebar-link" to="/reports">Reports</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <h1>Reservations</h1>

        <button className="btn-create" onClick={() => setShowCreateForm(true)}>
          + Create Reservation
        </button>

        <div className="section-box">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>User</th>
                <th>Stall</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <ReservationCard
                  key={r.reservationId}
                  reservation={r}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onDelete={handleDelete}
                  onView={setSelectedReservation}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {selectedReservation && (
          <ReservationModal
            reservation={selectedReservation}
            onClose={() => setSelectedReservation(null)}
          />
        )}

        {/* Create Modal */}
        {showCreateForm && (
          <ReservationModal
            createMode
            onClose={() => setShowCreateForm(false)}
            onRefresh={loadReservations}
          />
        )}
      </div>
    </div>
  );
}
