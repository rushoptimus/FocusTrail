import React, { useEffect, useState } from 'react'
import { useTaskStore } from '../store/task'
import UpdateTask from '../Components/UpdateTask';
import { PenLine } from 'lucide-react';
import { Trash } from 'lucide-react';
const getTaskColor = (task) => {
  if (task.status === 'Completed') return 'bg-gray-400'; // Color for completed tasks
  const priorityColors = {
    High: 'bg-red-300 text-zinc-900',
    Medium: 'bg-yellow-300 text-zinc-900',
    Low: 'bg-green-300 text-zinc-900',
  };
  return priorityColors[task.priority] || 'bg-white text-zinc-900';
};

const pendComp = (task) => {
  if (task.status === 'Completed') return 'bg-zinc-500 text-zinc-300';
  if (task.status === 'Pending') return 'bg-zinc-900 text-white';
}

const TaskMapAll = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks, fetchAllTasks, error, deleteTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const groupedTasks = (tasks || []).reduce((acc, task) => {
    const dateKey = new Date(task.date).toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      await deleteTask(id);
      fetchAllTasks(); // Refresh the task list after deletion
    }
  };


  return (
    <div className="w-full   lg:p-8 md:p-8 p-2 ">
      {error && <p className="text-red-500">{error}</p>}

      {editingTask && (
        <UpdateTask
          setEditingTask={setEditingTask}
          selectedDate={selectedDate}
          taskToEdit={editingTask}
          onFinish={() => {
            setEditingTask(null); // close form
            fetchAllTasks(); // refresh list
          }}
        />
      )}

      {Object.entries(groupedTasks).map(([date, tasksForDate]) => (
        <div key={date} className="flex flex-col lg:gap-8 md:gap-8 gap-4  mb-8 w-full ">
          <div>

            <h2 className="xl:text-2xl lg:text-xl  md:text-lg text-sm mt-2    rounded-[1vh] py-2
                             px-4 gap-4   bg-zinc-800 text-white  shadow-lg shadow-gray-300 flex items-center  font-bold   ">
              <div className='lg:w-3 lg:h-3 md:w-3 md:h-3 w-2 h-2  rounded-full bg-white'></div>

              {new Date(date).toDateString()}</h2>
          </div>


          <div className="space-y-2   ">
            {tasksForDate
              .sort((a, b) => {
                const statusOrder = { Pending: 1, Completed: 2 };
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                if (statusOrder[a.status] !== statusOrder[b.status]) {
                  return statusOrder[a.status] - statusOrder[b.status];
                }
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-[5vh]  shadow-md text-black capitalize flex lg:flex-row flex-col lg:gap-0 gap-4 justify-between items-center ${pendComp(task)} `}>
                  <div>
                    <h3 className="font-bold xl:text-lg lg:text-lg  md:text-lg sm:text-md lg:mb-0 md:mb-0 mb-2 text-xs flex items-center gap-2 ">   
                       <div className={` w-2 h-2 lg:flex md:flex hidden rounded-full ${getTaskColor(task)} `}></div>{task.title}</h3>
                    {task.remark && <p className={`xl:text-lg lg:text-md  md:text-md text-xs font-bold px-6 py-2 lg:rounded-full md:rounded-full rounded-[5vh] lg:w-[70%] md:w-[90%] w-[100%] lg:ml-10 md:ml-10 ${getTaskColor(task)}`}>  Task Descriptions :   {task.remark}</p>}
                  </div>
                  
                  <div className="flex items-center gap-3">


                    <span className={`text-sm ${getTaskColor(task)} flex items-center gap-2 xl:text-lg
                     lg:text-md  md:text-md text-xs lg:px-6 md:px-6 px-2 py-2 rounded-full font-bold `}>

                      <span className={`w-2 h-2 rounded-full ${task.status === "Completed" ? "hidden" : "bg-zinc-800"}`}></span>


                      {task.status}</span>
                    <button
                      onClick={() => setEditingTask(task)}
                      className="xl:text-lg lg:text-md  md:text-md text-sm px-3 py-2 bg-white  flex gap-2 items-center rounded-full text-zinc-800"
                    >
                      <PenLine size={15} /> <span className='lg:flex md:flex sm:flex hidden'>Edit  </span> 
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="xl:text-lg lg:text-md  md:text-md text-sm px-3 py-2 bg-red-500  flex gap-2  items-center rounded-full text-white"
                    ><Trash size={15} />
                      <span className='lg:flex md:flex sm:flex hidden'>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskMapAll
