import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Outlet } from "react-router-dom";
import { SideBarProfile } from "../../components/profile/SideBarProfile";

const Profile = () => {
  return (
    <div>
      <Breadcrumbs headline="Thông tin tài khoản" />
      <div className="bg-[#f5f5f5] py-4">
        <div className="container flex gap-4 my-4 mx-4">
          <div className="w-1/5 ">
            <SideBarProfile />
          </div>
          <div className="w-4/5 bg-white border p-10 mx-10 rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
