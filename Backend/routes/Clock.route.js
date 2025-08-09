import express from "express";
import {   startWorkSession,
  endWorkSession,
  startBreakSession,
  stopBreakSession,
  getTodaySessions,
  getRunningSession,
  getWeeklySessions ,
getTotalWorkTime,
getDateSessions
} from "../controllers/Clock.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();


router.post('/work/start',verifyToken, startWorkSession);
router.post('/work/end',verifyToken, endWorkSession);
router.post('/break/start',verifyToken, startBreakSession);
router.post('/break/stop',verifyToken, stopBreakSession);
router.get('/clock/today',verifyToken, getTodaySessions);
  router.get('/running',verifyToken,  getRunningSession);
router.get("/clock/week", verifyToken, getWeeklySessions);
router.get('/clock/total-time', verifyToken, getTotalWorkTime);
router.get("/clock/dateclock/:date", verifyToken, getDateSessions);






export default router;