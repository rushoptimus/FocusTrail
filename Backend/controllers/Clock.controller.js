import express from "express"
import dayjs from "dayjs";
import ClockSession from "../models/ClockSession.js";
import moment from 'moment';

export const startWorkSession = async (req, res) => {
  try {
   const userID = req.userID;
    const startTime = new Date();
    const date = startTime.toISOString().split("T")[0];

    const newSession = await ClockSession.create({
      userID,
      mode: "work",
      startTime,
      date,
    });

    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ message: "Failed to start work session", error: err.message });
  }
};

export const endWorkSession = async (req, res) => {
  try {
    const { sessionID } = req.body;
    const endTime = new Date();

    const session = await ClockSession.findById(sessionID);
    if (!session || session.mode !== 'work') {
      return res.status(404).json({ message: "Work session not found" });
    }

    session.endTime = endTime;
    await session.save();

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to end session", error: err.message });
  }
};


export const startBreakSession = async (req, res) => {
  try {
    const userID = req.userID;
    const { duration } = req.body; // duration in seconds or minutes
    const startTime = new Date();
    const date = startTime.toISOString().split("T")[0];

    const breakSession = await ClockSession.create({
      userID,
      mode: "break",
      duration,
      startTime,
      date,
    });

    res.status(201).json(breakSession);
  } catch (err) {
    res.status(500).json({ message: "Failed to start break", error: err.message });
  }
};


export const stopBreakSession = async (req, res) => {
  try {
    const { sessionID } = req.body;

    const stopTime = new Date();

    const session = await ClockSession.findById(sessionID);
    if (!session || session.mode !== 'break') {
      return res.status(404).json({ message: "Break session not found" });
    }
    session.endTime = stopTime;

    // Update actual duration
    const actualDuration = Math.floor((stopTime - new Date(session.startTime)) / 1000); // seconds
    session.duration = actualDuration;
    await session.save();

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to stop break session", error: err.message });
  }
};


export const getTodaySessions = async (req, res) => {
  try {
    const userID = req.userID;
    const today = new Date().toISOString().split("T")[0];

    const sessions = await ClockSession.find({ userID, date: today })
      .sort({ startTime: 1 });

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err.message });
  }
};

export const getDateSessions = async (req, res) => {
    const dateParam = req.params.date; 
    const userID = req.userID;
  try {
    const formattedDate = dayjs(dateParam).format("YYYY-MM-DD");
   const sessions = await ClockSession.find({
      userID,
      date: formattedDate,
    })

     if (!sessions) {
      return res.status(404).json({ success: false, message: "No mood found for this date" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err.message });
  }
};


  export const getRunningSession = async (req, res) => {
    try {
    const userID = req.userID;    
    const session = await ClockSession.findOne({
      userID,
      $or: [
        { mode: "work", endTime: { $exists: false } },
        { mode: "break", duration: { $exists: true }, endTime: { $exists: false } },
        ]
      }).sort({ startTime: -1 });
      
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ message: "Failed to get running session", error: err.message });
    }
  };


  export const getWeeklySessions = async (req, res) => {
  try {
    const userID = req.userID;
    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    const sessions = await ClockSession.find({
      userID,
      mode: 'work',
      startTime: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() },
    });

    const dailyWork = Array(7).fill(0); // Monday = index 0

    sessions.forEach((session) => {
      const dayIndex = moment(session.startTime).isoWeekday() - 1; // 0 (Mon) to 6 (Sun)
      const start = moment(session.startTime);
      const end = session.endTime ? moment(session.endTime) : moment();
      const durationInHours = end.diff(start, 'seconds') / 3600;
      dailyWork[dayIndex] += durationInHours;
    });

    res.status(200).json(dailyWork);
  } catch (err) {
    console.error("Error fetching weekly sessions:", err);
    res.status(500).json({ message: "Failed to fetch weekly sessions" });
  }
};


export const getTotalWorkTime = async (req, res) => {
  try {
    const userID = req.userID;

    const sessions = await ClockSession.find({
      userID,
      mode: 'work',
      endTime: { $exists: true }
    });

    let totalSeconds = 0;

    sessions.forEach(session => {
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);
      totalSeconds += (end - start) / 1000;
    });

    const totalHours = totalSeconds / 3600;

    res.status(200).json({ totalHours });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate total work time", error: err.message });
  }
};
