import React, { useState } from 'react';
import { useTaskStore } from '../store/task';

const SearchDateTask = () => {
  const [date, setDate] = useState('');
  const { fetchTasksByDate } = useTaskStore();

  const handleSearch = () => {
      if (!date) return alert("Please select a date!");
    const selectedDate = new Date(date).toISOString().split("T")[0];
    fetchTasksByDate(selectedDate);
  };

  return (
    <div className=" flex ">
      <input
        type="date"
        className="border border-zinc-800 rounded-full px-3 py-2 mr-2 xl:text-lg lg:text-md  md:text-md text-xs"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        className='rounded-full flex gap-2 px-3 py-2 font-semibold xl:text-lg lg:text-md  md:text-md text-xs bg-zinc-900 text-white hover:bg-zinc-800   cursor-pointer shadow-lg shadow-gray-300 '
        onClick={handleSearch}
      >
         Search <span className="lg:flex md:flex hidden ">  By Date </span> 
      </button>
    </div>
  );
};

export default SearchDateTask;
