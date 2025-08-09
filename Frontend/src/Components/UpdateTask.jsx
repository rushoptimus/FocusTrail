import React, { useEffect, useState } from 'react'
import { useTaskStore } from '../store/task'
import toast from 'react-hot-toast';
const UpdateTask = ({ taskToEdit = null, onFinish, selectedDate, setEditingTask }) => {

    const { updateTask } = useTaskStore();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [remark, setRemark] = useState('');
    const [status, setStatus] = useState('Pending');


    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title || '');
            setPriority(taskToEdit.priority || 'Medium');
            setRemark(taskToEdit.remark || '');
            setStatus(taskToEdit.status || 'Pending');
        }
    }, [taskToEdit]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        const taskData = {
            title,
            priority,
            remark,
            date: selectedDate,
            status,
        };

        try {
            if (taskToEdit) {
                await updateTask(taskToEdit._id, taskData);
                toast.success("Task updated!");
            }

            setTitle('');
            setPriority('Medium');
            setRemark('');

            if (onFinish) onFinish();
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    const close = () => {
        setEditingTask(false)
    }

    return (
        <div className=' bg-black/60 w-[85%] h-[65%] absolute flex  items-start pt-[3%] px-[3%] rounded-2xl justify-center'>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4   rounded-lg shadow-sm w-full flex flex-col items-center justify-center gap-4">

                <div className='flex items-end justify-end w-[90%] '>
                    <button className='rounded-full bg-gray-800 text-white shadow-md shadow-gray-600 w-8 h-8 cursor-pointer text-2xl flex items-center justify-center' onClick={close} > x </button>
                </div>
                <h3 className="text-2xl font-bold">Update Task</h3>
                <label className='w-full flex items-center  justify-center h-full gap-4 text-xl'> <span className='font-bold flex items-center justify-start w-[13%]'> Task Name :</span>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="p-2 border rounded w-[70%]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className='w-full flex items-center justify-center gap-4 text-xl'><span className=' font-bold flex items-center justify-start w-[13%]'>  Task Remarks : </span>
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

                <label className='w-full flex items-center justify-center gap-4 text-xl'> <span className='font-bold flex items-center justify-start w-[13%]'> Task Description : </span>
                    <textarea
                        placeholder="Optional Remark"
                        className="p-2 border rounded w-[70%]"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        rows={2}
                    />
                </label>
                <label className='w-full flex items-center justify-center gap-4 text-xl'>
                    <span className='font-bold flex items-center justify-start w-[13%]'>Task Status:</span>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 border rounded w-[70%]"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <button type="submit" className="bg-zinc-700 w-[50%] cursor-pointer text-white py-2 rounded hover:bg-zinc-600">
                    Update Task
                </button>
            </form>
        </div>
    )
}

export default UpdateTask



