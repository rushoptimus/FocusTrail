import { create } from 'zustand';
import axios from "axios";
import toast from 'react-hot-toast';

const API_BASE_URL = "http://localhost:5000/api/auth";

export const useClockStore = create((set) => ({
  sessions: [],
  runningSession: null,
  loading: false,
  error: null,
  totalHours: 0,

  startWorkSession: async () => {
    try {
      const token = localStorage.getItem("token");
      set({ loading: true });
         const res = await axios.post(`${API_BASE_URL}/work/start`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ runningSession: res.data, loading: false });
      toast.success("Work session started");
    } catch (err) {
      toast.error("Failed to start work session");
      set({ error: err.response?.data?.message || "Failed to start work", loading: false });
    }
  },

  endWorkSession: async (sessionID) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/work/end`, { sessionID },{
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ runningSession: null, loading: false });
      toast.success("Work session ended");
    } catch (err) {
      toast.error("Failed to end work session");
      set({ error: err.response?.data?.message || "Failed to end work", loading: false });
    }
  },

  startBreakSession: async (duration) => {
    try {
        const token = localStorage.getItem("token");
      set({ loading: true });
      const res = await axios.post(`${API_BASE_URL}/break/start`, { duration },{
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ runningSession: res.data, loading: false });
      toast.success("Break started");
    } catch (err) {
      toast.error("Failed to start break");
      set({ error: err.response?.data?.message || "Failed to start break", loading: false });
    }
  },

  stopBreakSession: async (sessionID) => {
    try {
      set({ loading: true });
        const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/break/stop`, { sessionID }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ runningSession: null, loading: false });
      toast.success("Break ended");
    } catch (err) {
      toast.error("Failed to stop break");
      set({ error: err.response?.data?.message || "Failed to stop break", loading: false });
    }
  },

  fetchTodaySessions: async () => {
    try {
        const token = localStorage.getItem("token");
      set({ loading: true });
      const res = await axios.get(`${API_BASE_URL}/clock/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ sessions: res.data, loading: false });
    } catch (err) {
      toast.error("Failed to fetch today's sessions");
      set({ error: err.response?.data?.message || "Failed to fetch sessions", loading: false });
    }
  },

  fetchRunningSession: async () => {
    try {
      const token = localStorage.getItem("token");
      set({ loading: true });
      const res = await axios.get(`${API_BASE_URL}/running`,{}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched running session from backend:", res.data);
      set({ runningSession: res.data, loading: false });
    } catch (err) {
      toast.error("Failed to check running session");
      set({ error: err.response?.data?.message || "Failed to check running session", loading: false });
    }
  },

fetchWeeklySessions: async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/clock/week`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data)
    return res.data; // array of 7 numbers
  } catch (err) {
    toast.error("Failed to fetch weekly working hours");
    set({ error: err.response?.data?.message || "Failed to check weekly session", loading: false });
    return Array(7).fill(0);
  }
},

fetchtotalSessionstime: async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/clock/total-time`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ totalHours: res.data.totalHours });
    return res.data; // array of 7 numbers
  } catch (err) {
    toast.error("Failed to fetch total working hours");
    set({ error: err.response?.data?.message || "Failed to check total working session", loading: false });
  }
},



fetchDateSessions: async (date) => {
    try {
        const token = localStorage.getItem("token");
      set({ loading: true });
      const res = await axios.get(`${API_BASE_URL}/clock/dateclock/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ sessions: res.data, loading: false });
    } catch (err) {
      toast.error("Failed to fetch today's sessions");
      set({ error: err.response?.data?.message || "Failed to fetch sessions", loading: false });
    }
  },




  clearError: () => set({ error: null }),
}));

       
    
   
