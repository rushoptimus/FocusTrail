import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import DashboardFrame from "../Components/DashboardFrame"
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Nav from '../Components/Nav';
import { useMoodStore } from '../store/mood';
import { useTaskStore } from '../store/task';
import { useClockStore } from '../store/Clock';
import Profile from '../Components/Profile';
import Dashboard_component_frames from '../Components/Dashboard_component_frames';

const Insights = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState( new Date().toISOString().split("T")[0]);
    const { user, logout } = useAuthStore();
    const { fetchDateMood, todayMood } = useMoodStore();
    const { fetchTasksByDate, tasks } = useTaskStore();
    const { fetchDateSessions, sessions } = useClockStore();

    useEffect(() => {
        fetchDateMood(date)
        fetchTasksByDate(date);
        fetchDateSessions(date);
    }, []);

    const handleSearch = () => {
        if (!date) return alert("Please select a date!");
        const selectedDate = new Date(date).toISOString().split("T")[0];
        setDate(selectedDate)
        fetchTasksByDate(date);
        fetchDateMood(date)
        fetchDateSessions(date);
    };

    // Utility
    const calculateDurations = (sessions = []) => {
        let totalWork = 0;
        let totalBreak = 0;
        sessions.forEach(session => {
            const duration = new Date(session.endTime) - new Date(session.startTime);
            if (session.mode === "work") totalWork += duration;
            if (session.mode === "break") totalBreak += duration;
        });

        return {
            workTime: (totalWork / (1000 * 60)).toFixed(1),
            breakTime: (totalBreak / (1000 * 60)).toFixed(1),
        };
    };


    const { workTime, breakTime } = calculateDurations(sessions);


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

