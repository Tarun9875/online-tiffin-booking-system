import React from "react";
import { Box, Typography, Paper, Avatar, Button } from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            alt={user.name}
            src={user.avatar || ""}
            sx={{ width: 100, height: 100 }}
          >
            {!user.avatar && user.name?.charAt(0)}
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body2">Role: {user.role}</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/edit-profile")}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </Paper>
      </Box>
    </AdminLayout>
  );
}
