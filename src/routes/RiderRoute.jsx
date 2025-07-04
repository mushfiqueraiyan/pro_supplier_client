import React from "react";
import { useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/GetAuth";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user || role !== "rider") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default RiderRoute;
