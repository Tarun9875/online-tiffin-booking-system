import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { getAdminOrders } from "../../api/adminApi";
import BillGenerator from "../../features/admin/Billing/BillGenerator";

export default function BillPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getAdminOrders();
        setOrders(res);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">🧾 Bill Generator</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow mb-4 flex justify-between"
          >
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>
            <BillGenerator order={order} />
          </div>
        ))
      )}
    </AdminLayout>
  );
}
