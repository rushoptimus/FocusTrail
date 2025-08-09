import React, { useState } from 'react'
import StartInputFrame from '../Components/StartInputFrame';
import good from "../MoodEmojis/good.svg";
import happy from "../MoodEmojis/happy.svg";
import angry from "../MoodEmojis/angry.svg";
import sad from "../MoodEmojis/sad.svg";
import cry from "../MoodEmojis/cry.svg";
import { useMoodStore } from '../store/mood';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const MoodPage = () => {
  
  const [Selectedmood, SetSelectedmood] = useState(null);
  const navigate = useNavigate();
  

  const moods = [
    { src: cry, label: "cry" },
    { src: sad, label: "sad" },
    { src: angry, label: "angry" },
    { src: good, label: "good" },
    { src: happy, label: "happy" },
  ]

  const {addMood, error} = useMoodStore();

  const handleMoodLogin = async (e) =>{
    e.preventDefault();
    if(!Selectedmood) return alert("Please select a mood! ");
    try{
        await addMood(Selectedmood);
        toast.success("Succesfully enterd mood ")
        navigate("/dashboard")
    }
    catch(error){
         console.error("Mood Login failed:", error);
            toast.error("Mood Login failed. Please try again.");
    }
  }
  
  

  return (
    <StartInputFrame>
      <div className='w-full h-full lg:p-4 md:p-4 p-1 flex flex-col items-center justify-center gap-4'>
        <h1 className='text-zinc-800 font-bold lg:text-4xl md:text-2xl sm:text-2xl text-xl text-center ' >How are you Felling Today ?</h1>
        <p className='text-zinc-800 font-semibold lg:text-xl md:text-lg sm:text-md text-sm text-center '>Click on the Mood Icon to log your mood Today</p>
        <form className='flex flex-col items-center justify-center gap-10 w-full ' onSubmit={handleMoodLogin} >
          <div className='flex  items-center  bg-white lg:w-[80%] mt-[3vh]  justify-center rounded-2xl shadow-lg'>
              
            
            {
              moods.map((mood, index) => {
                return (     
                  <button key={index}
                    type='button'
                    onClick={() => SetSelectedmood(mood.label) }
                    className={`cursor-pointer p-2 rounded-full ${ Selectedmood === mood.label ? 'ring-4 bg-black border-1 ring-yellow-300' : ''}`}
                  >
                    <img src={mood.src} className=" object-contain  rounded-full "></img>
                  </button>
                )

              })
            }
          
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className='w-[80%] lg:p-3 md:p-3 p-1 cursor-pointer text-white bg-black rounded-full lg:text-2xl md:text-xl text-md font-semibold shadow-lg' type='submit'> Submit</button>

        </form>
      </div>
    </StartInputFrame>
  )
}

export default MoodPage
