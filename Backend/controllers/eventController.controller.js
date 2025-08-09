import Event from "../models/Event.model.js"
import moment from 'moment';

// Create a new event
export const addEvent = async (req, res) => {
  const { title, description, startTime, endTime, date, status  } = req.body;
  const userID = req.userID;

  try {
    const newEvent = new Event({ userID, title, description,
       startTime, endTime, date    ,  status: status || "Pending", });
    await newEvent.save();
    res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add event.' });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const userID = req.userID;
    const events = await Event.find({ userID }).sort({ date: 1, startTime: 1 });
    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch events.' });
  }
};

// Get events by date
export const getEventsByDate = async (req, res) => {
  const { date } = req.params;
  const userID = req.userID;

  const start = moment.utc(date).startOf('day').toISOString();
  const end = moment.utc(date).endOf('day').toISOString();

  try {
    const events = await Event.find({
      userID,
      date: {
        $gte: start,
        $lte: end,
      }
    }).sort({ startTime: 1 });

    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch events for the day.' });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const userID = req.userID;
  const updates = req.body;

  try {
    const updated = await Event.findOneAndUpdate({ _id: id, userID }, updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update event.' });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const userID = req.userID;

  try {
    const deleted = await Event.findOneAndDelete({ _id: id, userID });
    if (!deleted) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, message: 'Event deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete event.' });
  }
};

// Update all past events to "Completed"
export const updatePastEventsStatus = async (req, res) => {
  const userID = req.userID;

  // Get the start of today's date in UTC for comparison
  const today = moment.utc().startOf('day').toDate();

  try {
    const result = await Event.updateMany(
      {
        userID,
        date: { $lt: today }, // all dates before today
        status: "Pending",    // only update those that are still pending
      },
      { $set: { status: "Completed" } }
    );

    res.status(200).json({
      success: true,
      message: `Updated ${result.modifiedCount} past events to Completed.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update past events." });
  }
};
