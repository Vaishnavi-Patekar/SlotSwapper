// import express from "express";
// import Event from "../models/Event.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Create Event
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const event = new Event({ ...req.body, userId: req.user.id });
//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // ✅ Get Logged-in User’s Events
// router.get("/my", authMiddleware, async (req, res) => {
//   try {
//     const events = await Event.find({ userId: req.user.id });
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Update Event (status/title/time)
// router.patch("/:id", authMiddleware, async (req, res) => {
//   try {
//     const event = await Event.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );
//     if (!event) return res.status(404).json({ message: "Event not found" });
//     res.json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // ✅ Delete Event
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const event = await Event.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id,
//     });
//     if (!event) return res.status(404).json({ message: "Event not found" });
//     res.json({ message: "Event deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// export default router;


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
