import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => {
        console.log(`NavButton clicked: ${title}`);
        customFunc();
      }}
      style={{ color }}
      className="hover:bg-light-gray relative rounded-full p-3 text-xl"
    >
      <span
        style={{ background: dotColor }}
        className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const user = JSON.parse(localStorage.getItem("user"));

const Navbar = ({ isAuthenticatedAdmin, isAuthenticatedStaff }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => {
    console.log("handleActiveMenu triggered");
    console.log("activeMenu before:", activeMenu);
    setActiveMenu(!activeMenu);
    console.log("activeMenu after:", !activeMenu);
  };

  return (
    <div
      className="relative flex w-full justify-between p-2"
      style={{ backgroundColor: "#FAFBFB" }}
    >
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenuFold />}
      />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-light-gray"
            onClick={() => handleClick("userProfile")}
          >
            {/* <p>
              <span className="text-14 text-gray-400">Xin chào,</span>{" "}
              <span className="ml-1 text-14 font-bold text-gray-400">
                {user.username}
              </span>
            </p> */}
            {/* <MdKeyboardArrowDown className="text-14 text-gray-400" /> */}
          </div>
        </TooltipComponent>
        {isAuthenticatedAdmin && isClicked.userProfile && (
          <UserProfile isAdmin={true} />
        )}
        {isAuthenticatedStaff && isClicked.userProfile && (
          <UserProfile isAdmin={false} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
