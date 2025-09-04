import React, { createContext, useState, useEffect, useContext } from "react";

// Mock authService for simulation
export const loginAdmin = async (email, password) => {
  // Simulate backend delay
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

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("token");

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentUser() || null);
  const [token, setToken] = useState(() => getToken() || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setToken(getToken());
    setLoading(false);
  }, []);

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

  const logoutUser = () => {
    logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout: logoutUser, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
