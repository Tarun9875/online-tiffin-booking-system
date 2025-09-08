// src/pages/customer/CustomerLoginPage.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth"; // ✅ hook from context

export default function CustomerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Simulated login (replace later with backend API call)
    if (email === "user@example.com" && password === "123456") {
      login({
        name: "John Doe",
        email,
        avatar: "/assets/images/user-avatar.jpg", // default avatar
      });
      navigate("/customer-homepage"); // redirect to homepage
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Customer Login
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link to="/customer/register" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
