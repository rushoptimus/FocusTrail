import express from "express";
import {
  addEvent,
  getAllEvents,
  getEventsByDate,
  updateEvent,
  deleteEvent,updatePastEventsStatus
} from "../controllers/eventController.controller.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/addEvent', verifyToken, addEvent);
router.get('/getAllEvents', verifyToken, getAllEvents);
router.get('/Eventdate/:date', verifyToken, getEventsByDate);
router.put('/updateEvent/:id', verifyToken, updateEvent);
router.delete('/deleteEvent/:id', verifyToken, deleteEvent);
router.put('/update-past-status', verifyToken , updatePastEventsStatus);

export default router;
