import React from "react";
import { Button } from "@mui/material";

export default function BillGenerator({ order }) {
  const handleGenerateBill = () => {
    const billWindow = window.open("", "_blank");
    billWindow.document.write(`
      <h2>Tiffin Service - Bill</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <hr/>
      <p>✅ Thank you for ordering with us!</p>
    `);
    billWindow.print();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleGenerateBill}>
      Generate Bill
    </Button>
  );
}
