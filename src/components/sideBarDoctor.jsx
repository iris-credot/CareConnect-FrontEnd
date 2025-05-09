import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from '../assets/picc.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faUserInjured,
  faAppleAlt,
  faFileMedical,
  faBell,
  faCog,
  faBars,
  faTimes,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export default function SideBarDoctor() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded-md transition-colors duration-200 dark:text-white ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
        : 'text-black hover:bg-blue-100 hover:text-black'
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[300px] lg:w-[20%] h-full flex-col bg-gray-100 shadow-sm dark:bg-black dark:text-white">
        <div className="flex items-center gap-5 ml-6 mt-7">
          <img src={Icon} alt="Logo" className="w-14 h-14 object-cover rounded-full" />
          <p><strong>Dr IRIS</strong></p>
        </div>
        <nav className="flex flex-col mt-16 space-y-4 ml-6 ">
          <NavLink to="/doctor/dashboard" className={linkClasses}>
            <FontAwesomeIcon icon={faHome} className="mr-4 " /> Home
          </NavLink>
          <NavLink to="/doctor/appointments" className={linkClasses}>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Appointments
          </NavLink>
          <NavLink to="/doctor/patients" className={linkClasses}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4 " /> Patients
          </NavLink>
          <NavLink to="/doctor/sportNutri" className={linkClasses}>
            <FontAwesomeIcon icon={faAppleAlt} className="mr-4 " /> Sports & Nutrition
          </NavLink>
          <NavLink to="/doctor/reports" className={linkClasses}>
            <FontAwesomeIcon icon={faFileMedical} className="mr-4 " /> Reports
          </NavLink>
          <NavLink to="/doctor/notifications" className={linkClasses}>
            <FontAwesomeIcon icon={faBell} className="mr-4 " /> Notifications
          </NavLink>
          <NavLink to="/doctor/settings" className={linkClasses}>
            <FontAwesomeIcon icon={faCog} className="mr-4 " /> Settings
          </NavLink>
            <NavLink to="/" className={linkClasses}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />Logout
           </NavLink>
        </nav>
      </div>

      {/* Mobile top bar toggle button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-100 shadow-sm dark:bg-black">
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg z-50 p-4 flex flex-col md:hidden dark:bg-black dark:text-white">
          <div className="flex justify-between items-center mb-6 ">
            <div className="flex items-center gap-3">
              <img src={Icon} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
              <p><strong>Dr IRIS</strong></p>
            </div>
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} className="text-2xl dark:text-black" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <NavLink to="/doctor/dashboard" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faHome} className="mr-4" /> Home
            </NavLink>
            <NavLink to="/doctor/appointments" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Appointments
            </NavLink>
            <NavLink to="/doctor/patients" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserInjured} className="mr-4" /> Patients
            </NavLink>
            <NavLink to="/doctor/sportNutri" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faAppleAlt} className="mr-4" /> Sports & Nutrition
            </NavLink>
            <NavLink to="/doctor/reports" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faFileMedical} className="mr-4" /> Reports
            </NavLink>
            <NavLink to="/doctor/notifications" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBell} className="mr-4" /> Notifications
            </NavLink>
            <NavLink to="/doctor/settings" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
            </NavLink>
            <NavLink to="/" className={linkClasses} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />Logout
           </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}
