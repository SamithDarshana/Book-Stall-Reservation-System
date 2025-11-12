import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", protect, createReservation);
router.get("/getAll", protect, getReservations);
router.get("/get/:reservationId", protect, getReservationById);
router.put("/update/:reservationId", protect, updateReservationStatus);
router.delete("/delete/:reservationId", protect, deleteReservation);

export default router;
