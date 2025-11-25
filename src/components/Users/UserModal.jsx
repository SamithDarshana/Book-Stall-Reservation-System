import React, { useState } from "react";
import "../../Style/Reservation.css";

export default function UserModal({ user, onClose, createMode, onRefresh }) {
  const [form, setForm] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
  });

  const handleCreate = async () => {
    try {
      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  if (createMode) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create User</h2>

          <label>User ID</label>
          <input
            type="text"
            placeholder="User ID"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          />

          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn-submit" onClick={handleCreate}>Create</button>
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User Details</h2>

        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>

        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
