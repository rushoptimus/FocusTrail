import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = "focustrail-backend.up.railway.app"; // Adjust based on your backend

export const useTaskStore = create((set) => ({
  tasks: [],
  error: null,
  completedTasks: [],

fetchAllTasks: async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/api/auth/getAllTasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ tasks: response.data.tasks, error: null });
  } catch (error) {
    set({ error: error.response?.data?.message || "Failed to fetch all tasks." });
  }
},


  // Fetch tasks for a specific date
  fetchTasksByDate: async (date) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/auth/date/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: response.data.tasks, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch tasks." });
    }
  },

  // Add a new task
  addTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/auth/add`,
         taskData,
          {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({ 
        tasks: [...state.tasks, response.data.task],
         error: null }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to add task." });
    }
  },

  // Update a task by ID
  updateTask: async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_BASE_URL}/api/auth/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        tasks: state.tasks.map((task) => task._id === id ? response.data.task : task),
        error: null,
      }));

    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to update task." });
    }
  },

  // Delete a task by ID
  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        error: null,
      }));

    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to delete task." });
    }
  },

  // Rollover pending tasks from yesterday to today
  rolloverTasks: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/auth/rollover`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message || "Tasks rolled over successfully!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to rollover tasks." });
    }
  },

  fetchCompletedTasks: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/auth/tasks/completed`, {
        headers: { Authorization: `Bearer ${token}` },
      }); // adjust URL if needed
      set({ completedTasks: response.data.tasks, error: null });
  } catch (error) {
    set({ error: error.response?.data?.message || "Failed to fetch all tasks." });
  }
},
}));



  