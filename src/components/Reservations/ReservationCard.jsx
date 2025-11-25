import React from "react";
import "../../Style/Reservation.css";

export default function ReservationCard({ reservation, onApprove, onReject, onDelete, onView }) {
  return (
    <tr className="reservation-row">
      <td>{reservation.reservationId}</td>
      <td>{reservation.userId}</td>
      <td>{reservation.stallId}</td>
      <td>{reservation.status}</td>

      <td>
        <button className="btn-approve" onClick={() => onApprove(reservation.reservationId)}>Approve</button>
        <button className="btn-reject" onClick={() => onReject(reservation.reservationId)}>Reject</button>
        <button className="btn-view" onClick={() => onView(reservation)}>Details</button>
        <button className="btn-delete" onClick={() => onDelete(reservation.reservationId)}>Delete</button>
      </td>
    </tr>
  );
}
