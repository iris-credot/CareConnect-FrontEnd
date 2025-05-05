import NavBar from "../components/navBar";
import SideBarDoctor from "../components/sideBarDoctor";
import { Outlet } from "react-router-dom";



export default function LayoutDoctor() {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-1">
          {/* Sidebar with fixed width */}
          <div className="hidden md:block w-[300px] lg:w-[20%]">
            <SideBarDoctor />
          </div>
  
          {/* Mobile Sidebar (absolute) */}
          <div className="block md:hidden">
            <SideBarDoctor />
          </div>
  
          {/* Main content takes remaining space */}
          <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
  
  