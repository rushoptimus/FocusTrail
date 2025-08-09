import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTaskStore } from '../store/task';

const AddTask = ({ selectedDate, ShowTaskPopUP }) => {
    const { addTask } = useTaskStore();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [remark, setRemark] = useState('');

    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        try {
            await addTask({
                title,
                priority,
                remark,
                date: selectedDate,
            });
            setTitle('');
            setPriority('Medium');
            setRemark('');

            toast.success("Task added!");
        } catch (err) {
            console.error("Add task error:", err);
            toast.error(err.message || "Failed to add task");
        }
    };

    const Close = () => {
        ShowTaskPopUP(false);
    }


    return (
        <form onSubmit={handleAddTask}
            className="bg-[#feefdf] px-4 py-8   rounded-[5vh] shadow-sm lg:w-[70%] md:w-[80%] sm:w-[90%] w-[98%]    flex flex-col items-center justify-center gap-10">


            <div className='flex items-end justify-end w-[90%]   '>
                <div className='flex items-center justify-between w-full  '>
                    <h3 className="font-bold lg:text-2xl md:text-xl sm:text-xl text-lg bg-black text-white px-4 py-1 rounded-full   ">Add New Task</h3>
                    <button className='rounded-full bg-black text-white shadow-md shadow-gray-200 w-8 h-8 p-2 cursor-pointer text-xl flex items-center justify-center' onClick={Close} > x </button>
                </div>
            </div>


            <label className='w-full flex items-center  justify-center  gap-4'>
                <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold   xl:text-xl lg:text-lg  md:text-lg   sm:text-md  text-sm '> Task Name :</span>
                <input
                    type="text"
                    placeholder="Task Title"
                    className="p-2 border rounded w-[70%]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className='w-full flex items-center justify-center gap-4'>
                <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold  xl:text-xl  lg:text-lg  md:text-lg sm:text-md sm:text-sm text-sm'> Task Remarks : </span>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="p-2 border rounded w-[70%]"
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
            </label>
            <label className='w-full flex items-center justify-center gap-4'>
                <span className='flex items-center justify-start lg:w-[20%] w-[30%] font-bold    xl:text-xl  lg:text-lg  md:text-lg sm:text-md sm:text-sm text-sm'> Task Description : </span>
                <textarea
                    placeholder="Optional Remark"
                    className="p-2 border rounded w-[70%]"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    rows={2}
                />
            </label>
            <button type="submit" className="bg-zinc-900 w-[50%] cursor-pointer lg:text-xl  md:text-lg sm:text-md text-sm text-white py-2 rounded-full shadow-lg shadow-gray-400  hover:bg-zinc-700">
                + Add Task
            </button>
        </form>
    );
};


export default AddTask




