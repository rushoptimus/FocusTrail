import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = "https://focustrail-backend.up.railway.app";

export const useEventStore = create((set) => ({
  events: [],
  error: null,

  // Fetch all events (for full calendar or dashboard)
  fetchAllEvents: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/auth/getAllEvents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ events: response.data.events, error: null });
    } catch (err) {
      set({ error: err.message || "Failed to Fetch Events" });
    }
  },

  // Fetch events for a specific date
  fetchEventsByDate: async (date) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/auth/Eventdate/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ events: response.data.events, error: null });
    } catch (err) {
      set({ error: err.message });
    }
  },

addEvent: async (eventData) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    const response = await axios.post(`${API_BASE_URL}/api/auth/addEvent`, eventData, 
      {
       headers: { Authorization: `Bearer ${token}` },
    });

    set((state) => ({
      events: [...state.events, response.data.event],
      error: null,
    }));
    toast.success("added event succesfully")

  } catch (error) {
 set({ error: error.response?.data?.message || "Failed to add events." });
    toast.error("Error in add event")
  }
},


  // Update an event
  updateEvent: async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/api/auth/updateEvent/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        events: state.events.map((event) =>
          event._id === id ? response.data.event : event
        ), error: null
      }));
    } catch (err) {
      console.error("Update Event Error:", err);
    }
  },

  // Delete an event
  deleteEvent: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/auth/deleteEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
         error: null
      }));
    } catch (err) {
      console.error("Delete Event Error:", err);
    }
  },

  updateCompletedStatusEvent: async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(
      `${API_BASE_URL}/api/auth/update-past-status`, // Make sure this matches your actual backend route
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(response.data.message || "Past events updated successfully");
    set({ error: null });
  } catch (err) {
    console.error("Update Completed Status Error:", err);
    toast.error(err.response?.data?.message || "Failed to update past events");
    set({ error: err.response?.data?.message || "Failed to update past events" });
  }
},


  
}));
