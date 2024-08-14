import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <div className="flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div
        className={`min-h-screen flex-1 transition-all duration-300 ${activeMenu ? "ml-64" : "ml-0"}`}
        style={{ marginTop: "4rem" }}
      >
        <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
