// src/pages/AboutUsPage.js
import React from "react";
import { Box, Typography, Container, Grid, /* Button  */} from "@mui/material";
import Footer from "../components/layout/Footer";

const bannerImage = "/assets/images/bg.jpg"; // Same banner as HomePage

const AboutUsPage = () => {
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
          mt: "-64px" // Negative margin to overlap sticky header
        }}
      >
        <Box>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 3, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Learn more about our mission and vision
          </Typography>
          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            href="/customer-tiffin-menu"
          >
            Explore Menu
          </Button>
         */}</Box>
      </Box>

      {/* About Content */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Our Mission
            </Typography>
            <Typography variant="body1">
              Online Tiffin App is dedicated to delivering fresh and hygienic
              meals right to your doorstep. Our mission is to make daily meals
              convenient, tasty, and healthy for everyone.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Our Vision
            </Typography>
            <Typography variant="body1">
              To become the most trusted tiffin service in the region, providing
              high-quality meals while supporting sustainable practices and
              customer satisfaction.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Optional Extra Section */}
      <Box sx={{ py: 5, px: 2, bgcolor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Why Choose Us
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          maxWidth="800px"
          mx="auto"
        >
          We prioritize hygiene, taste, and timely delivery. Our team ensures
          every meal is prepared with care and meets the highest standards.
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutUsPage;
