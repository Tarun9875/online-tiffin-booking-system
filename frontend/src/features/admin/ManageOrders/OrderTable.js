// src/features/admin/ManageOrders/OrderTable.js
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
  DialogActions,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getOrders, updateOrderStatus, deleteOrder } from "../../../api/adminApi";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [status, setStatus] = useState("");

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Open edit status dialog
  const handleOpenDialog = (order) => {
    setEditOrder(order);
    setStatus(order.status || "pending");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditOrder(null);
    setOpenDialog(false);
  };

  // Update order status
  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(editOrder._id, { status });
      fetchOrders();
      handleCloseDialog();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Orders List
      </Typography>

      <Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#90caf9" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>#</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Order ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Tiffins</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total (₹)</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        {order.items?.map((item, idx) => (
                          <Typography key={idx} variant="body2">
                            {item.tiffinName} x {item.quantity}
                          </Typography>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={() => handleOpenDialog(order)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(order._id)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Edit Status Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <Typography variant="subtitle1">Status</Typography>
            <Select
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateStatus}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
