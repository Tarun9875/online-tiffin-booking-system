// src/pages/customer/EditMyProfilePage.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  TextField,
} from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";

const bannerImage = "/assets/images/bg.jpg"; // same as MyAccountPage and TiffinMenuPage

export default function EditMyProfilePage() {
  const { user, setUser } = useAuth(); // get user and setter from context
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result); // show preview
      reader.readAsDataURL(file);
    }
  };

  // Save changes locally (no backend for now)
  const handleSave = () => {
    setLoading(true);

    const updatedUser = { ...user, name, email, avatar };

    // Update in context + localStorage
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setLoading(false);
    navigate("/my-account");
  };

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          height: { xs: "30vh", md: "40vh" },
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: 2,
          pt: { xs: 10, md: 12 },
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
        >
          Edit Profile
        </Typography>
      </Box>

      {/* Edit Form */}
      <Box sx={{ py: 5, px: 2, display: "flex", justifyContent: "center" }}>
        <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Grid container spacing={3} alignItems="center">
            {/* Avatar */}
            <Grid item xs={12} sx={{ textAlign: "center", position: "relative" }}>
              <Avatar
                src={avatar}
                alt={name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 1,
                  cursor: "pointer",
                  border: "2px solid #1976d2",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => document.getElementById("avatar-upload").click()}
              />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <Typography variant="caption" display="block">
                Click avatar to upload
              </Typography>
            </Grid>

            {/* Name */}
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/my-account")}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
