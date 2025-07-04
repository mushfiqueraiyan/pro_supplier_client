import React, { useState } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Eye } from "lucide-react";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isPending,
    data: pendingRiders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("riders/pending");
      return res.data;
    },
  });

  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Approve" : "Rejected"} Application`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`riders/${id}/status`, {
        status: action === "approve" ? "Active" : "Rejected",
        email,
      });

      Swal.fire({
        icon: "success",
        title: `Rider ${action} successfully `,
      });

      refetch();
    } catch (err) {
      Swal.fire("Error, Could not update rider status");
    }
  };

  const handleView = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider-details-modal").showModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Riders</h1>

      {isPending ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : pendingRiders.length === 0 ? (
        <div className="text-center text-gray-500">No pending riders.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Region
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  NID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Warehouse
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRiders.map((rider) => (
                <tr key={rider._id}>
                  <td className="px-4 py-2 whitespace-nowrap">{rider.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{rider.age}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{rider.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {rider.region}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{rider.nid}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {rider.contact}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {rider.warehouse}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(rider.create_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => handleView(rider)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded flex items-center space-x-1 transition duration-150"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDecision(rider._id, "approve", rider.email)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded transition duration-150"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleDecision(rider._id, "reject", rider.email)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded transition duration-150"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="rider-details-modal" className="modal">
        <form method="dialog" className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Rider Details</h3>
          {selectedRider ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedRider.name}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {selectedRider.age}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedRider.email}
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {selectedRider.region}
              </p>
              <p>
                <span className="font-semibold">NID:</span> {selectedRider.nid}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {selectedRider.contact}
              </p>
              <p>
                <span className="font-semibold">Warehouse:</span>{" "}
                {selectedRider.warehouse}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(selectedRider.create_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedRider.status}
              </p>
            </div>
          ) : (
            <p>No data to show.</p>
          )}
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default PendingRiders;
