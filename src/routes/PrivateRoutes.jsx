import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/GetAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loader } = useAuth();

  const location = useLocation();

  if (loader) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRoutes;
