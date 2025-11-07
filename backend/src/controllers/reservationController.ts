import type { Request, Response } from "express";
import Reservation from "../models/Reservation.js";

// Create a new reservation
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { reservationId, userId, roomId, genre, status, startDate, endDate } =
      req.body;

    if (
      !reservationId ||
      !userId ||
      !roomId ||
      !genre ||
      !status ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReservation = new Reservation({
      reservationId,
      userId,
      roomId,
      genre,
      status,
      startDate,
      endDate,
    });
    const reservation = await newReservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Get all reservations
export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reservations", error });
  }
};

// Get reservations by reservationId
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({ reservationId });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation", error });
  }
};

// Update reservation status
export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;
    const reservation = await Reservation.findOneAndUpdate(
      { reservationId },
      { status },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res
      .status(200)
      .json({ message: "Reservation updated successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};
// Delete a reservation
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOneAndDelete({ reservationId });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
};
