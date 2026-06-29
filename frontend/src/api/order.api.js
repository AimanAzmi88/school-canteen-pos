import api from "./axios";

export const getOrders = () => api.get("/orders");

export const getOrder = (id) =>
  api.get(`/orders/${id}`);

export const createOrder = (data) =>
  api.post("/orders", data);

export const sendReceipt = (id) =>
  api.post(`/orders/${id}/send`);

export const getOrderHistory = (params) =>
  api.get("/orders/history", { params });