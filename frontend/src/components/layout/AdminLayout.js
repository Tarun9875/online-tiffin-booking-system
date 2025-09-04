// src/components/layout/AdminLayout.js
import React from "react";
import { Box, Drawer, Toolbar, List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/admin/dashboard" },
    { text: "Manage Categories", path: "/admin/manage-categories" },
    { text: "Manage Tiffins", path: "/admin/manage-tiffins" },
    { text: "Manage Orders", path: "/admin/manage-orders" },
    { text: "Reports", path: "/admin/reports" },   // ✅ Added Reports
    { text: "Billing", path: "/admin/billing" },   // ✅ Optional: Added Billing
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                key={item.text}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <AdminHeader />
        <Toolbar /> {/* spacing */}
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
