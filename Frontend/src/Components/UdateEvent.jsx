import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useEventStore } from '../store/eventStore';

const UpdateEvent = ({ eventToEdit,setEditingEvent }) => {
  const { updateEvent } = useEventStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      const start = new Date(eventToEdit.startTime);
      const end = new Date(eventToEdit.endTime);

      setTitle(eventToEdit.title || '');
      setDescription(eventToEdit.description || '');
      setStartTime(start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      setEndTime(end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));

      setDate(new Date(eventToEdit.date).toISOString().substring(0, 10)); // "YYYY-MM-DD"
    }
  }, [eventToEdit]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    try {
      const combinedStartTime = new Date(`${date}T${startTime}`);
      const combinedEndTime = new Date(`${date}T${endTime}`);
      const eventDate = new Date(date);

      await updateEvent(eventToEdit._id, {
        title,
        description,
        startTime: combinedStartTime,
        endTime: combinedEndTime,
        date: eventDate,
      });

      toast.success('Event Updated');
      setEditingEvent(null)
    } catch (error) {
      console.error('Error updating event:', error.message);
      toast.error('Failed to update event');
    }
  };

  return (
    <form
      onSubmit={handleUpdateEvent}
      className="bg-gray-50 p-4 rounded-lg shadow-sm w-[80%] flex flex-col items-center justify-center gap-6"
    >
      <div className="flex items-end justify-end w-[90%]">
        <button
          className="rounded-full bg-gray-800 text-white shadow-md shadow-gray-600 w-8 h-8 cursor-pointer text-2xl flex items-center justify-center"
          onClick={() => setEditingEvent(null)}
          type="button"
        >
          x
        </button>
      </div>

      <h3 className="font-bold text-2xl">Update Event</h3>

      <label className="w-full flex items-center justify-center h-full gap-4">
        <span className="flex items-center justify-start w-[13%]">Event Name:</span>
        <input
          type="text"
          placeholder="Event Title"
          className="p-2 border rounded w-[70%]"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start w-[13%]">Description:</span>
        <textarea
          placeholder="Optional description"
          className="p-2 border rounded w-[70%]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start w-[13%]">Date:</span>
        <input
          type="date"
          className="p-2 border rounded w-[70%]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start w-[13%]">Start Time:</span>
        <input
          type="time"
          className="p-2 border rounded w-[70%]"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className="flex items-center justify-start w-[13%]">End Time:</span>
        <input
          type="time"
          className="p-2 border rounded w-[70%]"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-700 w-[50%] cursor-pointer text-white py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateEvent;
