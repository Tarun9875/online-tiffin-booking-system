// src/pages/admin/AdminDashboardPage.js
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import DashboardStats from "../../features/admin/Dashboard/DashboardStats";
import RecentOrders from "../../features/admin/Dashboard/RecentOrders";

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <DashboardStats />
      <RecentOrders />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
