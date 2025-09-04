// src/api/adminApi.js
// Mock API for frontend only (no backend needed)

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* -------------------- Orders -------------------- */
let orders = [
  {
    _id: "1",
    customerName: "John Doe",
    totalAmount: 250,
    createdAt: "2025-09-03T10:00:00Z",
    status: "Pending",
  },
  {
    _id: "2",
    customerName: "Jane Smith",
    totalAmount: 300,
    createdAt: "2025-09-03T11:00:00Z",
    status: "Completed",
  },
];

export const getAdminOrders = async () => {
  await delay(300);
  return orders;
};

export const getOrders = getAdminOrders;

export const updateOrderStatus = async (orderId, status) => {
  await delay(200);
  orders = orders.map((o) =>
    o._id === orderId ? { ...o, status } : o
  );
  return { success: true };
};

export const deleteOrder = async (orderId) => {
  await delay(200);
  orders = orders.filter((o) => o._id !== orderId);
  return { success: true };
};

/* -------------------- Categories -------------------- */
let categories = [
  { _id: "c1", name: "Vegetarian" },
  { _id: "c2", name: "Non-Vegetarian" },
];

export const getCategories = async () => {
  await delay(200);
  return categories;
};

export const createCategory = async (data) => {
  const newCat = { _id: Date.now().toString(), ...data };
  categories.push(newCat);
  return newCat;
};

export const updateCategory = async (id, data) => {
  categories = categories.map((c) => (c._id === id ? { ...c, ...data } : c));
  return { success: true };
};

export const deleteCategory = async (id) => {
  categories = categories.filter((c) => c._id !== id);
  return { success: true };
};

/* -------------------- Tiffins -------------------- */
let tiffins = [
  { _id: "t1", name: "Paneer Tiffin", category: "Vegetarian", price: 150 },
  { _id: "t2", name: "Chicken Tiffin", category: "Non-Vegetarian", price: 200 },
];

export const getTiffins = async () => {
  await delay(200);
  return tiffins;
};

export const createTiffin = async (data) => {
  const newTiffin = { _id: Date.now().toString(), ...data };
  tiffins.push(newTiffin);
  return newTiffin;
};

export const updateTiffin = async (id, data) => {
  tiffins = tiffins.map((t) => (t._id === id ? { ...t, ...data } : t));
  return { success: true };
};

export const deleteTiffin = async (id) => {
  tiffins = tiffins.filter((t) => t._id !== id);
  return { success: true };
};

/* -------------------- Reports / Billing -------------------- */
export const getReports = async () => {
  await delay(300);
  return {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "Pending").length,
    completedOrders: orders.filter((o) => o.status === "Completed").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };
};

export const getBill = async (orderId) => {
  await delay(200);
  const order = orders.find((o) => o._id === orderId);
  if (!order) throw new Error("Order not found");
  return {
    orderId: order._id,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    items: [
      { name: "Item 1", price: order.totalAmount / 2 },
      { name: "Item 2", price: order.totalAmount / 2 },
    ],
    status: order.status,
    date: order.createdAt,
  };
};
