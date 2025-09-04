// src/pages/ContactPage.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from "@mui/material";
//import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError("Please fill in all fields.");
            return;
        }

        // Simulate form submission
        console.log("Contact Form Submitted:", formData);
        setSuccess(true);
        setError("");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Box>
            

            <Box sx={{ py: 5, px: 2, maxWidth: 800, mx: "auto" }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Contact Us
                </Typography>

                <Grid container spacing={4}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, boxShadow: 3 }}>
                            {success && <Alert severity="success" sx={{ mb: 2 }}>Message sent successfully!</Alert>}
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Send Message
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Our Address
                            </Typography>
                            <Typography>123, Tiffin Street</Typography>
                            <Typography>City, State, 123456</Typography>

                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Email
                            </Typography>
                            <Typography>support@tiffindelivery.com</Typography>

                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Phone
                            </Typography>
                            <Typography>+91 98765 43210</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Footer />
        </Box>
    );
}
