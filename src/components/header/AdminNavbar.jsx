import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import UserProfile from "../UserProfile";
import { useStateContext } from "../../context/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
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

const Navbar = ({
  isAuthenticatedAdmin,
  isAuthenticatedStaff,
  isAuthenticatedShipper,
}) => {
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
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    // <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

    <div
      className="relative flex w-full justify-between p-2"
      style={{ backgroundColor: "#FAFBFB" }}
    >
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} /> */}
        <TooltipComponent
          content="Profile"
          position="BottomCenter"
          style={{
            position: "fixed",
            right: "0px",
            top: "20px",
          }}
        >
          <div
            className="hover:bg-light-gray flex cursor-pointer items-center gap-2 rounded-lg p-1"
            onClick={() => handleClick("userProfile")}
          >
            <p>
              <span className="text-14 text-gray-400">Xin chào,</span>
              <span className="text-14 ml-1 font-bold text-gray-400">
                {user?.email}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-14 text-gray-400" />
          </div>
        </TooltipComponent>

        {/* {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)} */}
        {isAuthenticatedAdmin && isClicked.userProfile && (
          <UserProfile isAdmin={true} />
        )}
        {isAuthenticatedStaff && isClicked.userProfile && (
          <UserProfile isStaff={true} />
        )}
        {isAuthenticatedShipper && isClicked.userProfile && (
          <UserProfile isShipper={true} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
