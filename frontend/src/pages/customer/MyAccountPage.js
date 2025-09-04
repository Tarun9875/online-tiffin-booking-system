// src/pages/customer/MyAccountPage.js
import React, { useEffect } from "react";
import { Box, Typography, Avatar, Button, Paper, Grid } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";

const bannerImage = "/assets/images/bg.jpg"; // Banner image

export default function MyAccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/customer-login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    // Render nothing until redirect happens
    return null;
  }

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
              height: "40vh",
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                    px: 2,
                    mt: "-64px", // overlap sticky header
                }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
        >
          My Account
        </Typography>
      </Box>

      {/* Account Info */}
      <Box sx={{ py: 5, px: 2, display: "flex", justifyContent: "center" }}>
        <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Avatar
                src={user.avatar || ""}
                alt={user.name}
                sx={{ width: 100, height: 100, mx: "auto" }}
              />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Grid>

            {/* Actions */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => navigate("/edit-account")}
              >
                Edit Profile
              </Button>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
