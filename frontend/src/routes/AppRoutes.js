// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import CustomerLayout from "../components/layout/CustomerLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Public / Customer Pages
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import CustomerLoginPage from "../pages/customer/CustomerLoginPage";
import CustomerRegisterPage from "../pages/customer/CustomerRegisterPage";
import TiffinMenuPage from "../pages/customer/TiffinMenuPage";
import OrderPage from "../pages/customer/OrderPage";
import MyAccountPage from "../pages/customer/MyAccountPage";
import CategoriesPage from "../pages/customer/CategoriesPage"; // <-- added

// Admin Pages
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ReportsPage from "../pages/admin/ReportsPage";
import BillPage from "../pages/admin/BillPage";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Customer Routes */}
      <Route
        path="/"
        element={
          <CustomerLayout>
            <HomePage />
          </CustomerLayout>
        }
      />
      <Route
        path="/about"
        element={
          <CustomerLayout>
            <AboutUsPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <CustomerLayout>
            <ContactPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/customer-login"
        element={
          <CustomerLayout>
            <CustomerLoginPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/customer-register"
        element={
          <CustomerLayout>
            <CustomerRegisterPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/categories"   // <-- added
        element={
          <CustomerLayout>
            <CategoriesPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/customer-tiffin-menu"
        element={
          <CustomerLayout>
            <TiffinMenuPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/order"
        element={
          <CustomerLayout>
            <OrderPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/my-account"
        element={
          <CustomerLayout>
            <MyAccountPage />
          </CustomerLayout>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/login"
        element={
          <AdminLayout>
            <AdminLoginPage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        }
      />
      // inside your <Routes>
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/billing" element={<BillPage />} />


        {/* 404 */}
        <Route
          path="*"
          element={
            <CustomerLayout>
              <NotFoundPage />
            </CustomerLayout>
          }
        />
      </Routes>
      );
}
