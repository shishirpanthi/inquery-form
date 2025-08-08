import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyAdmin } from "../utils/auth.js";
dotenv.config();

const router = express.Router();

// Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Test protected route
router.get("/me", verifyAdmin, (req, res) => {
  res.json({ username: req.user.username });
});

export default router;
