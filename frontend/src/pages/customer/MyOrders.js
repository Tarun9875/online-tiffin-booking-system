import React, { useEffect, useState } from "react";
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
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../../auth/useAuth"; // Your auth context
import { getOrders } from "../../api/customerApi"; // Mock API file
//import {Footer} from "../../layout/Footer";
import Footer from "../../components/layout/Footer";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        const res = await getOrders(user.id);
        setOrders(res.data || []);
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      {!loading && orders.length === 0 && !errorMsg && (
        <Typography>No orders found.</Typography>
      )}

      {!loading && orders.length > 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, i) => (
                    <TableRow key={i}>
                      <TableCell>{order.id || i + 1}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {order.items?.map((item, idx) => (
                          <div key={idx}>
                            {item.name || "Item"} × {item.quantity || 1}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>₹{order.totalAmount || 0}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status || "Pending"}
                          color={
                            order.status === "Delivered"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={orders.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      )}
       
     {/* Footer */}
      <Box sx={{ mt: 5 }}>
        <Footer />
      </Box>
    </Box>
  
  );
  
};

export default MyOrders;
