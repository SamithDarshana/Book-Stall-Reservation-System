import React from "react";
import "../../Style/Reservation.css";

export default function UserCard({ user, onDelete, onView }) {
  return (
    <tr className="reservation-row">
      <td>{user.userId}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{new Date(user.createdAt).toLocaleString()}</td>
      <td>
        <button className="btn-view" onClick={() => onView(user)}>View</button>
        <button className="btn-delete" onClick={() => onDelete(user._id)}>Delete</button>
      </td>
    </tr>
  );
}
