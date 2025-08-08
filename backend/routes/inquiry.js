import express from "express";
import Inquiry from "../models/Inquiry.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

// Submit inquiry
router.post("/", async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all inquiries (admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete inquiry (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
