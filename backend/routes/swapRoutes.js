import express from "express";
import Event from "../models/Event.js";
import SwapRequest from "../models/SwapRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/swappable-slots", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({
      userId: { $ne: req.user.id },
      status: "SWAPPABLE",
    }).populate("userId", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


router.post("/swap-request", authMiddleware, async (req, res) => {
  try {
    const { mySlotId, theirSlotId, receiverId } = req.body;

    await Event.findByIdAndUpdate(mySlotId, { status: "SWAP_PENDING" });
    await Event.findByIdAndUpdate(theirSlotId, { status: "SWAP_PENDING" });

    const swap = await SwapRequest.create({
      mySlotId,
      theirSlotId,
      requesterId: req.user.id,
      receiverId,
    });

    res.status(201).json({ message: "Swap request created", swap });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


// Respond to a swap (accept/reject)
router.post("/swap-response/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (status === "ACCEPTED") {
      // Swap user IDs between events
      const mySlot = await Event.findById(swap.mySlotId);
      const theirSlot = await Event.findById(swap.theirSlotId);

      const tempUser = mySlot.userId;
      mySlot.userId = theirSlot.userId;
      theirSlot.userId = tempUser;

      mySlot.status = "BUSY";
      theirSlot.status = "BUSY";

      await mySlot.save();
      await theirSlot.save();

      swap.status = "ACCEPTED";
    } else if (status === "REJECTED") {
      // Revert to SWAPPABLE
      await Event.findByIdAndUpdate(swap.mySlotId, { status: "SWAPPABLE" });
      await Event.findByIdAndUpdate(swap.theirSlotId, { status: "SWAPPABLE" });
      swap.status = "REJECTED";
    }

    await swap.save();
    res.json({ message: "Swap updated", swap });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
