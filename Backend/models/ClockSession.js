import mongoose from "mongoose";

const ClockSession = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    mode: {
        type: String,
        enum: ['work', 'break'],
        required: true,
    },
    title: {
        type: String,
        default: function () {
            return this.mode === 'work' ? 'Work Session' : 'Break Time';
        },
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
        
    },
    duration: {
        type: Number, // In seconds or minutes
        required: function () {
            return this.mode === 'break';
        },
    },
    date: {
        type: String, // Optional: For grouping sessions by date
    },
}, { timestamps: true });

export default mongoose.model('ClockSession', ClockSession);
