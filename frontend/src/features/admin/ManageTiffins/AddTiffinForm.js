// src/features/admin/ManageTiffins/AddTiffinForm.js
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { createTiffin, updateTiffin, getCategories } from "../../../api/adminApi";

export default function AddTiffinForm({ tiffin, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fill form if editing
  useEffect(() => {
    if (tiffin) {
      setFormData({
        name: tiffin.name || "",
        description: tiffin.description || "",
        price: tiffin.price || "",
        category: tiffin.category?._id || "",
        image: tiffin.image || "",
      });
      setImagePreview(tiffin.image || "");
    }
  }, [tiffin]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      if (tiffin) {
        await updateTiffin(tiffin._id, data);
      } else {
        await createTiffin(data);
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Error saving tiffin:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        {/* Tiffin Name */}
        <TextField
          fullWidth
          label="Tiffin Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Category Selector */}
        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name} ({cat.type})
            </MenuItem>
          ))}
        </TextField>

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />

        {/* Price */}
        <TextField
          fullWidth
          label="Price (₹)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <Box>
          <Button variant="contained" component="label" fullWidth>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {imagePreview && (
            <Box mt={2}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  marginTop: "8px",
                  borderRadius: "4px",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {tiffin ? "Update" : "Add"} Tiffin
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
