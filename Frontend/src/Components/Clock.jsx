import React, { useEffect, useRef, useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Dashboard_component_frames from './Dashboard_component_frames';
import { useClockStore } from '../store/Clock';
import { Play } from 'lucide-react';
import { CircleStop } from 'lucide-react';

const Clock = () => {
  const {
    startWorkSession,
    endWorkSession,
    startBreakSession,
    stopBreakSession,
    runningSession,
    fetchTodaySessions,
    fetchRunningSession,
  } = useClockStore();

  const [mode, setMode] = useState("work"); // "work" | "break"
  const [isRunning, setIsRunning] = useState(false);
  const [runningTime, setRunningTime] = useState(0); // in ms
  const [breakDuration, setBreakDuration] = useState(5); // in minutes
  const [intervalId, setIntervalId] = useState(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  useEffect(() => {
    const restoreRunningSession = async () => {
      await fetchRunningSession();

      setTimeout(() => {
        const session = useClockStore.getState().runningSession;
        console.log("Restored session:", session);

        if (session) {
          const startTime = new Date(session.startTime);
          const now = new Date();
          const elapsed = now - startTime;
          startTimeRef.current = startTime;
          setRunningTime(elapsed);
          setMode(session.mode);
          if (session.mode === "break" && session.duration) {
            setBreakDuration(session.duration / 60); // Convert seconds to minutes
          }
          if (intervalRef.current) clearInterval(intervalRef.current); // clear if already running

          intervalRef.current = setInterval(() => {
            setRunningTime((prev) => prev + 1000);
          }, 1000);

          setIsRunning(true);
        }
      }, 100);
    };

    restoreRunningSession();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  useEffect(() => {
    if (!isRunning || mode !== "break") return;

    const durationInMs = breakDuration * 60 * 1000;

    if (runningTime >= durationInMs) {
      handleStop();  // Automatically stop when break time ends
    }
  }, [runningTime, isRunning, mode]);



  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress =
    mode === "work"
      ? (runningTime % (60 * 60 * 1000)) / (60 * 60 * 1000) * 100 // Optional: work progress in 1 hour chunks
      : ((breakDuration * 60 * 1000 - runningTime) / (breakDuration * 60 * 1000)) * 100;



  const handleStart = async () => {
    if (mode === "work") {
      await startWorkSession();
    } else {
      const durationInSeconds = breakDuration * 60;
      await startBreakSession(durationInSeconds);
    }

     const now = new Date();
      startTimeRef.current = now;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
        const elapsed = new Date() - startTimeRef.current;
      setRunningTime(elapsed);
    }, 1000);

    setIsRunning(true);
  };

  const handleStop = async () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (mode === "work") {
      await endWorkSession(runningSession?._id);
    } else {
      await stopBreakSession(runningSession?._id);
    }

    setIsRunning(false);
    setRunningTime(0);
  };

  const toggleMode = () => {
    if (isRunning) return; // prevent mode switch while running
    setMode((prev) => (prev === "work" ? "break" : "work"));
    setRunningTime(0);
  };

  return (
    <Dashboard_component_frames>
      <div className="w-full max-h-full rounded-xl p-4   flex flex-col items-center justify-center">
        <h2 className="xl:text-xl lg:text-lg md:text-md text-md  font-bold capitalize mb-4">Time Tracker</h2>

        <div className="lg:max-w-[210px] md:max-w-[190px] max-w-[170px] aspect-square max-h-full ">
          <CircularProgressbarWithChildren
            value={progress}
            styles={buildStyles({
              pathColor: "#FFE438FF",
              trailColor: "#FEEABFFF",
              strokeLinecap: "round",
              shadowColor: "rgba(0, 0, 0, 1)",
            })}
          >
             {mode === "break" && !isRunning ? (
          <div className="mt-4 flex items-center gap-2">
            <label htmlFor="breakDuration" className="text-sm text-gray-600">Break (min):</label>
            <input
              type="number"
              id="breakDuration"
              min={1}
              className="border px-2 py-1 rounded w-16 text-center"
              value={breakDuration}
              onChange={(e) => setBreakDuration(parseInt(e.target.value))}
            />
          </div>
        ): (
            <div className="text-center">
              <p className="text-2xl font-bold">
                {mode === "work"
                  ? formatTime(runningTime)
                  : formatTime(Math.max(breakDuration * 60 * 1000 - runningTime, 0))}
              </p>
              <p className="text-sm text-gray-500 capitalize">{mode === "work" ? "Work Mode" : "Break Mode"}</p>
            </div>)}
          </CircularProgressbarWithChildren>
        </div>

       

        <div className="flex gap-2 lg:mt-4 md:mt-4  mt-2">
          <button
            onClick={isRunning ? handleStop : handleStart}
            className="lg:py-2 md:py-2 py-1 px-4  cursor-pointer bg-yellow-300  rounded-full shadow font-medium"
          >
            {isRunning ? <CircleStop lg:size={25} size={20} /> : <Play fill='black' lg:size={25} size={20}  />}
          </button>



          <button
            onClick={toggleMode}
            disabled={isRunning}
            className="lg:py-2 md:py-2 py-1  px-4 bg-yellow-300 text-black rounded-full xl:text-md lg:text-md md:text-md 
            text-sm shadow font-medium"
          >
            Switch to {mode === "work" ? "Break" : "Work"}
          </button>

        </div>
      </div>
    </Dashboard_component_frames>
  );
};


export default Clock




