import { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// example protected route to check token
router.get("/me", protect, (req: Request & { user?: any }, res: Response) => {
  // req.user is set by protect middleware
  return res.json({ user: req.user });
});

export default router;