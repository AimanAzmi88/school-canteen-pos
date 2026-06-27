import * as orderService from "../services/order.service.js";
import { sendReceipt } from "../services/whatsapp.service.js";

export const createOrder = async (req, res) => {
  try {
    const receipt = await orderService.createOrder(req.body);

    // Hantar WhatsApp di background
    // sendReceipt(receipt.teacher.phone, receipt).catch(console.error);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      receipt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(Number(req.params.id));

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      receipt: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUserReceipt = async (req, res) => {
  try {
    const receipt = await orderService.getUserReceipt(
      Number(req.params.userId)
    );

    res.status(200).json({
      success: true,
      receipt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      receipt: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendUserReceipt = async (req, res) => {
  try {
    const receipt = await orderService.sendUserReceipt(
      Number(req.params.userId)
    );

    res.status(200).json({
      success: true,
      message: "Receipt sent successfully",
      receipt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const result = await orderService.deleteOrder(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const history = await orderService.getOrderHistory(req.query);

    res.status(200).json({
      success: true,
      data: history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};