"use client";

import { Sidebar } from "flowbite-react";
import {
  HiChat,
  HiClock,
  HiUser,
  HiGift,
  HiOutlineAdjustments  
} from "react-icons/hi";
import { useLocation } from "react-router-dom";

export function SideBarProfile() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getItemClass = (path) => 
    currentPath === path 
      ? "bg-blue-500 text-white font-bold text-lg px-6 py-3 "
      : "text-gray-600 hover:bg-gray-100 text-lg px-6 py-3 ";

  return (
    <Sidebar className="bg-white border mx-4 rounded-xl">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item 
            href="/profile" 
            icon={HiUser} 
            className={getItemClass("/profile")}
          >
            Tài khoản
          </Sidebar.Item>
          <Sidebar.Item 
            href="/profile/change-password" 
            icon={HiOutlineAdjustments} 
            className={getItemClass("/profile/change-password")}
          >
            Mật khẩu & bảo mật
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item 
            href="/profile/accumulated-points" 
            icon={HiGift} 
            className={getItemClass("/profile/accumulated-points")}
          >
            Đổi quà
          </Sidebar.Item>
          <Sidebar.Item 
            href="/profile/history-order" 
            icon={HiClock} 
            className={getItemClass("/profile/history-order")}
          >
            Lịch sử đơn hàng
          </Sidebar.Item>
          <Sidebar.Item 
            href="/profile/my-feedback" 
            icon={HiChat} 
            className={getItemClass("/profile/my-feedback")}
          >
            Bình luận của tôi
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
