import {create } from "zustand";
import axios from "axios";

const API_BASE_URL = 'focustrail-backend.up.railway.app'; 
axios.defaults.withCredentials = true;

export const useMoodStore = create((set) =>({
    moods:[],
    todayMood:null,
    error:null,
    latestMood: null,

    addMood: async( mood ) =>{
        const token = localStorage.getItem("token");
        set({error:null});
        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/mood`,{mood},{
                headers:{Authorization:`Bearer ${token}`}

            });
            set({todayMood: response.data.mood, error:null});
        }
        catch(error){
            set({error: error.response?.data?.message || 'Failed to save mood'});
            throw error;
        }
    },

    fetchTodayMood: async () =>{
        const token = localStorage.getItem("token");
        set({error:null});
        try{
            const response = await axios.get(`${API_BASE_URL}/api/auth/mood/today`  ,{
                headers:{Authorization:`Bearer ${token}`}

            });
            set({ todayMood: response.data.mood, error:null, latestMood: response.data.mood.moods.at(-1) });
        }
        catch(error){
            set({error:error.response?.data?.message || "Failed to fetch today 's mood. "})
        }
    },

        fetchDateMood: async (date) =>{
        const token = localStorage.getItem("token");
        set({error:null});
        try{
            const response = await axios.get(`${API_BASE_URL}/api/auth/mood/datemoods/${date}`  ,{
                headers:{Authorization:`Bearer ${token}`}

            });
         const moodData = response.data.mood || null;
        const latest = moodData?.moods?.length ? moodData.moods.at(-1) : null;

        set({
            todayMood: moodData,
            latestMood: latest,
            error: null
        });    
        }
        catch(error){
            set({error:error.response?.data?.message || "Failed to fetch today 's mood. "})
        }
    },




    fetchMoodHistory: async()=>{
        const token = localStorage.getItem("token");
        set({ error:null});
        try{
            const response = await axios.get(`${API_BASE_URL}/api/auth/mood/history`,{
                headers:{Authorization:`Bearer ${token}`}
            });
            set({moods: response.data.moods, error:null});                        
        }
        catch(error){
            set({error:error.response?.data?.message || "Failed to fetch Mood History"});
        }
    },

   fetchGeminiAdvice : async (mood, prompt) => {
  try {
    const res = await axios.post(   `${API_BASE_URL}/api/mood-advice`, {
      mood,
      customPrompt: prompt || ""
    });
    return res.data.message;
  } catch (err) {
    console.error(err);
    return "Sorry, I couldn't fetch suggestions right now.";
  }
},


    clearMoodData : () =>{
        set({
            moods:[],
            todayMood:null,
            latestMood: null,
            error:null
            
        })
    },

}));
