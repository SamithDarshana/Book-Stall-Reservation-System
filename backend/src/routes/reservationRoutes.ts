import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  getReservationsBySize,
  confirmReservation,
  deleteReservation,
} from "../controllers/reservationController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", protect, authorizeRoles("employee"), createReservation);
router.get("/getAll", protect, getReservations);
router.get("/get/:reservationId", protect, getReservationById);
router.get("/size/:size", protect, getReservationsBySize);
router.post(
  "/confirm/:reservationId",
  protect,
  authorizeRoles("user"),
  confirmReservation
);
router.delete(
  "/delete/:reservationId",
  protect,
  authorizeRoles("employee"),
  deleteReservation
);
export default router;
