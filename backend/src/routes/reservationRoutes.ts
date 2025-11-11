import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = Router();

router.post("/create", createReservation);
router.get("/getAll", getReservations);
router.get("/get/:reservationId", getReservationById);
router.put("/update/:reservationId", updateReservationStatus);
router.delete("/delete/:reservationId", deleteReservation);

export default router;
