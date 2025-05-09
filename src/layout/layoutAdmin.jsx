import NavBar from "../components/navBar";
import SideBarAdmin from "../components/sideBarAdmin";
import { Outlet } from "react-router-dom";





export default function LayoutAdmin() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBarAdmin />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


  