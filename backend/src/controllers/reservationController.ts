import type { Request, Response } from "express";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

import QRCode from "qrcode";
import { sendEmail } from "../utils/email.js";

// Create a new reservation
export const createReservation = async (req: Request, res: Response) => {
  //console.log("Creating reservation with data:", req.body);
  try {
    const { reservationId, roomId, genre, status, size, startDate, endDate } =
      req.body;

    if (
      !reservationId ||
      !roomId ||
      !genre ||
      !status ||
      !size ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReservation = new Reservation({
      reservationId,
      userId: "",
      roomId,
      genre,
      status,
      size,
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

// Get resservations by size
export const getReservationsBySize = async (req: Request, res: Response) => {
  try {
    const { size } = req.params;
    const reservations = await Reservation.find({ size });
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reservations by size", error });
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
export const confirmReservation = async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const { userId } = req.body; // ✅ extract only userId (string)

    // --- Find reservation ---
    const reservation = await Reservation.findOne({ reservationId });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // --- Prevent double booking ---
    if (reservation.userId && reservation.userId !== "") {
      return res.status(400).json({ message: "Reservation already taken" });
    }

    // --- Check if user exceeded 3 active reservations ---
    const activeReservations = await Reservation.countDocuments({
      userId,
      status: "confirmed",
    });

    if (activeReservations >= 3) {
      return res.status(400).json({
        message: "User has reached the maximum number of active reservations",
      });
    }

    // --- Confirm reservation ---
    reservation.userId = userId;
    reservation.status = "confirmed";
    await reservation.save();

    // --- Fetch user details ---
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // --- Generate QR Code ---
    const qrData = JSON.stringify({
      reservationId: reservation.reservationId,
      username: user.name,
      email: user.email,
      roomId: reservation.roomId,
      //userId: user._id,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrData);

    // --- Email HTML content ---
    const emailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Reservation Confirmed ✅</h2>
        <p>Hi <b>${user.name}</b>,</p>
        <p>Your reservation <b>${
          reservation.reservationId
        }</b> has been confirmed successfully.</p>
        <p><b>Room:</b> ${reservation.roomId}</p>
        <p><b>Time:</b> ${new Date(
          reservation.startDate
        ).toLocaleString()} - ${new Date(
      reservation.endDate
    ).toLocaleString()}</p>
        <p>Please present this QR code at the exhibition entrance:</p>
        <img src="${qrCodeDataURL}" alt="QR Code" style="width:200px;height:200px;"/>
        <p>You can also download the QR code by right-clicking the image.</p>
        <br/>
        <p>Thank you,<br/>Book Stall Reservation System</p>
      </div>
    `;

    // --- Send confirmation email ---
    await sendEmail(
      user.email,
      "Your Reservation Confirmation - Book Stall",
      emailHtml
    );

    // --- Respond success ---
    res.status(200).json({
      message: "Reservation confirmed and email sent",
      reservation,
    });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    res.status(500).json({ message: "Error confirming reservation", error });
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
