import React from 'react'
import Welcome from './Welcome';
import { useEffect } from 'react';
import { useTaskStore } from '../store/task';
import { useClockStore } from '../store/Clock';

const Dash_Total_Task = ({name,setAddTaskTrue,setAddEventTrue}) => {
const {fetchCompletedTasks,completedTasks} = useTaskStore();
const {fetchtotalSessionstime,  totalHours} = useClockStore();

useEffect(() => {
  fetchCompletedTasks();
  fetchtotalSessionstime();
}, []);


const taskTotal = completedTasks ? completedTasks.length : 0;
const totalHour = Math.floor(totalHours) || 0 

console.log(taskTotal)
    const Dash_total = [
        {name:"Tasks" , total: taskTotal},
        {name:"Worktime", total: totalHour},
    ]

    
    return (
    <div className='lg:w-[98%] w-full h-auto mt-4   flex lg:flex-row md:flex-row sm:flex-row flex-col   items-center justify-end px-[5%] rounded-2xl lg:gap-[0%] md:gap-[0%] gap-[2vh] '>
   <div className='w-full  h-full '>
    <Welcome name={name}/>
   </div>
   
   <div className='flex flex-col items-center justify-center lg:w-[35%] md:w-[40%] w-full  shadow-md shadow-yellow-300 bg-gradient-to-br  from-yellow-50 to-yellow-100 rounded-[5vh]  text-zinc-900  h-full '>
       {Dash_total.map((items,index)=>{
        
        return (<div key={index}   className={`flex  items-center justify-between  text-black  px-[15%] pt-[2%] w-full lg:text-lg  md:text-lg text-xl  font-bold  `}>
            <h2 >{items.name}</h2>
            <p >{items.total}</p>
            </div>
            )
      })}
              <div className=' flex items-center justify-center gap-6 text-black font-bold   p-2 w-full xl:text-lg lg:text-md  md:text-xs  text-sm'>
          <button onClick={setAddTaskTrue} className='rounded-full px-2 py-2 bg-yellow-400  hover:bg-yellow-300 cursor-pointer hover:shadow-md hover:shadow-amber-200 '> + Add Task </button>
          <button onClick={setAddEventTrue} className='rounded-full px-2 py-2 bg-yellow-400 hover:bg-yellow-300 cursor-pointer hover:shadow-md hover:shadow-amber-200 '> + Add Event </button>
        </div>
   </div>
    </div>
  )
}

export default Dash_Total_Task
