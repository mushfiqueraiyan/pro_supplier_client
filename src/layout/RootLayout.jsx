import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const RootLayout = () => {
  return (
    <div className=" bg-[#eaeced]">
      <div className="max-w-[1500px] mx-auto pt-0 md:pt-0 lg:pt-5">
        <Navbar />
        <div className=" p-3 md:p-4 lg:p-0 lg:py-5 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
