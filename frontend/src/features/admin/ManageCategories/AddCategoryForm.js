// src/features/admin/ManageCategories/AddCategoryForm.js
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Alert,
  Stack,
  Typography,
  Autocomplete,
} from "@mui/material";
import axiosInstance from "../../../api/axiosInstance";

const AddCategoryForm = ({ category = null, onClose, onRefresh }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Predefined options
  const categoryTypes = ["veg", "non-veg", "vegan", "drinks", "other"];

  // If editing, populate form
  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description || "");
      setValue("type", category.type || "");
      setImagePreview(category.image || null);
    }
  }, [category, setValue]);

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("type", data.type || "");
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (category) {
        await axiosInstance.put(`/admin/categories/${category._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Category updated successfully");
      } else {
        await axiosInstance.post("/admin/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Category added successfully");
        reset();
        setImagePreview(null);
      }

      if (onRefresh) onRefresh();
      if (onClose) setTimeout(onClose, 1000);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to save category"
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%", p: { xs: 1, sm: 2 } }}
    >
      <Stack spacing={2}>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Category Name */}
        <TextField
          fullWidth
          label="Category Name"
          {...register("name", { required: "Category name required" })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
        />

        {/* Category Type with Autocomplete (select OR write custom) */}
        <Controller
          name="type"
          control={control}
          defaultValue=""
          rules={{ required: "Category type is required" }}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={categoryTypes}
              value={field.value || ""}
              onChange={(_, newValue) => field.onChange(newValue)}
              onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category Type"
                  error={!!errors.type}
                  helperText={errors.type && errors.type.message}
                />
              )}
            />
          )}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          {...register("description")}
        />

        {/* Image Upload */}
        <Box>
          <Typography variant="subtitle1">Category Image</Typography>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Box mt={1}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {category ? "Update Category" : "Add Category"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddCategoryForm;
