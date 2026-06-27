import * as menuService from "../services/menu.service.js";

export const createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body);

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenus = async (req, res) => {
  try {
    const { category, type } = req.query;

    const menus = await menuService.getMenus(
      category,
      type
    );

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await menuService.getMenuById(Number(req.params.id));

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const menu = await menuService.updateMenu(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await menuService.deleteMenu(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};