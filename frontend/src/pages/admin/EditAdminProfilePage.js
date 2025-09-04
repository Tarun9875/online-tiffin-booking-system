// src/pages/admin/EditAdminProfilePage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Avatar,
  Stack,
} from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAuth } from "../../auth/authContext";

export default function EditAdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      const dataToUpdate = { ...formData };
      if (avatarFile) dataToUpdate.avatar = avatarFile;

      await updateProfile(dataToUpdate);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, sm: 4 }, mt: 10 }}>
        <Paper sx={{ maxWidth: 600, margin: "auto", p: { xs: 3, sm: 5 } }}>
          <Typography variant="h5" gutterBottom align="center">
            Edit Admin Profile
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Avatar */}
              <Stack direction="column" alignItems="center" spacing={2} mb={4}>
                <Avatar
                  src={avatarPreview}
                  alt={formData.name}
                  sx={{
                    width: { xs: 80, sm: 120 },
                    height: { xs: 80, sm: 120 },
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("avatar-input").click()}
                >
                  {!avatarPreview && formData.name?.charAt(0)}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-input"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <Typography variant="caption" color="textSecondary">
                  Click avatar to change image
                </Typography>
              </Stack>

              {/* Form Fields */}
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  helperText="Leave blank if you don't want to change password"
                />
              </Stack>

              {success && (
                <Typography color="success.main" sx={{ mt: 2 }} align="center">
                  {success}
                </Typography>
              )}

              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Update Profile
                </Button>
              </Box>
            </form>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
}
