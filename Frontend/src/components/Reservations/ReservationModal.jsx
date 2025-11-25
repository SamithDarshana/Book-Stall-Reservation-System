import React, {useState} from "react";
import "../../Style/Reservation.css";

export default function ReservationModal({ reservation, onClose, createMode, onRefresh }) {
  const [form, setForm] = useState({
    reservationId: "",
    userId: "",
    stallId: "",
    genre: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const handleCreate = async () => {
    try {
      await fetch("/api/reservation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Error creating reservation:", err);
    }
  };

  if (createMode) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Reservation</h2>

          <label>Reservation ID</label>
          <input
          type="text"
            placeholder="Reservation ID"
            value={form.reservationId}
            onChange={(e) => setForm({ ...form, reservationId: e.target.value })}
          />

          <label>User ID</label>
          <input
          type="text"
            placeholder="User ID"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          />

          <label>Stall ID</label>
          <input
          type="text"
            placeholder="Stall ID"
            value={form.stallId}
            onChange={(e) => setForm({ ...form, stallId: e.target.value })}
          />

          <label>Genre</label>
          <input
          type="text"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />

          <label>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />

          <label>End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />

          <button className="btn-submit" onClick={handleCreate}>Create</button>
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!reservation) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Reservation Details</h2>

        <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
        <p><strong>User ID:</strong> {reservation.userId}</p>
        <p><strong>Stall ID:</strong> {reservation.stallId}</p>
        <p><strong>Genre:</strong> {reservation.genre}</p>
        <p><strong>Status:</strong> {reservation.status}</p>
        <p><strong>Start:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
        <p><strong>End:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>

        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
