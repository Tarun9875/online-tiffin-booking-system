# 🍱 ONLINE-TIFFIN-BOOKING-SYSTEM

**Delightful Meals, Effortlessly Delivered Every Time**

Built with modern web technologies for an efficient, scalable, and user-friendly meal delivery experience.

---

## 🧰 Built With

- 🟨 JavaScript  
- ⚛️ React  
- 📦 NPM  
- 🧩 JSON  
- 📘 Markdown  
- 🌐 Axios  
- 🧾 React Hook Form  

---

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)

---

## 📝 Overview

The **Online Tiffin Booking System** is a full-stack platform that simplifies meal ordering through a well-structured, modular architecture.  
Built with **React** for the frontend and **Node.js** for the backend, it offers a scalable solution for managing user interactions, orders, and administrative tasks seamlessly.

---

## 💡 Why Online Tiffin Booking System?

This project empowers developers to build and extend a feature-rich online meal delivery service with ease.  
The core features include:

- 🧩 **Modular Architecture:**  
  Clear separation of frontend and backend workflows for streamlined development and deployment.

- 🎨 **Reusable UI Components:**  
  A library of customizable React components like buttons, tables, and cards for consistent UI/UX.

- 🔒 **Secure Authentication:**  
  Role-based access control managed via context, services, and middleware.

- 🌍 **Centralized API Management:**  
  Unified API setup with mock endpoints supporting efficient data handling.

- 👨‍💼 **Admin & Customer Workflows:**  
  Dedicated layouts and pages for seamless navigation and management.

- 🚀 **Performance & Logging:**  
  Built-in tools for monitoring web vitals and centralized logging to ensure reliability.

---

## ⚙️ Getting Started

### ✅ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend data management)

### 🧩 Installation (Step-by-Step Guide)

Follow these detailed steps to set up the **Online Tiffin Booking System** on your local machine.

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-tiffin-booking-system.git
```
> This command downloads the entire project folder, including all frontend and backend files.

#### 2️⃣ Navigate to the Project Directory
```bash
cd online-tiffin-booking-system
```
> Inside this directory, you’ll find folders like `/client` (for React frontend) and `/server` (for backend API using Node.js and Express).

#### 3️⃣ Install Dependencies
**For the backend (Node.js):**
```bash
cd server
npm install
```

**For the frontend (React):**
```bash
cd ../client
npm install
```

#### 4️⃣ Configure the Environment Variables
Create a `.env` file inside the `/server` directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tiffin_booking_system
JWT_SECRET=your_secret_key
```

#### 5️⃣ Run the Backend Server
```bash
npm start
```

#### 6️⃣ Run the Frontend Server
```bash
npm start
```

---

### 🧑‍💻 Usage

Once everything is up and running, you can explore the full system:

1. **Register as a new user** (Customer or Admin)  
   → Customers can browse available tiffins, place orders, and view booking history.  
   → Admins can manage categories, meals, orders, and delivery statuses.

2. **Browse and Order Meals**  
   View daily or weekly tiffin options, select your preferred type (Veg/Non-Veg), and place your order instantly.

3. **Order Management**  
   Both Admin and Customer panels include order management features such as:
   - View all orders  
   - Update order status (Confirmed / Canceled / Pending)  
   - Track delivery

4. **Authentication & Security**  
   The platform uses JWT (JSON Web Token) for secure login and session management.

5. **Responsive Interface**  
   Built with React, the UI is fully responsive and optimized for desktops, tablets, and mobile devices.

---

### 🧪 Testing

```bash
npm test
```

---

### 🧱 Folder Structure

```
online-tiffin-app/
│
├── backend/                        # Node.js + Express backend
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │    └── db.js
│   ├── routes/
│   │    ├── authRoutes.js
│   │    ├── adminRoutes.js
│   │    └── customerRoutes.js
│   ├── controllers/
│   │    ├── authController.js
│   │    ├── adminController.js
│   │    └── customerController.js
│   ├── models/
│   │    ├── User.js
│   │    ├── Order.js
│   │    ├── Tiffin.js
│   │    └── Category.js
│   └── middleware/
│        └── authMiddleware.js
│
├── frontend/                       # React frontend
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/
│   │   │   ├── adminApi.js
│   │   │   ├── customerApi.js
│   │   │   └── authApi.js
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/global.css
│   │   ├── auth/
│   │   │   ├── authContext.js
│   │   │   ├── authService.js
│   │   │   └── useAuth.js
│   │   ├── components/
│   │   │   ├── common/ (Button.js, Input.js, Card.js, Table.js, Spinner.js)
│   │   │   └── layout/ (Header.js, Footer.js, AdminLayout.js, CustomerLayout.js)
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard/ (DashboardStats.js, RecentOrders.js)
│   │   │   │   ├── ManageCategories/ (CategoryList.js, AddCategoryForm.js)
│   │   │   │   ├── ManageTiffins/ (TiffinList.js, AddTiffinForm.js)
│   │   │   │   └── ManageOrders/ (OrderTable.js)
│   │   │   └── customer/
│   │   │       ├── TiffinMenu/ (TiffinCard.js, TiffinSearch.js)
│   │   │       ├── OrderProcess/ (OrderForm.js, OrderConfirmation.js)
│   │   │       ├── OrderHistory/ (MyOrdersList.js)
│   │   │       └── Profile/ (EditProfileForm.js, ChangePasswordForm.js)
│   │   ├── hooks/useApiService.js
│   │   ├── pages/
│   │   │   ├── admin/ (AdminLoginPage.js, AdminDashboardPage.js, ManageCategoriesPage.js, ManageTiffinsPage.js, ManageOrdersPage.js)
│   │   │   ├── customer/ (CustomerLoginPage.js, CustomerRegisterPage.js, TiffinMenuPage.js, OrderPage.js, MyAccountPage.js)
│   │   │   ├── HomePage.js
│   │   │   ├── AboutUsPage.js
│   │   │   ├── ContactPage.js
│   │   │   └── NotFoundPage.js
│   │   ├── routes/ (AppRoutes.js, AdminRoute.js, CustomerRoute.js)
│   │   ├── store/ (slices/userSlice.js, slices/cartSlice.js, store.js)
│   │   ├── utils/ (constants.js, helpers.js)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── README.md
│
├── .gitignore
└── README.md
```

---

### 💾 Database Setup

1. Install MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new database named `tiffin_booking_system`.
3. Update your `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/tiffin_booking_system
   ```
4. Collections will be automatically created for:
   - users
   - tiffins
   - orders
   - categories

---

## ✨ Author

**Project:** Online Tiffin Booking System  
**Created with:** React, Node.js, MongoDB, Axios  
**License:** MIT  

---

> _“Delightful Meals, Effortlessly Delivered Every Time.”_
