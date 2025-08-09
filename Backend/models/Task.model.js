import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  date: {
    type: String, // Format: 'YYYY-MM-DD'
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Task", taskSchema);
