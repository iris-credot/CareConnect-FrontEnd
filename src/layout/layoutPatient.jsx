import NavBar from "../components/navBar";
import SideBarPatient from "../components/sideBarPatient";
import { Outlet } from "react-router-dom";

export default function LayoutPatient() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBarPatient />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
