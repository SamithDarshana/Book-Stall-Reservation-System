import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", protect, authorizeRoles("employee"), createUser);
router.get("/getAll", protect, authorizeRoles("employee"), getAllUsers);
export default router;
