import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useMoodStore } from "../store/mood";
import Nav from "../Components/Nav";
import DashboardFrame from "../Components/DashboardFrame";
import Dashboard_component_frames from "../Components/Dashboard_component_frames";
import cry from "../MoodEmojis/cry.svg";
import sad from "../MoodEmojis/sad.svg";
import angry from "../MoodEmojis/angry.svg";
import good from "../MoodEmojis/good.svg";
import happy from "../MoodEmojis/happy.svg";
import EditNameTitle from "../Components/EditNameTitle"
const moodWeights = {
  cry: 1,
  sad: 2,
  angry: 3,
  good: 4,
  happy: 5,
};

const reverseMoodMap = {
  1: "cry",
  2: "sad",
  3: "angry",
  4: "good",
  5: "happy",
};
const moodMap = {
  cry: { value: 1, emoji: cry },
  sad: { value: 2, emoji: sad },
  angry: { value: 3, emoji: angry },
  good: { value: 4, emoji: good },
  happy: { value: 5, emoji: happy },
};

const moodLibrary = {
  happy: [
    "https://media3.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif",
    "https://media3.giphy.com/media/26DMWzCZePgXpp1FC/giphy.gif",
    "https://media2.giphy.com/media/tFSqMSMnzPRTAdvKyr/giphy.gif",
    "https://media3.giphy.com/media/3o7WIHsSrmSmbfdwIM/giphy.gif",
    "https://media2.giphy.com/media/zzALYeLqMLDa6PEV2C/giphy.gif",
    "https://media4.giphy.com/media/xThta9uXEf59s5hHhK/giphy.gif",
  ],
  good: [
    "https://media1.giphy.com/media/KiZ6kV683kPaU/giphy.gif",
    "https://media3.giphy.com/media/l1KcRlWUukdNjCTsY/giphy.gif",
    "https://media1.giphy.com/media/HFZwjdm5cNF3a/giphy.gif",
    "https://media4.giphy.com/media/vRJWP6d7s4pPelQWK2/giphy.gif",
  ],
  cry: [
    "https://media0.giphy.com/media/SsjyaYH2gkNCE/giphy.gif",
    "https://media1.giphy.com/media/26DMVZDzkwGHtrI9a/giphy.gif",
    "https://media.giphy.com/media/McNHek8WfyEA8/giphy.gif",
  ],
  angry: [
    "https://media.giphy.com/media/3DnDRfZe2ubQc/giphy.gif",
    "https://media.giphy.com/media/q1mHcB8wOCWf6/giphy.gif",
    "https://media2.giphy.com/media/xUOwGnn5zcQjsVfvlm/giphy.gif",
    "https://media.giphy.com/media/Ofo2Z3DnjvAHa4WJOf/giphy.gif",
    "https://media4.giphy.com/media/xUOxflHRiTT2AXkd9e/giphy.gif",
  ],
  sad: [
    "https://media.giphy.com/media/3ulvQTCmW3MhzpyIsJ/giphy.gif",
    "https://media.giphy.com/media/x0kZJ8jRGzVoVsjJ9v/giphy.gif",
    "https://media.giphy.com/media/3o85xGr7NxBC4eGTte/giphy.gif",
    "https://media4.giphy.com/media/BN6PYZEEfjGQnYxnD9/giphy.gif",
    "https://media.giphy.com/media/RfxLp4KX4KA6c/giphy.gif",
    "https://media3.giphy.com/media/l0NgQgn90NTKDu6Ri/giphy.gif",
    "https://media1.giphy.com/media/3ohs4mw9it1lRnnUGs/giphy.gif",
  ],
};

