// D:\Internship Work\project\online-tiffin-app\src\features\admin\ManageCategories\CategoryList.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCategoryForm from "./AddCategoryForm";
import { getCategories, deleteCategory } from "../../../api/adminApi";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open dialog
  const handleOpenDialog = (category = null) => {
    setEditCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditCategory(null);
    setOpenDialog(false);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenDialog()}
      >
        Add Category
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
                  <TableCell sx={{ color: "#fff" }}>Type</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, index) => (
                  <TableRow key={cat._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{cat._id}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.type || "-"}</TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
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
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(cat)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(cat._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Add/Edit Category Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editCategory ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <AddCategoryForm
            category={editCategory}
            onClose={handleCloseDialog}
            onRefresh={fetchCategories}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
