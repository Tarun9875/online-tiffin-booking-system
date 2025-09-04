// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Admin Layout
import AdminHeader from "./components/layout/AdminHeader";
//import AdminFooter from "./components/layout/AdminFooter";

// Customer Pages
import HomePage from "./pages/HomePage";
import CustomerLoginPage from "./pages/customer/CustomerLoginPage";
import CustomerRegisterPage from "./pages/customer/CustomerRegisterPage";
import CategoriesPage from "./pages/customer/CategoriesPage";
import TiffinMenuPage from "./pages/customer/TiffinMenuPage";
import OrderPage from "./pages/customer/OrderPage";
import MyOrders from "./pages/customer/MyOrders";
import MyAccountPage from "./pages/customer/MyAccountPage";
import EditMyProfilePage from "./pages/customer/EditMyProfilePage";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageCategoriesPage from "./pages/admin/ManageCategoriesPage";
import ManageTiffinsPage from "./pages/admin/ManageTiffinsPage";
import ManageOrdersPage from "./pages/admin/ManageOrdersPage"; // <-- added
import AdminProfile from "./pages/admin/AdminProfile";
import EditAdminProfilePage from "./pages/admin/EditAdminProfilePage"; // <-- added
import ReportsPage from "./pages/admin/ReportsPage"; // <-- added
import BillPage from "./pages/admin/BillPage"; // <-- added
// Common Pages
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<><Header /><HomePage /></>} />
          <Route path="/customer-login" element={<><Header /><CustomerLoginPage /></>} />
          <Route path="/customer-register" element={<><Header /><CustomerRegisterPage /></>} />
          <Route path="/categories" element={<><Header /><CategoriesPage /></>} />
          <Route path="/customer-tiffin-menu" element={<><Header /><TiffinMenuPage /></>} />
          <Route path="/order" element={<><Header /><OrderPage /></>} />
          <Route path="/my-orders" element={<><Header /><MyOrders /></>} />
          <Route path="/my-account" element={<><Header /><MyAccountPage /></>} />
          <Route path="/edit-account" element={<><Header /><EditMyProfilePage /></>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<><AdminLoginPage /></>} />
          <Route path="/admin/dashboard" element={<><AdminHeader /><AdminDashboardPage /></>} />
          <Route path="/admin/manage-categories" element={<><AdminHeader /><ManageCategoriesPage /></>} />
          <Route path="/admin/manage-tiffins" element={<><AdminHeader /><ManageTiffinsPage /></>} />
          <Route path="/admin/manage-orders" element={<><AdminHeader /><ManageOrdersPage /></>} />
          <Route path="/admin/profile" element={<><AdminHeader /><AdminProfile /></>} />
          <Route path="/admin/edit-profile" element={<><AdminHeader /><EditAdminProfilePage /></>} />
          <Route path="/admin/reports" element={<><AdminHeader /><ReportsPage /></>} />
          <Route path="/admin/billing" element={<><AdminHeader /><BillPage /></>} />   

          
          {/* Common Routes */}
          <Route path="/about-us" element={<><Header /><AboutUsPage /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /></>} />

          {/* Fallback */}
          <Route path="*" element={<><Header /><NotFoundPage /><Footer /></>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
