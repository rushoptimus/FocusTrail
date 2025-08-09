import express from "express";
import dayjs from "dayjs";
import Mood from "../models/mood.model.js"


export const createMood = async (req,res) => {
    const userID = req.userID;
    const {mood} = req.body;
    const today = dayjs().format('YYYY-MM-DD'); 
    const timeNow = dayjs().format("HH:mm");
    try{
        const moodEntry = { mood, time:timeNow,};

    const updatedMoodDoc = await Mood.findOneAndUpdate(
      { userID, date: today },
      { $push: { moods: moodEntry } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Mood saved", mood: updatedMoodDoc });
  } catch (err) {
    res.status(500).json({ message: "Error saving mood", error: err.message });
  } 
};

export const getTodayMood = async(req,res) =>{
    const userID = req.userID;
    const today = dayjs().format('YYYY-MM-DD');

    try{
        const mood = await Mood.findOne({userID,date:today})
        res.status(200).json({mood})
        
    }
    catch(err){
        res.status(500).json({message:"Error fetching mood ", error:err.message})

    }
}

export const getMoodHistory = async(req, res) =>{
    const userID = req.userID;
    const from = dayjs().subtract(7,"day").format('YYYY-MM-DD') 
    try{
        const moods = await Mood.find({
            userID,
            date:{$gte: from },
        }).sort({date:-1});

        res.status(200).json({moods})

    }
    catch(err){
        res.status(500).json({message:"Error fetching history ", error:err.message});
    }
}

export const getMoodByDate = async (req, res) => {
  const dateParam = req.params.date; // e.g. "2025-07-28"
  const userID = req.userID;

  try {
    // Ensure date is in correct format
    const formattedDate = dayjs(dateParam).format("YYYY-MM-DD");

    const moodDoc = await Mood.findOne({
      userID,
      date: formattedDate,
    });

    if (!moodDoc) {
      return res.status(404).json({ success: false, message: "No mood found for this date" });
    }

    res.status(200).json({ success: true, mood: moodDoc });
  } catch (error) {
    console.error("Error fetching mood by date:", error);
    res.status(500).json({ success: false, message: "Failed to fetch mood" });
  }
};