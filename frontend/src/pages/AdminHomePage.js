import React from "react";
import { useAuth } from "../auth/authContext";
import { Box, Typography } from "@mui/material";

const AdminHomePage = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login as admin to access this page.</div>;

  return (
    <Box>
      <Typography variant="h4">Welcome, {user.name} 👋</Typography>
      <Typography>Use the sidebar to navigate admin features.</Typography>
    </Box>
  );
};

export default AdminHomePage;
