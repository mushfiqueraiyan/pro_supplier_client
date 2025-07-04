import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";
import Swal from "sweetalert2";

const DeactiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: deactivateRider = [],
    refetch,
  } = useQuery({
    queryKey: ["deactivateRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("riders/deactivated");
      return res.data;
    },
  });

  const handleReactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Re-activate Rider?",
      text: "Are you sure you want to Re-activate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Re-activate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`riders/${id}/status`, {
        status: "Active",
      });

      await Swal.fire({
        icon: "success",
        title: "Rider Re-activated successfully!",
      });

      refetch();
    } catch (err) {
      Swal.fire("Error", "Could not Re-activate rider", "error");
    }
  };

  // Loading and data management

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (deactivateRider.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No Deactivate riders found.
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 h-screen">
      <h1 className="font-bold text-3xl">Deactivated Riders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full mt-5 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-xs uppercase text-gray-500 px-4 py-3">
                Name
              </th>
              <th className="text-xs uppercase text-gray-500 px-4 py-3">Age</th>
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
            {deactivateRider.map((rider) => (
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
                  <span className="bg-red-500 text-white py-2 px-4 rounded-3xl">
                    {rider.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleReactivate(rider._id)}
                    className="bg-green-500 hover:bg-green-600  text-xs font-medium py-1 px-3 rounded transition duration-150"
                  >
                    Re-activate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeactiveRiders;
