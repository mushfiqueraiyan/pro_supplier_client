import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";

const TrackingParcel = () => {
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingId, setTrackingId] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: parcel,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trackParcel", trackingId],
    queryFn: async () => {
      if (!trackingId) return null;
      const res = await axiosSecure.get("track", {
        params: {
          tracking_id: trackingId,
        },
      });
      return res.data;
    },
    enabled: false,
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingInput.trim() === "") return;
    setTrackingId(trackingInput.trim());
    refetch();
  };

  return (
    <div className="p-6  bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        📦 Parcel Tracking
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-10 justify-center"
      >
        <input
          type="text"
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
          placeholder="Enter your Tracking ID"
          className="border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          required
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg px-6 py-3 font-semibold text-lg transition"
        >
          {isLoading ? "Tracking..." : "Track"}
        </button>
      </form>

      {isError && (
        <p className="text-center text-red-600 mb-6 font-medium">
          {error?.response?.status === 404
            ? "No parcel found with that tracking ID."
            : "Failed to fetch parcel. Please try again."}
        </p>
      )}

      {parcel && (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200 ">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 tracking-widest">
            Tracking ID:{" "}
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-lg font-mono">
              {parcel.tracking_id}
            </span>
          </h2>

          <div className="space-y-4 text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Parcel Name:</span>{" "}
              {parcel.parcelName}
            </p>
            <p>
              <span className="font-semibold">Parcel Type:</span>{" "}
              {parcel.parcelType}
            </p>
            <p>
              <span className="font-semibold">Weight:</span>{" "}
              {parcel.parcelWeight} kg
            </p>
            <p>
              <span className="font-semibold">Sender:</span> {parcel.senderName}{" "}
              ({parcel.senderRegion})
            </p>
            <p>
              <span className="font-semibold">Receiver:</span>{" "}
              {parcel.receiverName} ({parcel.receiverRegion})
            </p>

            <p>
              <span className="font-semibold">Delivery Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full font-semibold ${
                  parcel.delivery_status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : parcel.delivery_status === "in_transit"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {parcel.delivery_status}
              </span>
            </p>

            <p>
              <span className="font-semibold">Cost:</span> {parcel.cost} TK
            </p>

            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full font-semibold ${
                  parcel.payment_status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {parcel.payment_status}
              </span>
            </p>

            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(parcel.creation_date).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingParcel;
