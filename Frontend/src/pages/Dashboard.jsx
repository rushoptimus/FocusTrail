import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import DashboardFrame from '../Components/DashboardFrame';
import Nav from '../Components/Nav';
import Dash_Total_Task from '../Components/Dash_Total_Task';
import Profile from "../Components/Profile"
import ProgressMap from '../Components/ProgressMap';
import Clock from '../Components/Clock';
import TasksDash from '../Components/TasksDash';
import Mood from '../Components/Mood';
import Calendar from '../Components/Calendar';
import AddTask from '../Components/AddTask';
import AddEvent from '../Components/AddEvent';
import { useTaskStore } from '../store/task';
import { useEffect } from 'react';
import EditNameTitle from "../Components/EditNameTitle"
const Dashboard = () => {


  const { user, logout } = useAuthStore();
  const { rolloverTasks } = useTaskStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  useEffect(() => {
    rolloverTasks()
  }, [])




  const [selectedDate, setSelectedDate] = useState(new Date()); // defaults to today
  const [taskPopup, ShowTaskPopUP] = useState(false);
  const [AddEventsPopUp, setAddPopUp] = useState(false);
  const [showEdit, SetShowEdit] = useState(false);
  const [show, SetShow] = useState(false);
  

  const setAddTaskTrue = () => {
    ShowTaskPopUP(!taskPopup)
  }
  const setAddEventTrue = () => {
    setAddPopUp(!AddEventsPopUp);
  }
  const handleEditShow = () => {
    SetShowEdit(!showEdit);
    SetShow(false);
  }

  const handleMobileNav = () => {
    SetShow(!show);
  };



  return (
    <>

      <DashboardFrame>
        <div className='w-full  h-full flex flex-col items-center lg:mt-0 md:mt-0 mt-[3vh]   lg:gap-[0%] md:gap-[0%] gap-[2vh]'>
          <Nav handleMobileNav={handleMobileNav} handleLogout={handleLogout} handleEditShow={handleEditShow} show={show}/>

          <Dash_Total_Task name={user.name} setAddTaskTrue={setAddTaskTrue} setAddEventTrue={setAddEventTrue} />
          <div className='xl:w-[92%] lg:w-[98%] w-[95%] my-[1%] h-full  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 md:gap-6 gap-8'>

            <div><Profile show={show} name={user.name} userTitle={user.Title} image={user.image} /></div>
            <div><ProgressMap /></div>
            <div><Clock /></div>
              

            <div className='row-span-2'><TasksDash /></div>

            <div><Mood /></div>

            <div className='lg:col-span-2 md:col-span-2'><Calendar /></div>
          </div>
        </div>
          {
            showEdit === true ?
             <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
              <EditNameTitle handleEditShow={handleEditShow} />
              </div>
              : ""
          }
        {
          taskPopup === true ?
            <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
              <AddTask selectedDate={selectedDate} ShowTaskPopUP={ShowTaskPopUP} />
            </div>
            : ""
        }

        {
          AddEventsPopUp === true ?
            <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
        
              <AddEvent selectedDate={selectedDate} setAddPopUp={setAddPopUp} />
            </div>
            : ""
        }
      </DashboardFrame>
    </>
  )
}

export default Dashboard
