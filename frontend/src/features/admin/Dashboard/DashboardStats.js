// src/features/admin/Dashboard/DashboardStats.js
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const stats = [
  { title: "Total Users", value: 120 },
  { title: "Total Orders", value: 350 },
  { title: "Available Tiffins", value: 50 },
  { title: "Revenue", value: "$15,000" },
];

const DashboardStats = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Paper sx={{ p: 3, textAlign: "center" }} elevation={3}>
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;
