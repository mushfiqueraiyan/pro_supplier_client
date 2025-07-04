import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Coverage from "../pages/coverage/Coverage.JSX";
import AddParcel from "../pages/AddParcel/AddParcel";
import DashboardLayout from "../layout/DashboardLayout";

import MyParcels from "../pages/dashboard/MyParcels";
import Payment from "../pages/dashboard/payments/Payment";
import Transaction from "../pages/dashboard/Transaction";
import AddRider from "../pages/Rider/AddRider";
import PrivateRoutes from "../routes/PrivateRoutes";
import PendingRiders from "../pages/dashboard/PendingRiders";
import ActiveRiders from "../pages/dashboard/ActiveRiders";
import DeactiveRiders from "../pages/dashboard/DeactiveRiders";
import MakeAdmin from "../pages/dashboard/MakeAdmin";
import AdminRoutes from "./AdminRoutes";
import Forbidden from "../pages/Forbidden";
import AssignRider from "../pages/AssignRider";
import CompletedDelivery from "../pages/CompletedDelivery";
import PendingDelivery from "../pages/PendingDelivery";
import ShowRiderEarnings from "../pages/ShowRiderEarnings";
import TrackingParcel from "../pages/tracking/TrackingParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () => fetch("/serviceCenter.json"),
      },
      {
        path: "/addParcel",
        element: (
          <PrivateRoutes>
            <AddParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch("/serviceCenter.json"),
      },
      {
        path: "/add-rider",
        element: (
          <PrivateRoutes>
            <AddRider />
          </PrivateRoutes>
        ),
        loader: () => fetch("/serviceCenter.json"),
      },
      {
        path: "/forbidden",
        element: (
          <PrivateRoutes>
            <Forbidden />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "myParcels",
        element: (
          <PrivateRoutes>
            <MyParcels />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
      },
      {
        path: "transaction",
        element: (
          <PrivateRoutes>
            <Transaction />
          </PrivateRoutes>
        ),
      },
      {
        path: "riders/pending",
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <PendingRiders />
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "riders/active",
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <ActiveRiders />
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "riders/deactiveRiders",
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <DeactiveRiders />
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoutes>
            <PrivateRoutes>
              <MakeAdmin />
            </PrivateRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "Assign-Rider",
        element: <AssignRider />,
      },
      {
        path: "completedDelivery",
        element: <CompletedDelivery />,
      },
      {
        path: "pendingDelivery",
        element: <PendingDelivery />,
      },
      {
        path: "rider-earnings",
        element: <ShowRiderEarnings />,
      },
      {
        path: "track-parcel",
        element: <TrackingParcel />,
      },
    ],
  },
]);
