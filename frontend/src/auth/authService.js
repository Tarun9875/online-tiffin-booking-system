// src/auth/authService.js
import { adminLogin } from "../api/authApi";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const loginAdmin = async (email, password) => {
  const data = await adminLogin({ email, password });
  // backend should return { token, user }
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  if (data?.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
