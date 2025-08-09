import React, { useEffect, useState } from 'react';
import { useEventStore } from "../store/eventStore" // your zustand store
import { PenLine } from 'lucide-react';
import { Trash } from 'lucide-react';

const EventsMap = ({ editingEvent, setEditingEvent }) => {
  const { events, fetchAllEvents, error, deleteEvent } = useEventStore();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const groupedEvents = (events || []).reduce((acc, event) => {
    const dateKey = new Date(event.date).toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      await deleteEvent(id);
      fetchAllEvents(); // Refresh the list
    }
  };



  const pendingGroups = {};
  const completedEvents = [];

  (events || []).forEach(event => {
    if (event.status === "Completed") {
      completedEvents.push(event);
    } else {
      const dateKey = new Date(event.date).toISOString().split('T')[0];
      if (!pendingGroups[dateKey]) {
        pendingGroups[dateKey] = [];
      }
      pendingGroups[dateKey].push(event);
    }
  });

  // Sort pending date keys
  const sortedPendingDates = Object.keys(pendingGroups).sort((a, b) => new Date(a) - new Date(b));

  // Sort events within each pending group by startTime
  sortedPendingDates.forEach(date => {
    pendingGroups[date].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  });

  // Sort completed events by date + startTime
  completedEvents.sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return new Date(b.startTime) - new Date(a.startTime);
  });

  return (
    <div className="w-full lg:px-8  md:px-4  relative">
      {error && <p className="text-red-500">{error}</p>}

      {/* Pending events grouped by date */}
      {sortedPendingDates.map(date => (
        <div key={date} className="flex flex-col gap-8  mb-8 w-full ">
          <div className='flex flex-col gap-4'>

            <h2 className="lg:text-2xl md:text-lg text-md    rounded-[1vh] py-2
                             px-4 gap-4  bg-zinc-800 text-white  shadow-lg shadow-gray-300 flex items-center  font-bold   ">
              <div className='lg:w-3 lg:h-3 w-2 h-2 rounded-full bg-white'></div>Upcoming Events</h2>
          </div>
  



          <div className="space-y-2 pl-4">
            {pendingGroups[date].map(event => (
              <div
                key={event._id}
                className={`p-4 lg:rounded-full rounded-[5vh] shadow-md  capitalize flex lg:flex-row flex-col lg:gap-0 gap-4 justify-between items-center bg-zinc-900 text-white `}
              >

                <div className='flex flex-col  ml-2 gap-2 lg:w-[70%] md:w-[90%] w-[95%]'>
                  <div className='flex items-center  gap-2'>
                  <div className={`w-2 h-2  rounded-full ${event.status === "Completed" ? " bg-gray-400" : "bg-green-300"}`}></div>

                  <h3 className="font-bold lg:text-lg md:text-md text-md">  {event.title}</h3>
                  </div>
                  {event.description && <p className="lg:text-md md:text-sm text-sm text-white font-semibold ml-3">Description : {event.description}</p>}
                       
                       
                       
                       <div className={`py-2 px-4 rounded-full flex lg:flex-row flex-col gap-2  font-bold lg:text-md md:text-sm text-xs text-black  ${event.status === "Completed" ?" bg-gray-400" : "bg-green-300"}`}>
                    <p className=''>Date : {new Date(date).toDateString()} </p>
                        <span className=' lg:flex hidden'> | </span>
                  <p className={`  `}>   Time: {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
           
                </div>

                <div className={`flex items-center gap-3 `}>

                  <button
                    onClick={() => setEditingEvent(event)}
                    className="lg:text-sm md:text-sm text-xs px-3 py-2 bg-white  flex gap-2 items-center rounded-full text-zinc-800"
                  >
                    <PenLine lg:size={15} size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="lg:text-sm md:text-sm text-xs px-3 py-2 bg-red-500  flex gap-2  items-center rounded-full text-white"
                  ><Trash lg:size={15} size={13} />
                    Delete
                  </button>
                </div>


              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Completed section */}
      {completedEvents.length > 0 && (
        <div className="mt-6 ">
          
          <div className='flex flex-col gap-4'>

            <h2 className="lg:text-2xl md:text-lg text-md    rounded-[1vh] py-2
                             px-4 gap-4  bg-zinc-800 text-white  shadow-lg shadow-gray-300 flex items-center  font-bold   ">
              <div className='lg:w-3 lg:h-3 w-2 h-2 rounded-full bg-white'></div>Past Events</h2>
          </div>
          <div className="space-y-2 lg:pl-4 mb-6 mt-4">
            {completedEvents.map(event => (
              <div
                key={event._id}
            className={`p-4 lg:rounded-full rounded-[5vh] shadow-md  capitalize flex lg:flex-row flex-col lg:gap-0 gap-4 justify-between items-center   ${event.status === "Completed" ? " bg-zinc-500 text-zinc-300" : "bg-green-300"} `}
              >


              <div className='flex flex-col  ml-2 gap-2 lg:w-[70%] md:w-[90%] w-[95%]'>

                  <h3 className="font-bold lg:text-lg md:text-md text-md flex items-center gap-2">
                    <div className='w-2 h-2 bg-zinc-800 rounded-full'></div>
                        {event.title}</h3>
                  {event.description && <p className="lg:text-md md:text-sm text-sm text-white font-semibold ml-3 ">
                    Description: {event.description}</p>}
                 
                          <div className={`py-2 px-4 rounded-full flex lg:flex-row flex-col gap-2  font-bold lg:text-md md:text-sm text-xs text-zinc-200  ${event.status === "Completed" ?" bg-gray-400" : "bg-green-300"}`}>
                    <p className=''>   Date: {new Date(event.date).toDateString()} </p>
                    <span className=' lg:flex hidden'> | </span>
                    
                  <p className={`  `}>   Time: {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
          
                </div>
             


                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="lg:text-sm md:text-sm text-xs px-3 py-2 bg-white  flex gap-2 items-center rounded-full text-zinc-800"
                  >
                    <PenLine lg:size={15} size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="lg:text-sm md:text-sm text-xs px-3 py-2 bg-red-500  flex gap-2  items-center rounded-full text-white"
                  ><Trash lg:size={15} size={13} />
                    Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default EventsMap;
