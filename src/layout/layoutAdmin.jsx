import NavBar from "../components/navBar";
import SideBarAdmin from "../components/sideBarDoctor";
import { Outlet } from "react-router-dom";



export default function LayoutAdmin() {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-1">
          <SideBarAdmin />
          <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  