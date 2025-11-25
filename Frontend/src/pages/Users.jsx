import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserModal from "../components/Users/UserModal";
import UserCard from "../components/Users/UserCard";
import "../Style/Reservation.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load all users
  const loadUsers = () => {
    fetch("http://localhost:4000/api/users") // Your backend API
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error loading users:", err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "DELETE",
      });
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Book Stall Reservation System</h2>
        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/dashboard">Dashboard</Link>
          <Link className="sidebar-link" to="/reservations">Reservations</Link>
          <Link className="sidebar-link active" to="/users">Users</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <h1>Users</h1>

        <button className="btn-create" onClick={() => setShowCreateForm(true)}>
          + Create User
        </button>

        <div className="section-box">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleDelete}
                  onView={setSelectedUser}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* View / Create Modal */}
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {showCreateForm && (
          <UserModal
            createMode
            onClose={() => setShowCreateForm(false)}
            onRefresh={loadUsers}
          />
        )}
      </div>
    </div>
  );
}
