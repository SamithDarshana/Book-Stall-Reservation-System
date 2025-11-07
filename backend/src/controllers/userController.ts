import type { Request, Response } from "express";
import User from "../models/User.js";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, password } = req.body;
    if (!userId || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({ userId, name, email, password });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all users", error });
  }
};
