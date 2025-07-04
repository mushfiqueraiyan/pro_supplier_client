import React from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/AxiosSecure";
import useAuth from "../hooks/GetAuth";

const CompletedDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const userEmail = user?.email;
  const riderWarehouse = user?.warehouse;

  const {
    isPending,
    error,
    data: deliveries = [],
    refetch,
  } = useQuery({
    queryKey: ["completed-deliveries", userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error("User email not available");
      const res = await axiosSecure.get(
        `/rider/parcels/completed?email=${userEmail}`
      );
      return res.data;
    },
    enabled: !!userEmail,
  });

  const calculateRiderCut = (parcel) => {
    const sameRegion =
      parcel.receiverRegion?.toLowerCase() === riderWarehouse?.toLowerCase();
    const riderCost = parseInt(parcel.cost);
    const cutPercentage = sameRegion ? 0.8 : 0.3;
    return Math.round(riderCost * cutPercentage);
  };

  const isParcelCashedOut = (parcel) => {
    return parcel.cashout_status === "cashed_out";
  };

  const handleCashOut = async (parcel) => {
    try {
      const riderCut = calculateRiderCut(parcel);

      const confirm = await Swal.fire({
        title: `Cash Out`,
        html: `
          You will cash out <b>${riderCut} TK</b> from this delivery.<br/>
          Continue?
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Cash Out",
      });

      if (!confirm.isConfirmed) return;

      // 🔥 Here you'd really call your API to mark this as paid-out
      await axiosSecure.patch(`/rider/parcels/${parcel._id}/cashout`);

      Swal.fire({
        title: "Success",
        text: `You have cashed out ${riderCut} TK.`,
        icon: "success",
      });

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not process cash out", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Completed Deliveries</h1>

      {isPending ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">
          Error loading deliveries: {error.message}
        </div>
      ) : deliveries.length === 0 ? (
        <div className="text-center text-gray-500">
          No completed deliveries.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Receiver
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Region
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cost (TK)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Your Cut (TK)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delivered At
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deliveries.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {parcel.tracking_id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {parcel.receiverName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {parcel.receiverRegion}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{parcel.cost}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {calculateRiderCut(parcel)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(parcel.creation_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {isParcelCashedOut(parcel) ? (
                      <span className="text-red-600 font-medium text-sm">
                        Cashed Out
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCashOut(parcel)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded transition duration-150"
                      >
                        Cash Out
                      </button>
                    )}
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

export default CompletedDelivery;
