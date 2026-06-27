import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    console.log("Users retrieved:", users); // Log the retrieved users for debugging
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      Number(req.params.id),
      req.body
    );

    res.json({
      success: true,
      message: "Teacher updated",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(Number(req.params.id));

    res.json({
      success: true,
      message: "Teacher deleted",
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

export const sendUserReceipt = async (req, res) => {
  try {

    const result = await orderService.sendUserReceipt(
      Number(req.params.userId)
    );

    res.status(200).json({
      success: true,
      message: "Receipt sent successfully",
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};