const handleDownloadReport = () => {
  const doc = new jsPDF();

  // --- HEADER ---
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Daily Focus Report", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${dayjs(date).format("DD MMM YYYY")}`, 14, 25);
  doc.text(`User: ${user.name} (${user.Title || "No Title"})`, 14, 32);

  let yPos = 40;

  // --- TASKS SECTION ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Tasks Completed", 14, yPos);

  const completedTasks = tasks
    .filter(t => t.status === "Completed")
    .map((t, i) => [i + 1, t.title]);

  if (completedTasks.length > 0) {
    autoTable(doc, {
      head: [["#", "Task Title"]],
      body: completedTasks,
      startY: yPos + 5,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 11 },
    });
  } else {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("No completed tasks found.", 14, yPos + 8);
  }

  yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : yPos + 15;

  // --- CLOCK SUMMARY ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Clock Summary", 14, yPos);

  autoTable(doc, {
    body: [
      ["Total Work Time (mins)", workTime],
      ["Total Break Time (mins)", breakTime],
    ],
    startY: yPos + 5,
    theme: "striped",
    styles: { fontSize: 11 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // --- MOODS SECTION ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Moods Summary", 14, yPos);

  if (todayMood?.moods?.length > 0) {
    autoTable(doc, {
      head: [["#", "Mood", "Time"]],
      body: todayMood.moods.map((m, i) => [
        i + 1,
        m.mood,
        dayjs(m.time, "HH:mm").format("hh:mm A"),
      ]),
      startY: yPos + 5,
      theme: "striped",
      headStyles: { fillColor: [46, 204, 113] },
      styles: { fontSize: 11 },
    });
  } else {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("No mood logs found.", 14, yPos + 8);
  }

  // --- FOOTER ---
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`Generated on ${dayjs().format("DD MMM YYYY HH:mm")}`, 14, 290);

  // SAVE
  doc.save(`Daily_Report_${date}.pdf`);
};


    return (
        <>
            <DashboardFrame>
                <div className="w-full lg:h-screen min-h-full  flex flex-col gap-[2vh]  items-center  relative">
                    <div className="lg:mt-0 md:mt-0 mt-[2vh] w-full  flex items-center justify-center">
                        <Nav handleLogout={handleLogout} />
                    </div>
                    {/*  */}
                    <div className=" flex bg-yellow-50 mx-auto w-[90%]  rounded-full  p-2  items-center justify-end  gap-4">
                        <button
                                className='rounded-full flex gap-2 px-3 py-2 font-semibold xl:text-lg lg:text-md  md:text-md text-xs bg-zinc-900 text-white hover:bg-zinc-800   cursor-pointer shadow-lg shadow-gray-300 '
                                onClick={handleDownloadReport}
                            >
                                Download Report
                            </button>
                            <input
                                type="date"
                                className="border border-zinc-800 rounded-full px-3 py-2  xl:text-lg lg:text-md  md:text-md text-xs"
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

                    <div className="bg-yellow-50 mx-auto lg:w-[90%] md:w-[90%] w-[95%] lg:h-[78%]  lg:pb-0 pb-[3vh] lg:mb-0 mb-[2vh] rounded-[5vh]">
                        

                        <div className=' grid lg:grid-cols-2 gap-8 w-full h-full p-4  '>

                            <div><Profile name={user.name} userTitle={user.Title} image={user.image} /></div>

                            <Dashboard_component_frames >
                                <div className='w-full h-full bg-white flex flex-col items-center justify-start p-4'>

                                    <h3 className="text-lg font-bold text-center mb-2 w-full ">  Tasks Completed </h3>
                                    <div className='w-full h-1 rounded-full bg-black'></div>

                                    <ul className="space-y-2 pt-2 mt-2 w-full h-full overflow-y-auto ">
                                        {tasks?.filter(t => t.status === "Completed").length > 0 ? (
                                            tasks.filter(t => t.status === "Completed").map((task, index) => (
                                                <li key={task._id} className="bg-yellow-300 text-black  p-2 rounded-[5vh]">
                                                    <span className="font-semibold lg:text-lg sm:text-md text-sm  capitalize ml-2"> {index + 1}. ) {task.title}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No completed tasks found for this date.</li>
                                        )}

                                    </ul>
                                </div>

                            </Dashboard_component_frames >

                            {/*  */}

                            <Dashboard_component_frames >
                                <div className='w-full h-full bg-white flex flex-col items-center justify-start p-4'>
                                    <h3 className="text-lg font-bold text-center mb-2 w-full capitalize ">  Clock Summary </h3>
                                    <div className='w-full h-1 rounded-full bg-black'></div>
                                    <ul className="space-y-2 w-full  flex flex-col items-center justify-center lg:text-lg sm:text-md text-sm lg:h-[50%] mt-2 pt-2 ">
                                        <p className="bg-yellow-300 w-full text-black font-semibold  p-2 rounded-[5vh]"> Total Work Time:  <b className='ml-6'>{workTime} mins</b></p>
                                        <p className="bg-yellow-300 w-full text-black font-semibold p-2 rounded-[5vh]"> Total Break Time:  <b className='ml-6'>{breakTime} mins</b></p>

                                    </ul>
                                </div>

                            </Dashboard_component_frames >


                            <Dashboard_component_frames >
                                <div className='w-full h-full bg-white flex flex-col items-center justify-start p-4'>
                                    <h3 className="text-lg font-bold text-center mb-2 w-full capitalize ">  Moods Summary </h3>
                                    <div className='w-full h-1 rounded-full bg-black'></div>

                                    <ul className="space-y-2 w-full  flex flex-col items-center overflow-y-auto justify-start mt-2 pt-2 h-full ">
                                        {todayMood?.moods?.length > 0 ? (
                                            todayMood.moods.map((mood, idx) => (
                                                <li key={idx} className="bg-yellow-300 lg:text-lg sm:text-md text-sm w-full flex items-center justify-between capitalize px-[5%] text-black font-semibold  p-2 rounded-[5vh]">
                                                   <span>{idx + 1}. )  {mood.mood} </span> <span> {dayjs(mood.time, "HH:mm").format("hh:mm A")} </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No mood logs</li>
                                        )}
                                    </ul>

                                </div>

                            </Dashboard_component_frames >



                        </div>
                    </div>

                    {/*  */}







                </div>
            </DashboardFrame>
        </>
    )
}

export default Insights
