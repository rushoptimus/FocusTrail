// controllers/gemini.controller.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAnRX0oxlyFGKCgndJ-ZDogqHA3t_fAOsI";


export const getGeminiAdvice = async (req, res) => {
  const { mood, customPrompt } = req.body;

  if (!mood && !customPrompt) {
    return res.status(400).json({ message: "Mood or prompt is required" });
  }

  const prompt = customPrompt || `I'm feeling ${mood}. Can you suggest short ways to improve productivity and my mood today?`;


 try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
         "Content-Type": "application/json"
        },
      }
    );

    const message = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    res.status(200).json({ message });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Could not fetch advice at this moment." });
  }
};
