import React from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { Bike, CheckCircle, Loader2Icon, Truck } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const statusConfig = {
  assigned: {
    label: "Assigned Parcels",
    bg: "bg-yellow-100 text-yellow-800",
    chartColor: "#FACC15",
    icon: <Bike size={30} />,
  },
  in_transit: {
    label: "In Transit",
    bg: "bg-blue-100 text-blue-800",
    chartColor: "#3B82F6",
    icon: <Truck size={30} />,
  },
  delivered: {
    label: "Delivered",
    bg: "bg-green-100 text-green-800",
    chartColor: "#10B981",
    icon: <CheckCircle size={30} />,
  },
  not_collected: {
    label: "Not Collected",
    bg: "bg-orange-200 text-black",
    chartColor: "#F97316",
    icon: <Loader2Icon size={30} />,
  },
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: parcelDetails = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parcelStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels/delivery/status-count");
      return res.data;
    },
  });

  const chartData = parcelDetails.map((item) => ({
    name: statusConfig[item.status]?.label || item.status,
    value: item.count,
    color: statusConfig[item.status]?.chartColor || "#9CA3AF",
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📦 Admin Parcel Dashboard
      </h1>

      {isLoading && <p className="text-center">Loading parcel stats...</p>}
      {isError && (
        <p className="text-center text-red-600">Failed to load data.</p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {parcelDetails.length > 0 ? (
          parcelDetails.map((parcel) => {
            const config = statusConfig[parcel.status] || {
              label: parcel.status,
              bg: "bg-gray-100 text-gray-800",
              icon: null,
            };

            return (
              <div
                key={parcel.status}
                className={`rounded-lg shadow-md p-6 flex flex-col items-center ${config.bg} transition hover:shadow-lg`}
              >
                <div className="mb-4">{config.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{config.label}</h2>
                <p className="text-3xl font-bold">{parcel.count}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full">
            No parcel status data available.
          </p>
        )}

        <div className="md:col-span-3 p-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Status Pie Chart
          </h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No data for chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
