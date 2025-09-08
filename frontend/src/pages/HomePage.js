// src/pages/HomePage.js
import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth"; // 🔑 use Auth context

export default function HomePage() {
  const { user } = useAuth(); 
  const isLoggedIn = Boolean(user);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          background: "linear-gradient(to right, #ff9800, #f44336)",
          color: "white",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Online Tiffin Service
        </Typography>
        <Typography variant="h6" gutterBottom>
          Delicious homemade meals delivered to your doorstep
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to={isLoggedIn ? "/customer-tiffin-menu" : "/customer-login"}
          sx={{ mt: 2, bgcolor: "white", color: "#f44336" }}
        >
          Explore Menu
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: "Healthy Meals", desc: "Nutritious and balanced homemade food" },
            { title: "Affordable", desc: "Pocket-friendly tiffin plans" },
            { title: "Doorstep Delivery", desc: "On-time delivery at your location" },
          ].map((feature, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box sx={{ textAlign: "center", py: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" gutterBottom>
          Ready to taste delicious meals?
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to={isLoggedIn ? "/customer-tiffin-menu" : "/customer-login"}
        >
          Order Now
        </Button>
      </Box>
    </Box>
  );
}
