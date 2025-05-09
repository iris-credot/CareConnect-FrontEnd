import NavBar from "../components/navBar";
import SideBarDoctor from "../components/sideBarDoctor";
import { Outlet } from "react-router-dom";

export default function LayoutDoctor() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBarDoctor />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
