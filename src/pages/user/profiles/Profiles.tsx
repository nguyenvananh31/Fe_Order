import React from "react";
import HeaderProfile from "./navProfile/headerProfile";
import AsideMain from "./navProfile/AsideMain";
import { Outlet } from "react-router-dom";

const Profiles: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-[30px] h-screen text-gray-800 text-sm leading-[21px] px-5 ">
      <div className="flex items-center mt-8 ">
        <h2 className="text-lg font-medium mr-auto mb-3 mt-3">Thông Tin Tài Khoản</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 mx-3 h-3/4">
        <div className="col-span-1 md:col-span-3 bg-white">
          <HeaderProfile />
          <AsideMain />
        </div>
        <div className="col-span-1 md:col-span-9 lg:col-span-9">
          <Outlet />
        </div>


      </div>
    </div>
  );
};

export default Profiles;
