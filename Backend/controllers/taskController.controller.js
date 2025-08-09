import Task from "../models/Task.model.js";
import moment from "moment"; 

// @desc    Add a new task
export const addTask = async (req, res) => {
  const { title, remark, priority, date } = req.body;
  const userID = req.userID;

  try {
    const newTask = new Task({
      userID,
      title,
      remark,
      priority,
      date,
    });

    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add task." });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userID = req.userID;
    const tasks = await Task.find({ userID }).sort({ date: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch all tasks' });
  }
};

export const getTasksByDate = async (req, res) => {
  const dateParam = req.params.date; // e.g. "2025-07-28"
  const userID = req.userID;
  // Treat the date as UTC day range
  const startOfDay = moment.utc(dateParam).startOf('day').toISOString();;
  const endOfDay = moment.utc(dateParam).endOf('day').toISOString();;
  try {
    const tasks = await Task.find({
      userID,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ priority: -1 });
    console.log(startOfDay);
    console.log(endOfDay)
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks by date:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks." });
  }
};

// @desc    Update a specific task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.userID;
  const updates = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userID },
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update task." });
  }
};

// @desc    Delete a specific task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.userID;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, userID });

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete task." });
  }
};


export const rolloverPendingTasks = async (req, res) => {
  const userID = req.userID;
  const todayUTCStart = moment.utc().startOf('day').toISOString();
  const nowUTCISO = moment.utc().toISOString(); // Change this line
  try {
    const result = await Task.updateMany(
      {
        userID,
        status: "Pending",
        date: { $lt: todayUTCStart },
      },
      {
        $set: { date: nowUTCISO }, // And this line
      }
    );

    res.status(200).json({
      message: `${result.modifiedCount} task(s) rolled over to today.`,
    });
  } catch (error) {
    console.error("Error in rolloverPendingTasks:", error);
    res.status(500).json({ success: false, message: "Failed to roll over tasks." });
  }
};

// @desc    Get all completed tasks for a user
export const getCompletedTasks = async (req, res) => {
  const userID = req.userID;

  try {
    const completedTasks = await Task.find({
      userID,
      status: "Completed",
    }).sort({ date: -1 });

    res.status(200).json({ success: true, tasks: completedTasks });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch completed tasks." });
  }
};
