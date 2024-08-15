import React, { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AccountPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const { user, logout } = useAuth();

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 focus:outline-none"
      >
        <span>{user?.firstName}</span>
        <img
          src="/path-to-avatar.jpg"
          alt="Avatar"
          className="h-8 w-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
          <a
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Hồ sơ cá nhân
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cài đặt
          </a>
          <a
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </a>
        </div>
      )}
    </div>
  );
}
