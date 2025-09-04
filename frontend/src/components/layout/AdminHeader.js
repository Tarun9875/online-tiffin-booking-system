// src/components/layout/AdminHeader.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Popper,
  Paper,
  Typography as MuiTypography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/authContext";

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverOpen, setHoverOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Dynamic page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) return "Dashboard";
    if (path.includes("/admin/manage-categories")) return "Manage Categories";
    if (path.includes("/admin/manage-tiffins")) return "Manage Tiffins";
    if (path.includes("/admin/manage-orders")) return "Manage Orders";
    if (path.includes("/admin/reports")) return "Reports"; // ✅ added
    if (path.includes("/admin/profile")) return "My Profile";
    return "Admin Dashboard";
  };

  // Navigation links for header
  const navLinks = [
    { text: "Dashboard", path: "/admin/dashboard" },
    { text: "Manage Categories", path: "/admin/manage-categories" },
    { text: "Manage Tiffins", path: "/admin/manage-tiffins" },
    { text: "Manage Orders", path: "/admin/manage-orders" },
    { text: "Reports", path: "/admin/reports" }, // ✅ added
  ];

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "pink" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>

        {/* Navigation Links */}
        {navLinks.map((link) => (
          <Button
            key={link.text}
            color="inherit"
            onClick={() => navigate(link.path)}
            sx={{
              fontWeight: location.pathname === link.path ? "bold" : "normal",
            }}
          >
            {link.text}
          </Button>
        ))}

        {/* Avatar */}
        {user?.role === "admin" && (
          <Box
            onMouseEnter={(e) => {
              setAnchorEl(e.currentTarget);
              setHoverOpen(true);
            }}
            onMouseLeave={() => setHoverOpen(false)}
          >
            <IconButton sx={{ ml: 2 }}>
              <Avatar
                alt={user.name}
                src={user.avatar || ""}
                sx={{ bgcolor: "secondary.main" }}
              >
                {!user.avatar && user.name?.charAt(0)}
              </Avatar>
            </IconButton>

            <Popper open={hoverOpen} anchorEl={anchorEl} placement="bottom-end">
              <Paper sx={{ p: 2, minWidth: 200 }}>
                <MuiTypography variant="subtitle1">{user.name}</MuiTypography>
                <MuiTypography variant="body2">{user.email}</MuiTypography>
                <Box mt={1} display="flex" justifyContent="space-between">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate("/admin/profile");
                      setHoverOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                  <Button size="small" color="error" onClick={handleLogout}>
                    Logout
                  </Button>
                </Box>
              </Paper>
            </Popper>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
