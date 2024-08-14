import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Outlet } from "react-router-dom";
import { SideBarProfile } from "../../components/profile/SideBarProfile";

const Profile = () => {
  return (
    <div>
      <Breadcrumbs headline="Thông tin tài khoản" />
      <div className="bg-[#f5f5f5] py-4">
        <div className="container mx-4 my-4 flex gap-4">
          <div className="w-1/5">
            <SideBarProfile />
          </div>
          <div className="mx-10 w-4/5 rounded-xl border bg-white p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
