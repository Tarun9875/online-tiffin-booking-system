// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Pagination,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { getTiffinMenu } from "../../api/customerApi";

const bannerImage = "/assets/images/bg.jpg"; 
const defaultTiffinImage = "/assets/images/tiffin-default.jpg";

export default function HomePage() {
  const [tiffins, setTiffins] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 8; // show 8 per page

  useEffect(() => {
    const fetchTiffins = async () => {
      setLoading(true);
      try {
        const res = await getTiffinMenu(page, limit); // <-- update your API accordingly
        setTiffins(res.data.tiffins || res.data); // adapt to your backend
        setTotal(res.data.total || res.data.length);
      } catch (err) {
        console.error("Error fetching tiffins:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTiffins();
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
          mt: "-64px",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          >
            Fresh & Hygienic Tiffins
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 3, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Delivered right to your doorstep
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/customer-tiffin-menu"
          >
            Explore Menu
          </Button>
        </Box>
      </Box>

      {/* Featured Tiffins Grid */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={4} px={2}>
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{tiffin.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tiffin.description}
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      ₹{tiffin.price}
                    </Typography>
                  </CardContent>
                  <Box textAlign="center" pb={2}>
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      to="/customer-tiffin-menu"
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
