import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Get logged-in user's profile
router.get("/profile", authMiddleware, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update profile
router.put("/profile", authMiddleware, async (req, res) => {

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
