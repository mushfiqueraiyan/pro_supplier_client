import React from "react";

import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/GetAuth";
import AdminDashboard from "./AdminDashboard";
import RiderDashBoard from "./RiderDashBoard";
import UserDashboard from "./UserDashboard";
import Forbidden from "../Forbidden";

const DashboardHome = () => {
  const { role } = useUserRole();
  const { user } = useAuth();

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "rider") {
    return <RiderDashBoard />;
  } else if (role === "user") {
    return <UserDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
