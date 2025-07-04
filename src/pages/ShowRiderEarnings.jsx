import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/AxiosSecure";
import useAuth from "../hooks/GetAuth";

const ShowRiderEarnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const riderEmail = user?.email;

  // 1️⃣ Get rider's profile (with warehouse)
  const {
    data: riderProfile,
    isLoading: loadingRider,
    error: errorRider,
  } = useQuery({
    queryKey: ["rider-profile", riderEmail],
    queryFn: async () => {
      if (!riderEmail) throw new Error("No rider email");
      const res = await axiosSecure.get(`/rider/profile?email=${riderEmail}`);
      if (!res.data || !res.data.warehouse)
        throw new Error("Rider profile incomplete");
      return res.data;
    },
    enabled: !!riderEmail,
  });

  // 2️⃣ Get completed deliveries
  const {
    data: deliveries = [],
    isLoading: loadingDeliveries,
    error: errorDeliveries,
  } = useQuery({
    queryKey: ["completed-deliveries", riderEmail],
    queryFn: async () => {
      if (!riderEmail) throw new Error("No rider email");
      const res = await axiosSecure.get(
        `/rider/parcels/completed?email=${riderEmail}`
      );
      return res.data;
    },
    enabled: !!riderEmail,
  });

  // 3️⃣ Earnings Calculations
  const warehouse = riderProfile?.warehouse;

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const calculateRiderCut = (parcel) => {
    if (!warehouse || !parcel?.cost) return 0;
    const sameRegion =
      parcel.receiverCenter?.toLowerCase() === warehouse.toLowerCase();
    const cost = parseInt(parcel.cost) || 0;
    return Math.round(cost * (sameRegion ? 0.8 : 0.3));
  };

  const sumCuts = (filterFn) =>
    deliveries
      .filter(filterFn)
      .reduce((total, parcel) => total + calculateRiderCut(parcel), 0);

  const isCashedOut = (p) => p.cashout_status === "cashed_out";
  const isPendingCashout = (p) => p.cashout_status !== "cashed_out";

  const isDateInRange = (date, start) => {
    if (!date) return false;
    return new Date(date) >= start;
  };

  const totalEarnings = sumCuts(isCashedOut);
  const todaysEarnings = sumCuts(
    (p) => isCashedOut(p) && isDateInRange(p.creation_date, startOfToday)
  );
  const monthEarnings = sumCuts(
    (p) => isCashedOut(p) && isDateInRange(p.creation_date, startOfMonth)
  );
  const yearEarnings = sumCuts(
    (p) => isCashedOut(p) && isDateInRange(p.creation_date, startOfYear)
  );
  const pendingEarnings = sumCuts(isPendingCashout);

  // 4️⃣ UI States
  if (loadingRider || loadingDeliveries) {
    return (
      <div className="text-center text-gray-500">Loading rider earnings...</div>
    );
  }

  if (errorRider || errorDeliveries) {
    return (
      <div className="text-center text-red-500">
        Error: {errorRider?.message || errorDeliveries?.message}
      </div>
    );
  }

  if (!warehouse) {
    return (
      <div className="text-center text-red-500">
        Could not determine rider's warehouse.
      </div>
    );
  }

  // 5️⃣ Final Render
  return (
    <div className=" p-6">
      <h1 className="text-2xl font-bold mb-4">📈 Rider Earnings Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">Warehouse: {warehouse}</p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Earnings</h2>
          <p className="text-xl font-bold text-green-800">{totalEarnings} TK</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Today's Earnings</h2>
          <p className="text-xl font-bold text-blue-800">{todaysEarnings} TK</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">This Month's Earnings</h2>
          <p className="text-xl font-bold text-yellow-800">
            {monthEarnings} TK
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">This Year's Earnings</h2>
          <p className="text-xl font-bold text-purple-800">{yearEarnings} TK</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow col-span-1 sm:col-span-2">
          <h2 className="text-lg font-semibold">Pending Earnings</h2>
          <p className="text-xl font-bold text-red-800">{pendingEarnings} TK</p>
        </div>
      </div>
    </div>
  );
};

export default ShowRiderEarnings;
