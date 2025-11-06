import express from "express";
import Event from "../models/Event.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = await Event.create({
      title,
      startTime,
      endTime,
      userId: req.user.id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get User's Events
router.get("/my", authMiddleware, async (req, res) => {
  const events = await Event.find({ userId: req.user.id });
  res.json(events);
});

// ✅ Update Event Status
router.patch("/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const event = await Event.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(event);
});

// ✅ Delete Event
router.delete("/:id", authMiddleware, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

export default router;
