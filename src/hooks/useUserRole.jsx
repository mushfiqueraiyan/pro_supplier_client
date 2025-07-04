import React from "react";
import useAuth from "./GetAuth";
import useAxiosSecure from "./AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loader: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return "user";
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
    enabled: !authLoading && !!user?.email,
  });

  return { role, isLoading, isError, error, refetch };
};

export default useUserRole;
