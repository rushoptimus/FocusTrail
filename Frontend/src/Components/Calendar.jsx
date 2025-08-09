import React from 'react'
import { useEffect } from 'react';
import { useEventStore } from "../store/eventStore";

const Calendar = () => {
  const { events, fetchAllEvents } = useEventStore();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Monday

    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
      });
    }

    return week;
  };

  const week = getCurrentWeekDates();

  const today = new Date();
  const currentMonth = today.toLocaleString("en-US", { month: "long" }); // "July"
  const currentYear = today.getFullYear(); // 2025

  const previousDay = new Date(today.getFullYear(), today.getMonth() - 1);
  const previousMonth = previousDay.toLocaleString("en-US", { month: "long" }); // "June"
  const previousYear = previousDay.getFullYear(); // 2025

  const nextDate = new Date(today.getFullYear(), today.getMonth() + 1);
  const nextMonth = today.toLocaleString("en-US", { month: "long" }); // "August"
  const nextYear = nextDate.getFullYear(); // 2025

  const todayDateString = new Date().toISOString().split("T")[0];
  // events.js



  const now = new Date();
  const currentHour = now.getHours();


  const timeSlots = Array.from({ length: 4 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const timeDate = new Date();
    timeDate.setHours(hour, 0, 0); // hour:00
    return timeDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  });

  useEffect(() => {
    console.log("Fetched events:", events);
  }, [events]);

  const getEvent = (date, time) => {
    const [hourStr, minuteStr, period] = time.split(/:| /); // "1:00 PM" => ["1", "00", "PM"]
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const isPM = period === "PM";

    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotStart.getHours() + 1); // 1 hour window

    return events.find((event) => {
        if (event.status === "Completed") return false;
      const eventStart = new Date(event.startTime);
      return eventStart >= slotStart && eventStart < slotEnd;
    });
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-zinc-400 rounded-[5vh]  w-full lg:h-[35vh] pt-[1.5%]   flex flex-col shadow-md shadow-yellow-300">
      {/* Top - Month and Nav Arrows */}
      <div className='bg-zinc-900 text-white   font-semibold flex flex-col h-full w-full rounded-[5vh] lg:pt-4 lg:px-2  p-2  '>
        <div className="flex lg:justify-between md:justify-between  justify-around items-center lg:text-lg md:text-md sm:text-sm text-xs  mb-2 lg:px-8 md:px-6 px-6">
          <span className=" lg:hidden md:hidden font-semibold border-1 border-white rounded-full px-4 py-1">Events</span>
          
          <span className=" lg:flex md:flex hidden font-semibold">{previousMonth} {currentYear}</span>

          <span className=" font-semibold">{currentMonth} {currentYear}</span>
          <span className=" lg:flex md:flex hidden font-semibold">{nextMonth} {currentYear}</span>
          {/* (optional) arrow buttons for prev/next week */}
        </div>

        <div className=' flex flex-col p-2 h-full w-full rounded-[5vh]  '>
          {/* Weekdays */}{/* Weekdays - full week (md and up) */}
<div className="hidden md:grid grid-cols-8 text-center lg:text-sm md:text-sm text-xs text-white ">
  <div></div> {/* Empty top-left corner */}
  {week.map((dayObj) => (
    <div key={dayObj.fullDate}>
      <div>{dayObj.date} <span className='ml-1'>- {dayObj.day}</span></div>
    </div>
  ))}
</div>

{/* Weekdays - single day (sm only) */}
<div className="grid md:hidden grid-cols-3 text-center text-xs text-white mb-2">
  <div></div>
  <div className='col-span-2'>{today.getDate()} <span className='ml-1'>- {today.toLocaleDateString("en-US", { weekday: "short" })}</span></div>
</div>


          {/* Time Rows */}
       <div className="hidden md:grid grid-cols-8 gap-2 mt-4 lg:text-sm md:text-sm text-xs">
            {timeSlots.map((time) => (
              <>
                {/* Time Label */}
                  <div className="text-center pr-2 text-white flex items-center justify-center">{time}</div>
    

                {/* Event slots per day */}
                {week.map((dayObj) => {
                  const event = getEvent(dayObj.fullDate, time);
                  return (
                    <div key={dayObj.fullDate + time} className="relative h-11 border border-zinc-600 rounded-xl flex items-center justify-center">
                      {event && (
                        <div className={`absolute px-2 h-full w-full rounded-xl group flex items-center gap-2 text-xs   bg-yellow-400 text-black ${event.color}`}>
                          <div className='relative w-full h-full flex items-center justify-center '>
                            <div className="font-bold relative  truncate max-w-full text-md  capitalize" >{event.title} </div>
                            {(event.description).length === 0 ?

                              <div className="w-max font-bold text-xs hidden group-hover:block absolute top-8 left-1/2 transform -translate-x-1 border-1 bg-white text-black z-20 p-2 rounded-xl shadow-lg whitespace-pre-wrap text-left">
                                <div><strong>Title:</strong> {event.title}</div>
                                <div><strong>Start:</strong> {formatTime(event.startTime)}</div>
                                <div><strong>End:</strong> {formatTime(event.endTime)}</div>
                              </div>

                              :
                              <div className="w-max font-bold text-xs hidden group-hover:block absolute top-8 left-1 transform -translate-x-1 border-1 bg-white text-black z-20 p-2 rounded-xl shadow-lg whitespace-pre-wrap text-left">
                                <div><strong>Title:</strong> {event.title}</div>
                                <div><strong>Start:</strong> {formatTime(event.startTime)}</div>
                                <div><strong>End:</strong> {formatTime(event.endTime)}</div>
                                {event.description && <div><strong>Note:</strong> {event.description}</div>}
                              </div>
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    
                  );
                })}
                
              </>

            ))}
          </div>
          <div className="grid md:hidden grid-cols-3 gap-2 mt-4 text-xs">
  {timeSlots.map((time, i) => (
    <React.Fragment key={i}>
      <div className="text-center pr-2 text-white flex items-center justify-center">{time}</div>
      <div className="relative h-11 border border-zinc-600 col-span-2 rounded-xl flex items-center justify-center">
        {(() => {
          const event = getEvent(todayDateString, time);
          if (!event) return null;
          return (
            <div className={`absolute px-2 h-full w-full rounded-xl group flex items-center gap-2 text-xs bg-yellow-400 text-black ${event.color}`}>
              <div className='relative w-full h-full flex items-center justify-center'>
                <div className="font-bold truncate max-w-full text-md capitalize">{event.title}</div>
                <div className="w-max font-bold text-xs hidden group-hover:block absolute top-8 left-1/2 transform -translate-x-1 border-1 bg-white text-black z-20 p-2 rounded-xl shadow-lg whitespace-pre-wrap text-left">
                  <div><strong>Title:</strong> {event.title}</div>
                  <div><strong>Start:</strong> {formatTime(event.startTime)}</div>
                  <div><strong>End:</strong> {formatTime(event.endTime)}</div>
                  {event.description && <div><strong>Note:</strong> {event.description}</div>}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </React.Fragment>
  ))}
</div>
        </div>
      </div>
    </div>

  )
}

export default Calendar
