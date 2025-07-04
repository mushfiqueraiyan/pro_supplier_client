import axios from "axios";
import React from "react";
import useAuth from "./GetAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000/`,
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err.status);
      const status = err.status;

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
