// src/components/layout/Footer.js
import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../auth/authContext";

const Footer = () => {
  const { user } = useAuth(); // Get logged-in user info

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  return (
    <Box sx={{ bgcolor: "#424242", color: "#fff", px: 2, py: 3, mt: 3 }}>
      <Grid container spacing={2} justifyContent="space-between">
        {/* Left Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
            TIFFIN
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
            Tiffin Service Management Software with e-commerce features makes it
            easy to manage your subscription service.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Link href="#" color="inherit"><Facebook fontSize="small" /></Link>
            <Link href="#" color="inherit"><Instagram fontSize="small" /></Link>
            <Link href="#" color="inherit"><Twitter fontSize="small" /></Link>
            <Link href="#" color="inherit"><YouTube fontSize="small" /></Link>
          </Box>
        </Grid>

        {/* Middle Section - Useful Links */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Useful Links
          </Typography>
          <Box sx={{ mt: 0.5, display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover" variant="caption">
              Home
            </Link>
            <Link component={RouterLink} to="/customer-tiffin-menu" color="inherit" underline="hover" variant="caption">
              Menu
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" underline="hover" variant="caption">
              Contact
            </Link>
            <Link component={RouterLink} to="/about-us" color="inherit" underline="hover" variant="caption">
              About Us
            </Link>


            {/* Customer links */}
            {user && !isAdmin && (
              <Link component={RouterLink} to="/my-orders" color="inherit" underline="hover" variant="caption">
                My Orders
              </Link>
            )}

            {/* Login link for unauthenticated users */}
            {!user && (
              <>
             {/*    <Link component={RouterLink} to="/customer-login" color="inherit" underline="hover" variant="caption">
                  Customer Login
                </Link> */}
                <Link component={RouterLink} to="/admin/login" color="inherit" underline="hover" variant="caption">
                  Admin Login
                </Link>
              </>
            )}
          </Box>
        </Grid>

        {/* Right Section - Contact */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 0.5, lineHeight: 1.4 }}>
            +91-9875239438
            <br />
            info@adiyogitechnosoft.com
            <br />
            Plot No 276, Opp. Rajasthan Patrika Office,
            <br />
            Manji Ka Hatha, Paota, Jodhpur
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ mt: 2, pt: 1, textAlign: "center", borderTop: "1px solid #616161" }}>
        <Typography variant="caption">
          © 2025 Online Tiffin App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
