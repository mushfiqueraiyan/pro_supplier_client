import React, { useState } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { UserMinus2, UserPlus2 } from "lucide-react";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchUsers", emailQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`users/role/${id}`, { role }),

    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove Admin" : "Make Admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
    } catch (err) {
      Swal.fire("Error", "Failed to update user role", "error");
      console.log(err);
    }
  };

  return (
    <div className="p-0 md:p-10">
      <h1 className="font-bold text-3xl mb-5">Make Admin</h1>
      <div className="mb-5">
        <input
          type="search"
          className="input border rounded px-3 py-2 w-80"
          placeholder="Search by Email"
          onChange={(e) => setEmailQuery(e.target.value)}
          value={emailQuery}
        />
      </div>

      {/* {isFetching && <p className="text-gray-500">Loading users...</p>} */}
      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-red-500">No users found</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Photo</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-2">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        handleRoleChange(user._id, user.role || "user")
                      }
                      className={`btn btn-sm text-black ${
                        user.role === "admin"
                          ? "btn-error"
                          : "btn-primary text-white"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <>
                          <UserMinus2 className="mr-1" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <UserPlus2 className="mr-1" />
                          Make Admin
                        </>
                      )}
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

export default MakeAdmin;