const MoodTracker = () => {
  const {
    latestMood,
    fetchTodayMood,
    error,
    moods,
    fetchMoodHistory,
    fetchGeminiAdvice,
  } = useMoodStore();

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [discussion, setDiscussion] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEdit, SetShowEdit] = useState(false);
  const [show, SetShow] = useState(false);
  

  const handleEditShow = () => {
    SetShowEdit(!showEdit);
    SetShow(false);
  }

  const handleMobileNav = () => {
    SetShow(!show);
  };
  const mood = latestMood?.mood; // Replace with the actual mood you want to display

  useEffect(() => {
    fetchTodayMood();
    fetchMoodHistory();
    // Fetch today's mood on component mount
  }, []);

  useEffect(() => {
    const fetchAdvice = async () => {
      if (mood) {
        setLoading(true);
        const advice = await fetchGeminiAdvice(mood);
        setDiscussion(advice);
        setLoading(false);
      }
    };
    fetchAdvice();
  }, [mood]);

  const averageMood = useMemo(() => {
    const allMoodEntries = moods.flatMap((entry) => entry.moods); // Flatten

    if (allMoodEntries.length === 0) return null;

    const total = allMoodEntries.reduce((sum, moodObj) => {
      const weight = moodWeights[moodObj.mood] || 0;
      return sum + weight;
    }, 0);

    const avg = total / allMoodEntries.length;

    // Round to nearest integer
    const roundedAvg = Math.round(avg);

    return reverseMoodMap[roundedAvg] || "unknown";
  }, [moods]);

  const weeklyData = useMemo(() => {
    // Convert data for charting (average mood per day)
    const grouped = {};

    moods.forEach((entry) => {
      const date = entry.date;
      const moodsForDay = entry.moods || [];

      const moodValues = moodsForDay
        .map((m) => moodMap[m.mood]?.value)
        .filter((v) => v !== undefined);

      if (moodValues.length === 0) return;

      const avg = moodValues.reduce((sum, v) => sum + v, 0) / moodValues.length;

      const rounded = Math.round(avg);
      const closestMood = Object.entries(moodMap).find(
        ([, val]) => val.value === rounded
      );

      if (closestMood) {
        grouped[date] = {
          date: dayjs(date).format("ddd"), // "Mon", "Tue", etc.
          mood: closestMood[0],
          moodValue: rounded,
          emoji: closestMood[1].emoji,
        };
      }
    });

    return Object.values(grouped).reverse(); // Latest last
  }, [moods]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  function getRandomGifByMood(mood) {
    if (!mood) return null;

    const gifs = moodLibrary[mood.toLowerCase()];
    if (!gifs || gifs.length === 0) return null;
    const index = Math.floor(Math.random() * gifs.length);
    return gifs[index];
  }

  const gifUrl = getRandomGifByMood(mood);
  const averageurl = getRandomGifByMood(averageMood);
  if (!latestMood && !error) return <p>Loading your mood...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return;
    setLoading(true);
    const advice = await fetchGeminiAdvice(mood, customPrompt);
    setDiscussion(advice);
    setLoading(false);
    setCustomPrompt("");
  };
  const renderCustomDot = ({ cx, cy, payload }) => {
    const isMobile = window.innerWidth < 640; // Tailwind's `sm` breakpoint

    const size = isMobile ? 20 : 40; // 20px on small screens

    return (
      <foreignObject
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
      >
        <img
          src={payload.emoji}
          width={size}
          height={size}
          style={{ borderRadius: "50%" }}
          alt=""
        />
      </foreignObject>
    );
  };

  const isMobileday = window.innerWidth <= 768; // You can adjust the breakpoint
  const fontSizeday = isMobileday ? 10 : 15;
  return (
    <DashboardFrame>
      <div className="w-full  h-full flex flex-col items-center lg:mt-0 md:mt-0 pt-[3vh]   lg:gap-[0%] md:gap-[0%] gap-[2vh] relative">
          {
            showEdit === true ?
             <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
              <EditNameTitle handleEditShow={handleEditShow} />
              </div>
              : ""
          } <Nav handleMobileNav={handleMobileNav} handleLogout={handleLogout} handleEditShow={handleEditShow} show={show}/>

        <div className="bg-yellow-50 lg:w-[90%] md:w-[90%] w-[95%] lg:h-[83%] mt-[2.5%] lg:pb-0 pb-[3vh] lg:mb-0 mb-[2vh] rounded-[5vh]">
          <div className="w-[90%] mx-auto lg:mt-[1.5vh] mt-[3vh]   p-2 flex items-center justify-center h-auto bg-black text-white rounded-full text-2xl font-semibold">
            <h1>Mood Tracker</h1>
          </div>
          <div className="grid lg:grid-cols-2  gap-4 xl:w-[97%]  mx-auto" >
            <div className="w-full h-full p-4 grid lg:grid-cols-2  md:grid-cols-2 lg:gap-4 gap-[4vh]">
              {/* today mood */}
              <Dashboard_component_frames>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-[5vh] w-full lg:h-[35vh] h-full shadow-md shadow-yellow-300   flex flex-col  ">
                  <div className="w-full h-[20%] bg-zinc-800 flex items-center justify-center rounded-t-[5vh]">
                    <h1 className="font-semibold capitalize text-yellow-400 text-center xl:text-xl lg:text-lg md:text-xl sm:text-lg text-lg">
                      {" "}
                      Your Today mood is -{" "}
                      <span className="xl:hidden    ">
                        {" "}
                        <br />
                      </span>{" "}
                      {mood}{" "}
                    </h1>
                  </div>
                  <div></div>
                  <div className="w-full h-[80%] aspect-square object-contain flex items-center justify-center  ">
                    {gifUrl ? (
                      <img
                        src={gifUrl}
                        alt={`${mood} gif`}
                        className=" w-full h-full  rounded-b-[5vh]"
                      />
                    ) : (
                      <p className="text-gray-500">
                        No GIF found for mood: {mood}
                      </p>
                    )}
                  </div>
                </div>
              </Dashboard_component_frames>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-[5vh] w-full lg:h-[35vh] h-full shadow-md shadow-yellow-300   flex flex-col  ">
                <div className="w-full h-[20%] bg-zinc-800 flex items-center justify-center rounded-t-[5vh]">
                  <h1 className="font-semibold capitalize text-center text-yellow-400 xl:text-xl lg:text-lg md:text-lg sm:text-lg text-lg">
                    {" "}
                    Your average mood is -{" "}
                    <span className="xl:hidden    ">
                      {" "}
                      <br />
                    </span>{" "}
                    {averageMood}
                  </h1>
                </div>
                <div></div>
                <div className="w-full h-[80%] aspect-square object-contain flex items-center justify-center  ">
                  {averageurl ? (
                    <img
                      src={averageurl}
                      alt={`${averageMood} gif`}
                      className=" w-full h-full  rounded-b-[5vh]"
                    />
                  ) : (
                    <p className="text-gray-500">
                      No GIF found for mood: {averageMood}
                    </p>
                  )}
                </div>
              </div>

              {/* weekly  mood */}
              <div className="lg:col-span-2 md:col-span-2 bg-black rounded-full w-full h-full">
                <div className="p-4    w-[90%] mx-auto h-full ">
                  <h2 className="lg:text-xl md:text-lg text-md font-bold text-center text-white mb-4">
                    Weekly Mood
                  </h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={weeklyData}
                      margin={{ top: 30, right: 20, bottom: 10, left: 20 }}
                    >
                      <XAxis dataKey="date" tick={{ fontSize: fontSizeday }} />
                      <YAxis domain={[1, 5]} hide />
                      <Tooltip
                        formatter={(value, name, props) => {
                          return [
                            Object.keys(moodMap).find(
                              (key) => moodMap[key].value === value
                            ),
                            "Mood",
                          ];
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="moodValue"
                        stroke="#facc15"
                        strokeWidth={3}
                        dot={renderCustomDot}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="w-full h-full  lg:px-4 md:px-4 px-2">
              <div className="w-full h-full  lg:mt-4 bg-yellow-100 rounded-[3vh] lg:p-4 md:p-4 p-2 shadow-md shadow-yellow-300">
                <h2 className="text-xl font-bold text-zinc-800 lg:mb-4 text-center">
                  Mood Discussion
                </h2>
                <div className="flex flex-col gap-2 h-full">
                  <div className="flex flex-col h-full  gap-4">
                    {loading ? (
                      <p className="text-yellow-500 font-semibold">
                        Thinking...
                      </p>
                    ) : (
                      <div className="lg:h-[45vh] h-[70vh] border-2 bg-white p-2 whitespace-pre-line  border-black rounded-[2vh]">
                        <p className="text-gray-800  w-full h-full  pb-10         overflow-y-auto  font-bold ">
                          {discussion}
                        </p>
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Ask a custom question..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="p-2 rounded-md border border-yellow-300 focus:outline-none"
                    />
                    <button
                      onClick={handleCustomPrompt}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
};

export default MoodTracker;
