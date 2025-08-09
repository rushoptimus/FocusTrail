import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
   status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  date: { type: Date, required: true }, // for easier querying
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
