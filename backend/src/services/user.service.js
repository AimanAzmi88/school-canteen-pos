import prisma from "../config/prisma.js";

export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};