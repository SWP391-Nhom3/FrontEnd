import React from "react";
import AccountPopover from "./AccountPopover";

export default function Navbar({ activeMenu, setActiveMenu }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between bg-white p-4 shadow-md">
      {/* Toggle Button for Sidebar - Visible on all screens */}
      <button
        onClick={() => setActiveMenu(!activeMenu)}
        className="text-gray-700"
      >
        ☰
      </button>

      {/* Centered Title or Logo */}
      <div className="text-lg text-gray-700">Milk MomBaby</div>

      {/* Right Side Items */}
      <div className="flex items-center">
        <AccountPopover />
      </div>
    </div>
  );
}
