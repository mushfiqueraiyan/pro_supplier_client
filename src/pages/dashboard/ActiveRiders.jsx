import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch active riders
  const {
    data: activeRiders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Handle deactivation
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate Rider?",
      text: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`riders/${id}/status`, {
        status: "Deactivated",
      });

      await Swal.fire({
        icon: "success",
        title: "Rider deactivated successfully!",
      });

      refetch();
    } catch (err) {
      Swal.fire("Error", "Could not deactivate rider", "error");
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Active Riders</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center">
          Error loading riders: {error.message}
        </div>
      ) : activeRiders.length === 0 ? (
        <div className="text-center text-gray-500">No active riders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Name
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Age
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Email
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Region
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Contact
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Warehouse
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Created At
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Status
                </th>
                <th className="text-xs uppercase text-gray-500 px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeRiders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50 space-y-1">
                  <td className="px-4 py-2">{rider.name}</td>
                  <td className="px-4 py-2">{rider.age}</td>
                  <td className="px-4 py-2">{rider.email}</td>
                  <td className="px-4 py-2">{rider.region}</td>
                  <td className="px-4 py-2">{rider.contact}</td>
                  <td className="px-4 py-2">{rider.warehouse}</td>
                  <td className="px-4 py-2">
                    {new Date(rider.create_at).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="bg-green-500 py-2 px-4 rounded-3xl">
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded transition duration-150"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
