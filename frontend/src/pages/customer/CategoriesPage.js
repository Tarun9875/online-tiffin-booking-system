// src/pages/customer/CategoriesPage.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";

// Static categories data (replace with your images & names)
const categories = [
  { id: "1", name: "Vegetarian", image: "/assets/images/veg.jpg" },
  { id: "2", name: "Non-Vegetarian", image: "/assets/images/non-veg.jpg" },
  { id: "3", name: "Combo Meals", image: "/assets/images/combo.jpg" },
  { id: "4", name: "Snacks", image: "/assets/images/9.jpg" },
  { id: "5", name: "Beverages", image: "/assets/images/snaks.jpg" },
  { id: "6", name: "Specials", image: "/assets/images/momo.jpg" },
];

const bannerImage = "/assets/images/bg.jpg";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to TiffinMenuPage filtered by category
    navigate("/customer-tiffin-menu", { state: { category } });
  };

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
            Choose Your Category
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 3, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Select a category to explore our fresh and hygienic tiffins
          </Typography>
        </Box>
      </Box>

      {/* Category Cards Grid */}
      <Box display="flex" flexDirection="column" alignItems="center" px={2} py={5}>
        <Grid container spacing={3} justifyContent="center" maxWidth={1200}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  width: 280,
                  m: 1,
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h6">{category.name}</Typography>
                </CardContent>
                <Box textAlign="center" pb={2}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleCategoryClick(category)}
                  >
                    Explore
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
