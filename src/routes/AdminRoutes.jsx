import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/GetAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoutes;
