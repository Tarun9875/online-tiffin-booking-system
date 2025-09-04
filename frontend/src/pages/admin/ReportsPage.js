// src/pages/admin/ReportsPage.js
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SalesReport from "../../features/admin/Reports/SalesReport";

export default function ReportsPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">📊 Reports</h1>
      <SalesReport />
    </AdminLayout>
  );
}
