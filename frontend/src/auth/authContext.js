import React, { createContext, useState, useEffect, useContext } from "react";

// --- Mock admin auth service (replace with real API later) ---
export const loginAdmin = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        resolve({
          data: {
            user: { id: 1, name: "Admin User", role: "admin" },
            token: "fake-jwt-token",
          },
        });
      } else {
        resolve({});
      }
    }, 500);
  });
};

// Helpers for localStorage
const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getStoredToken = () => localStorage.getItem("token");

// --- Auth Context ---
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());

  useEffect(() => {
    // Sync state with localStorage on mount
    setUser(getStoredUser());
    setToken(getStoredToken());
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await loginAdmin(email, password);

    if (response?.data?.user && response?.data?.token) {
      setUser(response.data.user);
      setToken(response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }

    return response;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Allow manual setAuth (useful after refresh or token refresh)
  const setAuth = ({ user, token }) => {
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
