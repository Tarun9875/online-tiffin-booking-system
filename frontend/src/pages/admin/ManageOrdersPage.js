// src/pages/admin/ManageOrdersPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  /* Button, */
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/layout/AdminLayout";
import { getOrders, deleteOrder } from "../../api/adminApi";
import AddOrderForm from "../../features/admin/ManageOrders/OrderTable"; // You need to create this form

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  // Fetch all orders
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

  // Open dialog
  const handleOpenDialog = (order = null) => {
    setEditOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditOrder(null);
    setOpenDialog(false);
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
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Manage Orders
        </Typography>

     {/*    <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => handleOpenDialog()}
        >
          Add Order
        </Button> */}

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
                    <TableCell sx={{ color: "#fff" }}>No.</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Order ID</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Items</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Total Price (₹)</TableCell>
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
                        {order.items?.map((item) => (
                          <div key={item._id}>
                            {item.name} x {item.quantity}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>₹{order.totalPrice}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(order)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(order._id)}
                        >
                          <Delete />
                        </IconButton>
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

        {/* Add/Edit Order Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{editOrder ? "Edit Order" : "Add Order"}</DialogTitle>
          <DialogContent>
            <AddOrderForm
              order={editOrder}
              onClose={handleCloseDialog}
              onRefresh={fetchOrders}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}
