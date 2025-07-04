import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/AxiosSecure";
import useAuth from "../hooks/GetAuth";

const PendingDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  // Fetch rider's pending deliveries
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingDeliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels/pending", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  // Mutation for updating status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcelId, newStatus }) => {
      const res = await axiosSecure.patch(`rider/parcels/${parcelId}/status`, {
        newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingDeliveries"]);
      Swal.fire("Success", "Status updated!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load parcels.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Pending Deliveries</h2>
      {parcels.length === 0 ? (
        <p className="text-gray-500">No pending deliveries assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.sender_center}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>{parcel.delivery_status}</td>
                  <td>
                    {parcel.delivery_status === "assigned" && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          updateStatus({
                            parcelId: parcel._id,
                            newStatus: "in_transit",
                          })
                        }
                      >
                        Start Delivery
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                          updateStatus({
                            parcelId: parcel._id,
                            newStatus: "delivered",
                          })
                        }
                      >
                        Mark Delivered
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

export default PendingDelivery;
