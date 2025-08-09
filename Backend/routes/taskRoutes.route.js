import express from "express";
import {
  addTask,
  getTasksByDate,
  updateTask,
  deleteTask,
  rolloverPendingTasks,
  getAllTasks,
  getCompletedTasks
} from "../controllers/taskController.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js"; 

const router = express.Router();

// Protected Routes
router.post("/add", verifyToken, addTask);                   // Add a new task
router.get("/date/:date", verifyToken, getTasksByDate); 
router.get('/getAllTasks', verifyToken, getAllTasks);     // Get all tasks for a date
router.put("/update/:id", verifyToken, updateTask);          // Update a task by ID
router.delete("/delete/:id", verifyToken, deleteTask);       // Delete a task by ID
router.post("/rollover", verifyToken, rolloverPendingTasks); // Move yesterday's pending tasks to today
router.get("/tasks/completed", verifyToken,getCompletedTasks)

export default router;
