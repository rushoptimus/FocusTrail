import {create} from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';
const API_BASE_URL = 'http://localhost:5000'; // Adjust this to your API base URL

axios.defaults.withCredentials = true; // Enable sending cookies with requests
export const useAuthStore = create(
    persist(
    (set) =>
    ({
        user:null,
        isAuthenticated: false,
        error: null,
        isCheckingAuth: true,
        


        signup : async(email , password ,name,Title) => {
            set({ error: null });
            try{
               const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password, name ,Title });
               set({ user: response.data.user, isAuthenticated: true });

            }
            catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during signup.' });
                throw error;
            }
        },
        VerifyEmail: async (code) => {
            set({ error: null });
            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email`, { code });
                set({ user: response.data.user, isAuthenticated: true });
                return response.data; 
            } catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during email verification.' });
                throw error;
            }
        },

        checkAuth: async () => {
            set({ isCheckingAuth: true, error: null });
            try{
                const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`);
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
            catch(error) {
                set({ isAuthenticated: false, isCheckingAuth: false, error: null });
            }

        },

        login: async (email, password) =>{
            set({ error: null });
            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password },{ withCredentials: true });
                set({ user: response.data.user, isAuthenticated: true , error: null });
            } catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during login.' });
                throw error;
            }

        },

        logout: async ()=>{
            set ({error : null});
            try {
                await axios.post(`${API_BASE_URL}/api/auth/logout`);
                set({ user: null, isAuthenticated: false, error: null });
            }
            catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during logout.' });
                throw error;
            }
        },
        forgotPassword: async (email) =>{
            set({error: null });
            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
                return response.data; // Return the response data for further processing if needed
            } catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during password reset.' });
                throw error;
            }
        },
        resetPassword: async (token , password) => {
            set({error : null });
            try{
                const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password/${token}`,{ password });
                return response.data; // Return the response data for further processing if needed
            }
            catch (error) {
                set({ error: error.response?.data?.message || 'An error occurred during password reset.' });
                throw error;
            }
        },

    }),
    {
        name: 'auth-storage', // Unique name for the storage
        partialize: (state) =>({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            isCheckingAuth: state.isCheckingAuth,
        }),
    }
))