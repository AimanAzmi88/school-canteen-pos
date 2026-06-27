import prisma from "../config/prisma.js";

export const createMenu = async (data) => {
  return await prisma.menu.create({
    data,
  });
};

export const getMenus = async (category, type) => {
  const where = {};

  if (category) {
    where.category = category;
  }

  if (type) {
    where.type = type;
  }

  return await prisma.menu.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
};
export const getMenuById = async (id) => {
  return await prisma.menu.findUnique({
    where: {
      id,
    },
  });
};

export const updateMenu = async (id, data) => {
  return await prisma.menu.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteMenu = async (id) => {
  return await prisma.menu.delete({
    where: {
      id,
    },
  });
};