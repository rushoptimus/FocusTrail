import React, { useEffect } from 'react';
import { useMoodStore } from '../store/mood';

const Mood = () => {
    const {latestMood, fetchTodayMood, error } = useMoodStore();

  useEffect(() => {
    fetchTodayMood(); // Fetch today's mood on component mount
  }, [])

  const mood = latestMood?.mood; // Replace with the actual mood you want to display
  const moodLibrary = {
  happy: [
    "https://media3.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif",
    "https://media3.giphy.com/media/26DMWzCZePgXpp1FC/giphy.gif",
    "https://media2.giphy.com/media/tFSqMSMnzPRTAdvKyr/giphy.gif",
    "https://media3.giphy.com/media/3o7WIHsSrmSmbfdwIM/giphy.gif",
    "https://media2.giphy.com/media/zzALYeLqMLDa6PEV2C/giphy.gif",
    "https://media4.giphy.com/media/xThta9uXEf59s5hHhK/giphy.gif"
  ],
  good: [
    "https://media1.giphy.com/media/KiZ6kV683kPaU/giphy.gif",
    "https://media3.giphy.com/media/l1KcRlWUukdNjCTsY/giphy.gif",
    "https://media1.giphy.com/media/HFZwjdm5cNF3a/giphy.gif",
    "https://media4.giphy.com/media/vRJWP6d7s4pPelQWK2/giphy.gif"
  ],
  cry: [
    "https://media0.giphy.com/media/SsjyaYH2gkNCE/giphy.gif",
    "https://media1.giphy.com/media/26DMVZDzkwGHtrI9a/giphy.gif",
    "https://media.giphy.com/media/McNHek8WfyEA8/giphy.gif"
  ],
  angry: [
    "https://media.giphy.com/media/3DnDRfZe2ubQc/giphy.gif",
    "https://media.giphy.com/media/q1mHcB8wOCWf6/giphy.gif",
    "https://media2.giphy.com/media/xUOwGnn5zcQjsVfvlm/giphy.gif",
    "https://media.giphy.com/media/Ofo2Z3DnjvAHa4WJOf/giphy.gif",
    "https://media4.giphy.com/media/xUOxflHRiTT2AXkd9e/giphy.gif"
  ],
  sad: [
    "https://media.giphy.com/media/3ulvQTCmW3MhzpyIsJ/giphy.gif",
    "https://media.giphy.com/media/x0kZJ8jRGzVoVsjJ9v/giphy.gif",
    "https://media.giphy.com/media/3o85xGr7NxBC4eGTte/giphy.gif",
    "https://media4.giphy.com/media/BN6PYZEEfjGQnYxnD9/giphy.gif",
    "https://media.giphy.com/media/RfxLp4KX4KA6c/giphy.gif",
    "https://media3.giphy.com/media/l0NgQgn90NTKDu6Ri/giphy.gif",
    "https://media1.giphy.com/media/3ohs4mw9it1lRnnUGs/giphy.gif"
  ]
};


  function getRandomGifByMood(mood) {
     if (!mood) return null; 
     
  const gifs = moodLibrary[mood.toLowerCase()];
  if (!gifs || gifs.length === 0) return null;
  const index = Math.floor(Math.random() * gifs.length);
  return gifs[index];
}

 const gifUrl = getRandomGifByMood(mood);
if (!latestMood && !error) return <p>Loading your mood...</p>;
if (error) return <p className="text-red-500">Error: {error}</p>;

 return (
    <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-[5vh] w-full lg:h-[35vh] h-full shadow-md shadow-yellow-300   flex flex-col  '>
    <div className='w-full h-[20%] bg-zinc-800 flex items-center justify-center rounded-t-[5vh]'>
            <h1 className='font-semibold capitalize text-yellow-400 lg:text-xl md:text-xl sm:text-lg text-lg'> Your mood is - {mood} </h1>
    </div>
        <div></div>
          <div className="w-full h-[80%] aspect-square object-contain flex items-center justify-center  ">
      {gifUrl ? (
        <img src={gifUrl} alt={`${mood} gif`} className=" w-full h-full  rounded-b-[5vh]" />
      ) : (
        <p className="text-gray-500">No GIF found for mood: {mood}</p>
      )}
    </div>
    </div>
  )
}

export default Mood
