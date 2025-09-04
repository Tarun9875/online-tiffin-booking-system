// src/api/authApi.js
import axiosInstance from "./axiosInstance";

export const adminLogin = async (credentials) => {
  // Expecting { email, password }
  const res = await axiosInstance.post("/auth/admin/login", credentials);
  return res.data; // should contain token and user info
};
