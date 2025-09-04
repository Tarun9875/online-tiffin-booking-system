// src/features/admin/Reports/SalesReport.js
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { getAdminOrders } from "../../../api/adminApi"; // assuming you have an API

export default function SalesReport() {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await getAdminOrders();
      setOrders(res);
      setTotalSales(res.reduce((acc, order) => acc + order.totalAmount, 0));
    }
    fetchData();
  }, []);

  return (
    <Card className="shadow-lg rounded-2xl p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">📊 Sales Report</h2>
        <p>Total Orders: {orders.length}</p>
        <p>Total Sales: ₹{totalSales}</p>
      </CardContent>
    </Card>
  );
}
