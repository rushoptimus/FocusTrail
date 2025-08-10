import React from "react";
import DashboardFrame from "../Components/DashboardFrame";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import AddTask from "../Components/AddTask";
import TaskMapAll from "./TaskMapAll";
import SearchDateTask from "../Components/SearchDateTask";
import EditNameTitle from "../Components/EditNameTitle"
const TasksPage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [selectedDate, setSelectedDate] = useState(new Date()); // defaults to today
  const [taskPopup, ShowTaskPopUP] = useState(false);
    const [showEdit, SetShowEdit] = useState(false);
  const [show, SetShow] = useState(false);
  

  const handleEditShow = () => {
    SetShowEdit(!showEdit);
    SetShow(false);
  }

  const handleMobileNav = () => {
    SetShow(!show);
  };

  const setAddTrue = () => {
    ShowTaskPopUP(!taskPopup);
  };

  return (
    <>
      <DashboardFrame>
        <div className="w-full h-screen flex flex-col gap-[2.5%]  items-center  relative">
            {
            showEdit === true ?
             <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
              <EditNameTitle handleEditShow={handleEditShow} />
              </div>
              : ""
          }
          <div className="lg:mt-0 md:mt-0 mt-[2vh] w-full  flex items-center justify-center">
        <Nav handleMobileNav={handleMobileNav} handleLogout={handleLogout} handleEditShow={handleEditShow} show={show}/>
   </div>
          <div className="w-[90%] lg:h-[85%] md:h-[85%] sm:h-[80%] h-[85%]  p-4 bg-yellow-50 rounded-[5vh] ">
            <div className="w-full h-auto flex lg:flex-row md:flex-row  flex-col lg:items-center md:items-center items-start justify-between gap-4 py-2 pl-[4%]  ">
              <div className="flex  rounded-full py-2 px-10 gap-4 items-center justify-center bg-zinc-900 text-white  shadow-lg shadow-gray-300 font-bold text-xl ">
                {" "}
                Tasks
              </div>

              <div className=" lg:flex md:flex sm:flex hidden  items-center lg:justify-end justify-center gap-2 w-full ">
                <div className="flex lg:flex-row md:flex-row  flex-row  rounded-full py-2 lg:px-8 px-4 lg:gap-4
                  gap-1 xl:text-lg lg:text-md  md:text-md text-xs   items-center justify-center bg-zinc-700
                   text-white  shadow-lg shadow-gray-300 font-semibold">
                  <div>Tasks Colors :</div>
                  <div className="flex  items-center gap-4">

                    <div className="flex lg:flex-row md:flex-row  flex-row  gap-2">

                      <div className="flex  items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-300"></div>
                        <h3 className="flex gap-2">High <span className="lg:flex md:flex hidden ">  priority  </span></h3>
                      </div>

                      <div className="flex  items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                        <h3 className="flex gap-2" >Medium  <span className="lg:flex md:flex hidden "> priority </span></h3>
                      </div>

                    </div>

                    <div className="flex lg:flex-row md:flex-row flex-row  gap-2">

                      <div className="flex  items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-300"></div>
                        <h3 className="flex gap-2"> Low <span className="lg:flex md:flex hidden "> priority </span></h3>
                      </div>

                      <div className="flex  items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        <h3 className="flex gap-2">Completed</h3>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex w-full h-auto items-center lg:justify-end md:justify-end justify-center lg:gap-8 md:gap-8 gap-2">

              <div
                onClick={setAddTrue}
                className="rounded-full px-3 py-2 font-semibold bg-zinc-900 text-white
                           flex gap-2  hover:bg-zinc-800  cursor-pointer shadow-lg shadow-gray-300 xl:text-lg lg:text-md  md:text-md text-xs "
              >
                {" "}
                <span className="lg:flex md:flex hidden "> + </span>       Add <span className="lg:flex md:flex hidden "> New Task{" "} </span>
              </div>

              <SearchDateTask />
            </div>
            <div className="w-full lg:h-[87%]  md:h-[83%] sm:h-[75%] h-[85%]    overflow-y-auto">
              <TaskMapAll></TaskMapAll>
            </div>
            {/* need to show the taks view  */}
          </div>
          {taskPopup === true ? (
            <div className="lg:absolute fixed items-center  w-full h-screen flex  justify-center bg-black/40">
              <AddTask
                selectedDate={selectedDate}
                ShowTaskPopUP={ShowTaskPopUP}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </DashboardFrame>
    </>
  );
};

export default TasksPage;
