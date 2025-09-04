// src/pages/admin/ManageTiffinsPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TableCell,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/layout/AdminLayout";
import AddTiffinForm from "../../features/admin/ManageTiffins/AddTiffinForm";
import { getTiffins, deleteTiffin } from "../../api/adminApi";

export default function ManageTiffinsPage() {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editTiffin, setEditTiffin] = useState(null);

  // Fetch tiffins from backend
  const fetchTiffins = async () => {
    setLoading(true);
    try {
      const res = await getTiffins();
      setTiffins(res.data || []);
    } catch (err) {
      console.error("Error fetching tiffins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  // Open Add/Edit dialog
  const handleOpenDialog = (tiffin = null) => {
    setEditTiffin(tiffin);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditTiffin(null);
    setOpenDialog(false);
  };

  // Delete tiffin
  const handleDeleteTiffin = async (id) => {
    if (window.confirm("Are you sure you want to delete this tiffin?")) {
      try {
        await deleteTiffin(id);
        fetchTiffins();
      } catch (err) {
        console.error("Error deleting tiffin:", err);
      }
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Manage Tiffins
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => handleOpenDialog()}
        >
          Add Tiffin
        </Button>

        <Paper>
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f48fb1" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>No.</TableCell>
                    <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Price</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tiffins.map((tiffin, index) => (
                    <TableRow key={tiffin._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{tiffin._id}</TableCell>
                      <TableCell>{tiffin.name}</TableCell>
                      <TableCell>{tiffin.description}</TableCell>
                      <TableCell>
                        {tiffin.image ? (
                          <img
                            src={tiffin.image}
                            alt={tiffin.name}
                            style={{
                              width: "80px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>{tiffin.price}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(tiffin)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteTiffin(tiffin._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {tiffins.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No tiffins found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Add/Edit Tiffin Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{editTiffin ? "Edit Tiffin" : "Add Tiffin"}</DialogTitle>
          <DialogContent>
            <AddTiffinForm
              tiffin={editTiffin}
              onClose={handleCloseDialog}
              onRefresh={fetchTiffins}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}
