// src/pages/customer/TiffinMenuPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { getTiffinMenu } from "../../api/customerApi";

const defaultTiffinImage = "/assets/images/tiffin-default.jpg";
const bannerImage = "/assets/images/bg.jpg"; // same as HomePage

export default function TiffinMenuPage() {
  const [tiffins, setTiffins] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const limit = 8; // items per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // API should support pagination like: /tiffins?limit=8&skip=(page-1)*limit
        const res = await getTiffinMenu(page, limit);
        setTiffins(res.data.tiffins || res.data); // adapt to your backend
        setTotal(res.data.total || res.data.length);
      } catch (err) {
        console.error("Error fetching tiffins:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

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
        <Box>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          >
            Our Tiffin Menu
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 3, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Fresh & Hygienic Meals Delivered to Your Doorstep
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/customer-tiffin-menu")}
          >
            Explore Menu
          </Button>
        </Box>
      </Box>

      {/* Page Description */}
      <Box sx={{ py: 5, px: 2, textAlign: "center" }}>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
        >
          Explore our fresh and hygienic tiffins, delivered right to your doorstep.
          Click "Order Now" to get started!
        </Typography>
      </Box>

      {/* Tiffin Cards Grid */}
      <Box display="flex" flexDirection="column" alignItems="center" px={2} pb={5}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center" maxWidth={1200}>
            {tiffins.map((tiffin) => (
              <Grid item key={tiffin._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: 280,
                    m: 1,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={tiffin.image || defaultTiffinImage}
                    alt={tiffin.name}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h6">{tiffin.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tiffin.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "primary.main", mt: 1 }}
                    >
                      ₹{tiffin.price}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" pb={2}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate("/order", { state: { tiffin } })}
                    >
                      Order Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box mt={3}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(e, val) => setPage(val)}
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
