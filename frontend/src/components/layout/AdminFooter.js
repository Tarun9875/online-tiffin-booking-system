import React from "react";
import { Box, Typography } from "@mui/material";

const AdminFooter = () => (
  <Box sx={{ bgcolor: "#333", color: "#fff", p: 2, textAlign: "center", mt: 3 }}>
    <Typography variant="caption">
      © 2025 Admin Panel. All rights reserved.
    </Typography>
  </Box>
);

export default AdminFooter;
