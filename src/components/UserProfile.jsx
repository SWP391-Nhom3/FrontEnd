import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Buttonlogout from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "antd";

import Button from "./Button";
import { adminProfileData, staffProfileData } from "../data/dummy";
// import { fetchLogout, fetchRefreshToken } from "../data/api";

const UserProfile = ({ isStaff, isAdmin, isShipper }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogoutConfirmation = () => {
    navigate("/login");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("result");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isStaff");
    localStorage.removeItem("isShipper");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const handleLogout = async () => {
    Modal.confirm({
      closable: true,
      title: "Xác nhận đăng xuất",
      content: `Bạn có chắc chắn muốn đăng xuất?`,
      onOk: handleLogoutConfirmation,

      onCancel() {},
      okButtonProps: {
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
          color: "#FFFFFF",
        },
      },
      cancelText: "Đóng",
      okText: "Đồng ý",
    });
  };
  return (
    <div className="nav-item absolute right-1 top-10 w-96 rounded-lg bg-white p-5 dark:bg-[#42464D]">
      <div className="border-b-1 border-color flex items-center justify-between gap-5 pb-6">
        <div>
          <p className="text-xl font-semibold dark:text-gray-200">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
            {isAdmin
              ? "Quản trị viên"
              : isStaff
                ? "Nhân viên"
                : "Nhân viên giao hàng"}
          </p>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div>
        {isAdmin ? (
          <div>
            <div>
              {adminProfileData.map((item, index) => (
                <div
                  key={index}
                  className="border-b-1 border-color hover:bg-light-gray flex cursor-pointer gap-5 p-4 dark:hover:bg-[#42464D]"
                >
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="hover:bg-light-gray rounded-lg p-3 text-xl"
                  >
                    {item.icon}
                  </button>

                  <div>
                    <p className="font-semibold dark:text-gray-200">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Buttonlogout
                variant="contained"
                className="w-full"
                onClick={handleLogout}
              >
                Đăng xuất
              </Buttonlogout>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {staffProfileData.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.path}`}
                  className="border-b-1 border-color hover:bg-light-gray flex cursor-pointer gap-5 p-4 dark:hover:bg-[#42464D]"
                >
                  <div
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="hover:bg-light-gray rounded-lg p-3 text-xl"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="font-semibold dark:text-gray-200"
                      style={{ marginBottom: "5px" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      style={{ marginBottom: "5px" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="mt-5">
              <Buttonlogout
                variant="contained"
                className="w-full"
                onClick={handleLogout}
              >
                Đăng xuất
              </Buttonlogout>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
