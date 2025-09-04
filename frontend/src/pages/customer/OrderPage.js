import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
//import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { placeOrder } from "../../api/customerApi"; // import mock API

const defaultTiffinImage = "/assets/images/tiffin-default.jpg";

export default function OrderPage() {
  const location = useLocation();
  const tiffin = location.state?.tiffin;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const orderData = {
      tiffinId: tiffin?._id,
      tiffinName: tiffin?.name,
      price: tiffin?.price,
      customerName: name,
      address,
      phone,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await placeOrder(orderData);
      if (res.success) {
        setSuccessMsg(res.message);
        setName("");
        setAddress("");
        setPhone("");
      } else {
        setErrorMsg("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      

      <Box sx={{ py: 5, px: 2, maxWidth: 700, mx: "auto" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Place Your Order
        </Typography>

        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

        {tiffin && (
          <Card sx={{ display: "flex", mb: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 180, height: 180 }}
              image={tiffin.image || defaultTiffinImage}
              alt={tiffin.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{tiffin.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {tiffin.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                ₹{tiffin.price}
              </Typography>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Address" fullWidth required value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Phone Number" fullWidth required value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} />

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
          </Button>
        </form>
      </Box>

      <Footer />
    </Box>
  );
}
