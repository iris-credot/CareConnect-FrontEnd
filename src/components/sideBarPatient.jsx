import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Icon from '../assets/picc.jpg';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faUserInjured,
  faAppleAlt,

  faBell,
  faCog,
  faBars,
  faTimes,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export default function SideBarPatient() {
  
    const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded-md transition-colors duration-200 dark:text-white ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
        : 'text-black hover:bg-blue-100 hover:text-black'
    }`;
    const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        console.log("Fetching user with ID:", userId);
        console.log("Using token:", token);

        if (!userId || !token) {
          console.warn("Missing userId or token in localStorage");
          return;
        }

        const response = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/user/getOne/${userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("User data fetched successfully:", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[300px] lg:w-[20%] h-screen flex-col bg-gray-100 shadow-sm dark:bg-black dark:text-white">
        <div className="flex items-center gap-5 ml-6 mt-7">
          <img src={user?.image?.startsWith("http") ? user.image : Icon}    alt="User Profile"
          className="w-14 h-14 object-fill rounded-full"/>
      
               <p><strong>{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</strong></p>
        </div>
        <nav className="flex flex-col mt-8 space-y-3 ml-6 ">
          <NavLink to="/patient/dashboard" className={linkClasses}>
            <FontAwesomeIcon icon={faHome} className="mr-4 " /> Home
          </NavLink>
          <NavLink to="/patient/appointments" className={linkClasses}>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Appointments
          </NavLink>
          <NavLink to='/patient/nutrition' className={linkClasses}>
            <FontAwesomeIcon icon={faAppleAlt} className="mr-4 " />Food Recommendations
          </NavLink>
          <NavLink to="/patient/sports" className={linkClasses}>
            <FontAwesomeIcon icon={faAppleAlt} className="mr-4 " /> Sports Recommendations
          </NavLink>
             <NavLink to="/patient/notifications" className={linkClasses}>
            <FontAwesomeIcon icon={faBell} className="mr-4 " /> Notifications
          </NavLink>
          <NavLink to="/patient/settings" className={linkClasses}>
            <FontAwesomeIcon icon={faCog} className="mr-4 " /> Settings
          </NavLink>           
          <NavLink to='/patient/feedback' className={linkClasses}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4 " /> Feedback
          </NavLink>

          <NavLink to='/patient/chats' className={linkClasses}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4 " /> Chats
          </NavLink>

          
            <NavLink   onClick={() => {handleLogout()}} className={linkClasses}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" /> Logout
           </NavLink>
        </nav>
      </div>

      {/* Mobile top bar toggle button */}
      <div className="md:hidden flex justify-between h-screen items-center p-4 bg-gray-100 shadow-sm dark:bg-black">
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen  bg-gray-100 shadow-lg z-50 p-4 flex flex-col md:hidden dark:bg-black dark:text-white">
          <div className="flex justify-between items-center mb-6 ">
            <div className="flex items-center gap-3">
                   <img src={user?.image?.startsWith("http") ? user.image : Icon}    alt="User Profile"
          className="w-14 h-14 object-fill rounded-full"/>
         
            <p><strong>{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</strong></p>
            </div>
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} className="text-lg dark:text-black" />
            </button>
          </div>
          <nav className="flex flex-col space-y-3 mt-8">

            <NavLink to="/patient/dashboard" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faHome} className="mr-4 " /> Home
          </NavLink>
          <NavLink to="/patient/appointments" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Appointments
          </NavLink>
          <NavLink to='/patient/nutrition' className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAppleAlt} className="mr-4 " />Food Recommendations
          </NavLink>
          <NavLink to="/patient/sports" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAppleAlt} className="mr-4 " /> Sports Recommendations
          </NavLink>
                            <NavLink to="/patient/notifications" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBell} className="mr-4 " /> Notifications
          </NavLink>
          <NavLink to="/patient/settings" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCog} className="mr-4 " /> Settings
          </NavLink>
          <NavLink to='/patient/feedback' className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4 " /> Feedback
          </NavLink>

          <NavLink to='/patient/chats' className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4 " /> Chats
          </NavLink>

      
            <NavLink  className={linkClasses}   onClick={() => {
    handleLogout();
    toggleSidebar();
  }}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />Logout
           </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}
