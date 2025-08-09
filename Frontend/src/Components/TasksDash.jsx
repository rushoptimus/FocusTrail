import React, { useState } from "react";
import { useTaskStore } from "../store/task";
import { useEffect } from "react";

const TasksDash = () => {
  const { tasks, fetchTasksByDate, updateTask } = useTaskStore();
  useEffect(() => {
    const selectedDate = new Date().toISOString().split("T")[0];
    fetchTasksByDate(selectedDate);
  }, []);
  const totalTasks = tasks.length;
  const completed = tasks.filter(task => task.status === "Completed").length;
  const inProgress = totalTasks - completed;

  const completionPercent = Math.round((completed / totalTasks) * 100);
  const completedPercent = Math.round((completed / totalTasks) * 100);
  const inProgressPercent = Math.round((inProgress / totalTasks) * 100);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleMarkDone = async () => {
    for (let id of selectedTasks) {
      await updateTask(id, { status: "Completed" });
    }
    setSelectedTasks([]);
    window.location.reload();
  }

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Status: Pending first
    if (a.status !== b.status) {
      return a.status === "Pending" ? -1 : 1;
    }

    // CreatedAt: Newest first
    const aCreated = new Date(a.createdAt);
    const bCreated = new Date(b.createdAt);
    if (aCreated > bCreated) return -1;
    if (aCreated < bCreated) return 1;

    // Priority: High > Medium > Low
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });
  


  return (
    <div className="shadow-md shadow-yellow-300 w-full lg:h-full md:h-full h-[85vh] flex flex-col justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 items-center rounded-[5vh]">
      <div className="h-[30%] w-[90%] flex flex-col items-center justify-start pt-[5%]">
        {/* 1st one  */}
        <div className="flex  items-center justify-between w-full ">
          <h1 className="xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl text-lg font-semibold capitalize">Onboarding</h1>
          <p className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold">{completionPercent}%</p>
        </div>
        {/* 2 one */}

        {/* Percent Labels */}
        <div className="w-[100%]  flex items-center justify-between text-sm font-semibold text-gray-600 mt-4">
          <div
            style={{
              width: `${completedPercent}%`,
              height: "32px",
              minWidth: "80px",
            }}
          >
            <p className="pl-2">{completedPercent}%</p>
          </div>
          <span className="h-full rounded-full bg-gray-400 w-[2px]"></span>

          <div
            style={{
              width: `${inProgressPercent}%`,
              height: "32px",
              minWidth: "80px",
            }}
          >
            <p className="pl-2">{inProgressPercent}%</p>
          </div>
        </div>

        {/* 3rd one  */}
        <div className="flex w-full ">
          <div
            className=" rounded-full text-sm text-black font-medium flex items-center justify-center"
            style={{
              width: `${completedPercent}%`,
              backgroundColor: "#FACC15",
              height: "32px",
              minWidth: "80px",
            }}
          >
            completed
          </div>
          <span className=" h-full rounded-full bg-gray-400 w-[2px]"></span>
          {/* In Progress */}
          <div
            className=" rounded-full text-white flex items-center justify-center"
            style={{
              width: `${inProgressPercent}%`,
              backgroundColor: "#1f1f1f",
              height: "32px",
              minWidth: "80px",
            }}
          >
            pending
            {/* No label inside */}
          </div>
        </div>
      </div>

      <div className="h-[67%] w-full flex items-center justify-center  relative">
        <div className="bg-zinc-400 w-[80%] mb-12 h-full  p-4 rounded-[5vh] relative "></div>
        <div className="bg-zinc-900 w-[90%] h-full  p-4 rounded-[5vh] absolute  ">
          <div className="flex  items-center justify-between w-full px-2 lg:text-3xl md:text-3xl sm:text-xl text-xl text-white pt-[5%]">
            <h1 className=" font-semibold capitalize">Tasks</h1>
            <p className=" lg:text-3xl md:text-3xl sm:text-xl text-xl font-medium">
              {completed} <span>/</span> {totalTasks}
            </p>
          </div>
          {/* line */}
          <div className="h-0.5 mt-2 w-full bg-white rounded-full"></div>

          {/* Task List */}

          <div className="flex flex-col  gap-4 mt-4 overflow-y-auto h-[70%] scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-transparent">


            {sortedTasks.map((task, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full h-auto  gap-8 px-[1%] items-center justify-center "
                >
                  <div className="flex w-full items-center gap-4">
                    <div
                      className={`rounded-full w-[4vh] h-[4vh] lg:text-md md:text-md text-sm flex items-center justify-center font-bold ${task.status.toLowerCase() === "completed"
                        ? "bg-zinc-700"
                        : "bg-zinc-200"
                        } `}
                    >
                      {index + 1}
                    </div>

                    <div className="flex flex-col w-[80%] break-normal gap-1 text-sm capitalize">
                      <p
                        className={`${task.status.toLowerCase() === "completed"
                          ? "text-zinc-700"
                          : "text-white"
                          } font-semibold word-break  lg:text-md md:text-md text-sm `}
                      >
                        {task.title}
                      </p>
                      <p
                        className={`${task.status.toLowerCase() === "completed"
                          ? "text-zinc-400"
                          : "text-zinc-300"
                          } font-semibold xl:md lg:text-xs md:text-md text-sm `}
                      >

                        {new Date(task.createdAt).toLocaleDateString()}{" "}
                        {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                      </p>
                    </div>
                  </div>

                  <div className="">
                    <label
                      className={`relative inline-block ${task.status.toLowerCase() === "completed" ? "opacity-60" : ""}`}
                    >
                      <input
                        type="checkbox"
                        disabled={task.status.toLowerCase() === "completed"} // disable if completed
                        onChange={() => {
                          if (selectedTasks.includes(task._id)) {
                            setSelectedTasks(prev => prev.filter(id => id !== task._id));
                          } else {
                            setSelectedTasks(prev => [...prev, task._id]);
                          }
                        }}
                        className={`
      w-6 h-6 rounded-full
      appearance-none border-2
      checked:border-transparent
      transition-all duration-500 ease-in-out
      peer 
      ${task.status.toLowerCase() === "completed"
                            ? "checked:bg-zinc-800 border-gray-600 "
                            : "checked:bg-yellow-400 border-gray-400 cursor-pointer"
                          }
    `}
                      />
                      <svg
                        className={`
      w-4 h-4 text-zinc-600 
      absolute top-1 left-1
      opacity-0 scale-75 
      peer-checked:opacity-100 peer-checked:scale-100
      transition-all duration-500 ease-in-out
      pointer-events-none
      ${task.status.toLowerCase() === "completed"
                            ? " opacity-100 scale-100 text-white"
                            : "peer-checked:opacity-100 peer-checked:scale-100 opacity-0 scale-75 text-zinc-800"
                          }
      `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedTasks.length > 0 && (
            <div className="w-full flex items-end justify-end ">
              <button onClick={handleMarkDone} className="bg-yellow-400  rounded-full px-2 py-1 m-2 cursor-pointer font-bold  ">
                Mark Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksDash;
