import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getUserReceipt,
  sendUserReceipt,
  updateOrder,
  deleteOrder,
  getOrderHistory,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/", getOrders);
router.get("/history", getOrderHistory);
router.get("/user/:userId", getUserReceipt);

router.post("/send-receipt/:userId", sendUserReceipt);

router.get("/:id", getOrderById);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);


export default router;