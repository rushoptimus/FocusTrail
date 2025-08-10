import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react'; // X for close icon
import { Settings } from 'lucide-react';
import EditNameTitle from '../Components/EditNameTitle';

const Nav = ({ handleLogout }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
    { name: "Events", path: "/Events" },
    { name: "Mood Tracker", path: "/Moodtracker" },
    { name: "Insights", path: "/Insights" },
  ];

  const [show, SetShow] = useState(false);

  const [showEdit, SetShowEdit] = useState(false);
  const handleMobileNav = () => {
    SetShow(!show);
  };
  const handleEditShow = () => {
    SetShowEdit(!showEdit);
  }

  return (
    <>

      {/* Main Navbar */}
      <nav className='w-[90%] h-[5vh] px-[5%] lg:py-[1.5%] md:py-[1.5%] py-[5%] mt-[2%] flex items-center justify-between shadow-xs shadow-yellow-50 bg-yellow-50 rounded-[5vh]'>
        <h2 className='lg:text-3xl md:text-2xl text-2xl font-bold'>FocusTrail</h2>

        {/* Desktop Nav */}
        <div className='lg:flex hidden relative gap-10 items-center justify-center xl:text-lg text-md   font-bold'>
          {
            showEdit === true ?
              <div className=" fixed inset-0 items-center  w-full h-screen z-1000 flex  justify-center bg-black/40">
                <EditNameTitle />
              </div>
              : ""
          }
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              handleEditShow()
            }}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full mt-4 flex items-center gap-2 w-fit"
          >
            <Settings size={20} />
          </button >

          <button
            onClick={handleLogout}
            className="bg-zinc-900 text-white px-4 py-1 rounded-full flex items-center gap-2"
          >
            Logout <LogOut size={20} />
          </button>
        </div>

        {/* Burger icon (Mobile) */}
        <button onClick={handleMobileNav} className="lg:hidden block">
          <Menu />
        </button>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-full bg-gradient-to-tl from-[#ffcc95] via-[#ffd4a5] to-[#ebf6f6] z-50 p-6 
          flex flex-col gap-8 transition-transform duration-300 ease-in-out
          ${show ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <h2 className='text-2xl font-bold md:ml-8 ml-4'>FocusTrail</h2>
          <button onClick={handleMobileNav}>
            <X size={28} />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-6 relative text-lg font-medium ml-8 mt-6">
          {
            showEdit === true ?
              <div className="lg:absolute fixed items-center  w-full h-screen flex  justify-center bg-black/40">
                <EditNameTitle />
              </div>
              : ""
          }
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={handleMobileNav}
              className="hover:text-yellow-600 transition"
            >
              {item.name}
            </Link>
          ))}
          {/*  */}
          <button
            onClick={() => {
              handleEditShow()
            }}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full mt-4 flex items-center gap-2 w-fit"
          >
            <Settings size={20} />
          </button >

          {/*  */}
          <button
            onClick={() => {
              handleLogout();
              handleMobileNav();
            }}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full mt-4 flex items-center gap-2 w-fit"
          >
            Logout <LogOut size={20} />
          </button>

        </div>

      </div>
    </>
  );
};

export default Nav;
