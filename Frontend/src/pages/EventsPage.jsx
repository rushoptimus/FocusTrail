import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

import { useNavigate } from "react-router-dom";
import DashboardFrame from "../Components/DashboardFrame";
import Nav from "../Components/Nav";
import EventsMap from "../Components/EventsMap";
import AddEvent from "../Components/AddEvent";
import UpdateEvent from "../Components/UdateEvent";
import { useEventStore } from "../store/eventStore";
import { useEffect } from "react";
const EventsPage = () => {
  const { fetchEventsByDate, updateCompletedStatusEvent } = useEventStore();
  const { logout } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [AddEventsPopUp, setAddPopUp] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [Searchdate, setEventDate] = useState();
    const [showEdit, SetShowEdit] = useState(false);
  const [show, SetShow] = useState(false);
  

  const handleEditShow = () => {
    SetShowEdit(!showEdit);
    SetShow(false);
  }

  const handleMobileNav = () => {
    SetShow(!show);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const setAddTrue = () => {
    setAddPopUp(!AddEventsPopUp);
  };

  useEffect(() => {
    updateCompletedStatusEvent();
  }, []);

  const handleSearch = async () => {
    if (!Searchdate) return alert("Please select a date!");
    const selectedDate = new Date(Searchdate).toISOString().split("T")[0];
    await fetchEventsByDate(selectedDate);
  };

  return (
    <>
      <DashboardFrame>
        <div className="w-full h-screen pt-[2vh] flex flex-col gap-[2.5%] items-center  relative">
            {
            showEdit === true ?
             <div className='lg:absolute fixed z-50 inset-0 items-center w-full lg:h-screen flex  justify-center bg-black/40'>
              <EditNameTitle handleEditShow={handleEditShow} />
              </div>
              : ""
          }
          <Nav handleLogout={handleLogout} />

          <div className="w-[90%] lg:h-[85%] md:h-[85%] h-[88%]  p-4 bg-yellow-50 rounded-[5vh] flex flex-col gap-2 ">
            <div className="flex lg:flex-row flex-col  lg:gap-0 gap-4">
              <div className="w-full h-auto flex items-center justify-between gap-4 py-2 pl-[4%] pr-[2%]  ">

                <div className="flex  rounded-full py-2 px-10 gap-4 items-center justify-center bg-zinc-900 text-white  shadow-lg shadow-gray-300 font-bold text-xl ">
                  {" "}
                  Events
                </div>
              </div>




              <div className="  lg:flex md:flex sm:flex hidden items-center lg:justify-end justify-center gap-2 w-full ">
                <div className="flex  rounded-full py-2 lg:px-8 px-2 lg:gap-4  gap-1 xl:text-lg lg:text-md  md:text-lg sm:text-lg text-xs   items-center justify-center bg-zinc-700 text-white  shadow-lg shadow-gray-300 font-semibold">
                  <div>Events Colors :</div>
                  <div className="flex items-center gap-4">
                    <div className="flex  items-center gap-2">
                      <div className="lg:w-4 lg:h-4 md:w-4 md:h-4 w-2 h-2 rounded-full bg-green-300"></div>
                      <h3>Future Events</h3>
                    </div>
                    <div className="flex  items-center gap-2">
                      <div className="lg:w-4 lg:h-4  md:w-4 md:h-4 w-2 h-2 rounded-full bg-gray-400"></div>
                      <h3>Past Events</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex w-full h-auto items-center lg:justify-end justify-center lg:pr-10  lg:gap-8 md:gap-6 gap-1">
              <div
                onClick={setAddTrue}
                className="rounded-full flex items-center gap-2 lg:px-3 md:px-2 sm:px-3 px-3 py-2 font-semibold bg-zinc-900 text-white
                             hover:bg-zinc-800  cursor-pointer shadow-lg shadow-gray-300 xl:text-lg lg:text-md  md:text-md sm:text-sm text-xs "
              >
                {" "}
                <span className="lg:flex md:flex hidden ">   + </span> Add   <span className="lg:flex md:flex hidden ">  Event{" "} </span>
              </div>

              <div className="h-full   rounded-lg  flex gap-2 items-center justify-center ">
                <input
                  type="date"
                  className="border border-zinc-800 rounded-full px-3 py-2 mr-2 xl:text-lg lg:text-md  md:text-md text-xs"

                  value={Searchdate}
                  onChange={(e) => setEventDate(e.target.value)}
                />

                <button
                  className='rounded-full  px-3 py-2 font-semibold xl:text-lg lg:text-md  md:text-md text-xs bg-zinc-900 text-white hover:bg-zinc-800   cursor-pointer shadow-lg shadow-gray-300 '

                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>



            <div className="w-full lg:h-[87%] h-[89%] overflow-y-auto ">
              <EventsMap
                editingEvent={editingEvent}
                setEditingEvent={setEditingEvent}
              />
            </div>
          </div>
        </div>
        {AddEventsPopUp === true ? (
          <div className="absolute items-center w-full h-screen flex  justify-center bg-black/40">
            <AddEvent selectedDate={selectedDate} setAddPopUp={setAddPopUp} />
          </div>
        ) : (
          ""
        )}
        {editingEvent && (
          <div className="absolute items-center w-full h-screen flex  justify-center bg-black/40">
            <UpdateEvent
              setEditingEvent={setEditingEvent}
              eventToEdit={editingEvent}
            />
          </div>
        )}
      </DashboardFrame>
    </>
  );
};

export default EventsPage;
