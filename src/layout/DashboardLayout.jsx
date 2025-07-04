import {
  BikeIcon,
  BoxIcon,
  BoxSelect,
  BoxSelectIcon,
  CheckCircle,
  CreditCard,
  DollarSignIcon,
  Home,
  Package,
  TrainTrack,
  UserCog2,
  UserPlus,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/GetAuth";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, isLoading, refetch } = useUserRole();

  // console.log(user);

  refetch();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none ">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          </div>
          {/* Page content here */}
          <Outlet />
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Home size={18} />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myParcels"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Package size={18} />
                My Parcels
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/transaction"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <CreditCard size={18} />
                Transaction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/track-parcel"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <TrainTrack size={18} />
                Track your parcel
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/riders/pending"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <UserCog2 size={18} />
                    Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/riders/active"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <UserRoundCheck size={18} />
                    Active Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/riders/deactiveRiders"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <UserRoundX size={18} />
                    Deactive Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/make-admin"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <UserPlus size={18} />
                    Make Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/Assign-Rider"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <BikeIcon size={18} />
                    Assign Rider
                  </NavLink>
                </li>
              </>
            )}

            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/pendingDelivery"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <BoxIcon size={18} />
                    Pending Delivery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/completedDelivery"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <CheckCircle size={18} />
                    Completed Delivery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/rider-earnings"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <DollarSignIcon size={18} />
                    Total Earning - Rider
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
