import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useEventStore } from '../store/eventStore';

const AddEvent = ({ setAddPopUp }) => {
  const { addEvent } = useEventStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, SetDate] = useState('');

  const HandleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const combinedStartTime = new Date(`${date}T${startTime}`);
      const combinedEndTime = new Date(`${date}T${endTime}`);
      const eventDate = new Date(date); // sets time to 00:00:00Z

      await addEvent({
        title,
        description,
        startTime: combinedStartTime,
        endTime: combinedEndTime,
        date: eventDate,
      });
      console.log(combinedStartTime);
      console.log(combinedEndTime);

      toast.success("Event Added");
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      SetDate("");

    } catch (error) {
      console.error("Error adding event:", error.message);
      toast.error("Failed to add Event");
    }
  };

  return (
    <form
      onSubmit={HandleAddEvent}
      className="bg-[#feefdf] px-4 py-8   rounded-[5vh] shadow-sm lg:w-[70%] md:w-[80%] sm:w-[90%] w-[98%]   
             flex flex-col items-center justify-center gap-10">
     

               <div className='flex items-end justify-end w-[90%]   '>
                <div className='flex items-center justify-between w-full  '>
                    <h3 className="font-bold lg:text-2xl md:text-xl sm:text-xl text-lg bg-black text-white px-4 py-1 rounded-full   ">Add New Event</h3>
                    <button className='rounded-full bg-black text-white shadow-md shadow-gray-200 w-8 h-8 p-2 cursor-pointer
                     text-xl flex items-center justify-center'  onClick={setAddPopUp}  > x </button>
                </div>
            </div>
     
 
    


      <label className="w-full flex items-center justify-center h-full gap-4">
        <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '>Event Name:</span>
        <input
          type="text"
          placeholder="Event Title"
   className="p-2 border rounded w-[70%]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '>Description:</span>
        <textarea
          placeholder="Optional description"
   className="p-2 border rounded w-[70%]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '>Date :</span>
        <input
          type="date"
   className="p-2 border rounded w-[70%]"
          value={date}
          onChange={(e) => SetDate(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '>Start Time:</span>
        <input
          type="time"
   className="p-2 border rounded w-[70%]"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label className="w-full flex items-center justify-center gap-4">
        <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '>End Time:</span>
        <input
          type="time"
   className="p-2 border rounded w-[70%]"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

  <button type="submit" className="bg-zinc-900 w-[50%] cursor-pointer lg:text-xl  md:text-lg sm:text-md text-sm text-white py-2 rounded-full shadow-lg shadow-gray-400  hover:bg-zinc-700">
                + Add Event
            </button>

    </form>
  );
};

export default AddEvent

