// src/components/Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import menuConfigAdmin from "./menuConfigAdmin";
import menuConfigStaff from "./menuConfigStaff";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const [showSubMenu, setShowSubMenu] = useState({});
  const { user, isAuthenticated } = useAuth();
  const roleNames =
    user && user.roles ? user.roles.map((role) => role.name) : [];

  const menuConfig = roleNames.includes("ADMIN")
    ? menuConfigAdmin
    : menuConfigStaff;

  const toggleSubMenu = (menu) => {
    setShowSubMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div
      className={`h-full bg-white ${
        activeMenu ? "w-64" : "w-0"
      } transition-width fixed left-0 top-0 z-40 overflow-x-hidden shadow-lg duration-300`}
    >
      <div className="p-4">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-12 w-12" />
          <button
            onClick={() => setActiveMenu(!activeMenu)}
            className="text-gray-700 md:block"
          >
            ☰
          </button>
        </div>

        {/* Menu Items */}
        <ul className="mt-6 space-y-4">
          {menuConfig.map((menu, index) => (
            <li key={index}>
              {menu.subMenu ? (
                <div
                  className="flex cursor-pointer items-center justify-between text-gray-700 hover:text-blue-500"
                  onClick={() => toggleSubMenu(menu.label)}
                >
                  <span className="flex items-center">
                    <menu.icon className="mr-2" />
                    {menu.label}
                  </span>
                  {showSubMenu[menu.label] ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              ) : (
                <Link
                  to={menu.link}
                  className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <menu.icon className="mr-2" />
                  {menu.label}
                </Link>
              )}
              {menu.subMenu && showSubMenu[menu.label] && (
                <ul className="ml-6 mt-2 space-y-2">
                  {menu.subMenu.map((subMenuItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subMenuItem.link}
                        className="text-gray-500 hover:text-blue-400"
                      >
                        {subMenuItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
