import React from "react";
import { Outlet } from "react-router";
import auth from "../assets/auth.png";

const AuthLayout = () => {
  return (
    <div className="  h-screen items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row  w-screen h-[100vh] rounded-xl  overflow-hidden">
        {/* Left section (Form Area) */}
        <div className="lg:w-1/2 mt-10 md:mt-10 lg:mt-0 p-10 lg:p-40 flex flex-col justify-center">
          <Outlet />
        </div>

        {/* Right section (Image Area) */}
        <div className="lg:w-1/2 bg-[#fafdf0] flex items-center justify-center">
          <img src={auth} alt="Illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
