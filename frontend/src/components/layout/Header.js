// src/components/layout/Header.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import logo from "../../assets/images/logoe.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Avatar menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Menu links (added "Categories")
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },  // <-- new
    { name: "Menu", path: "/customer-tiffin-menu" },
    { name: "Contact", path: "/contact" },
    ...(!user ? [{ name: "About Us", path: "/about-us" }] : []),
    ...(user ? [{ name: "My Orders", path: "/my-orders" }] : []),
  ];

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#fff" }}
          >
            <Box component="img" src={logo} alt="Logo" sx={{ height: 50, width: 50, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Online Tiffin Delivery
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto", gap: 1 }}>
            {menuLinks.map((link) => (
              <Button
                key={link.name}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{ fontWeight: location.pathname === link.path ? "bold" : "normal" }}
              >
                {link.name}
              </Button>
            ))}

            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                  <Avatar alt={user.name} src={user.avatar || ""} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem
                    onClick={() => {
                      navigate("/my-account");
                      handleMenuClose();
                    }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/customer-login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/customer-register">
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuLinks.map((link) => (
              <ListItem key={link.name} button component={Link} to={link.path}>
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {user ? (
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate("/my-account");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="My Account" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button component={Link} to="/customer-login">
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/customer-register">
                <ListItemText primary="Sign Up" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
