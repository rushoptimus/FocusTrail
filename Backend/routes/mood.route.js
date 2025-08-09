import express from "express"; // ✅ FIXED this line
import { createMood, getMoodHistory, getTodayMood,getMoodByDate } from "../controllers/mood.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js"; // Also make sure this has `.js` if using ES Modules

const router = express.Router();

router.post("/mood", verifyToken, createMood);
router.get("/mood/today", verifyToken, getTodayMood);
router.get("/mood/history", verifyToken, getMoodHistory);
router.get("/mood/datemoods/:date", verifyToken, getMoodByDate);

export default router; // ✅ Don’t forget to export the router