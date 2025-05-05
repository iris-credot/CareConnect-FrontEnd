import React,{useState} from "react";
import { NavLink} from "react-router-dom";
import Icon from '../assets/picc.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendarCheck,faUserInjured,faAppleAlt,faFileMedical,faBell,faCog,faBars,faTimes}from "@fortawesome/free-solid-svg-icons";
export default function SideBarDoctor(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const linkClasses = ({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive ? 'bg-blue-500 text-black font-semibold lg:text-lg text-md' : 'text-black '
        }`;
    return(
        <div>
        <div className="md:hidden flex justify-between items-center p-4 bg-[#f8f5f5] shadow-sm">
      
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>
        <div className="hidden lg:w-[20%] md:w-[300px]  h-screen p-3 md:flex flex-col  bg-[#f8f5f5] shadow-sm rounded-md ">
            <div className="flex  items-center gap-5 lg:ml-16 ml-4 mt-7">
             <img src={Icon} alt="Logo"  className="w-14 h-14 object-cover rounded-full"/>
             <p><strong>Dr IRIS</strong></p>
            </div>
            <nav className="flex flex-col  mt-16  space-y-6 lg:ml-16 ml-4">
                <NavLink to="/doctorDashboard" className={linkClasses}> <FontAwesomeIcon icon={faHome} className="mr-4 text-black" />Home</NavLink> 
                <NavLink to="/appointments" className={linkClasses}><FontAwesomeIcon icon={faCalendarCheck} className="mr-4 text-black" />Appointments</NavLink> 
                <NavLink to="/patients" className={linkClasses}> <FontAwesomeIcon icon={faUserInjured} className="mr-4 text-black" />Patients</NavLink>
                <NavLink to="/sportNutri" className={linkClasses}>  <FontAwesomeIcon icon={faAppleAlt} className="mr-4 text-black" />Sports $ Nutrition</NavLink>  
                <NavLink to="/reports" className={linkClasses}> <FontAwesomeIcon icon={faFileMedical} className="mr-4 text-black" />Reports</NavLink> 
                <NavLink to="/notifications" className={linkClasses}>  <FontAwesomeIcon icon={faBell} className="mr-4 text-black" />Notifications</NavLink> 
                <NavLink to="/settings" className={linkClasses}>  <FontAwesomeIcon icon={faCog} className="mr-4 text-black" />Settings</NavLink> 
            </nav>
        </div>
        {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-[#f8f5f5] shadow-lg z-50 p-4 md:hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <img
                src={Icon}
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
              <p><strong>Dr IRIS</strong></p>
            </div>
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <NavLink to="/doctorDashboard" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faHome} className="mr-4" /> Home
            </NavLink>
            <NavLink to="/appointments" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Appointments
            </NavLink>
            <NavLink to="/patients" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserInjured} className="mr-4" /> Patients
            </NavLink>
            <NavLink to="/sportNutri" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faAppleAlt} className="mr-4" /> Sports $ Nutrition
            </NavLink>
            <NavLink to="/reports" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faFileMedical} className="mr-4" /> Reports
            </NavLink>
            <NavLink to="/notifications" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBell} className="mr-4" /> Notifications
            </NavLink>
            <NavLink to="/settings" className={linkClasses} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
            </NavLink>
          </nav>
        </div>
      )}
        </div>
    )
}