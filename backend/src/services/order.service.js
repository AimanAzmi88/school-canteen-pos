import prisma from "../config/prisma.js";
import { sendReceipt } from "./whatsapp.service.js";

export const createOrder = async ({ teacherId, items }) => {
  return await prisma.$transaction(async (tx) => {
    // ==========================
    // Check Teacher
    // ==========================
    const teacher = await tx.user.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    // ==========================
    // Calculate Total
    // ==========================
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await tx.menu.findUnique({
        where: {
          id: item.menuId,
        },
      });

      if (!menu) {
        throw new Error(`Menu ID ${item.menuId} not found`);
      }

      const unitPrice = Number(menu.price);
      const subtotal = unitPrice * item.quantity;

      total += subtotal;

      orderItems.push({
        menuId: menu.id,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });
    }

    // ==========================
    // Create Order
    // ==========================
    let order = await tx.order.create({
      data: {
        teacherId,
        total,
        receiptNo: `TEMP-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
      },
    });

    // ==========================
    // Generate Receipt Number
    // ==========================
    const now = new Date();

    const date =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const receiptNo = `RCP-${date}-${String(order.id).padStart(6, "0")}`;

    order = await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        receiptNo,
      },
    });

    // ==========================
    // Save Order Items
    // ==========================
    await tx.orderItem.createMany({
      data: orderItems.map((item) => ({
        orderId: order.id,
        menuId: item.menuId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
    });

    // ==========================
    // Get Full Receipt
    // ==========================
    const receipt = await tx.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        teacher: true,
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    return receipt;
  });
};

export const getOrders = async () => {
  const orders = await prisma.order.findMany({
    where: {
      isSent: false,
    },
    include: {
      teacher: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const grouped = {};

  for (const order of orders) {
    const userId = order.teacher.id;

    if (!grouped[userId]) {
      grouped[userId] = {
        teacher: {
          id: order.teacher.id,
          name: order.teacher.name,
          phone: order.teacher.phone,
        },
        itemCount: 0,
        total: 0,
      };
    }

    grouped[userId].total += Number(order.total);

    for (const item of order.items) {
      grouped[userId].itemCount += item.quantity;
    }
  }

  return Object.values(grouped);
};

export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
      items: {
        include: {
          menu: true,
        },
      },
    },
  });
};

export const updateOrder = async (id, { teacherId, items }) => {
  return await prisma.$transaction(async (tx) => {
    const teacher = await tx.user.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await tx.menu.findUnique({
        where: {
          id: item.menuId,
        },
      });

      if (!menu) {
        throw new Error(`Menu ID ${item.menuId} not found`);
      }

      const unitPrice = Number(menu.price);
      const subtotal = unitPrice * item.quantity;

      total += subtotal;

      orderItems.push({
        menuId: menu.id,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });
    }

    await tx.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await tx.order.update({
      where: {
        id,
      },
      data: {
        teacherId,
        total,
      },
    });

    await tx.orderItem.createMany({
      data: orderItems.map((item) => ({
        orderId: id,
        menuId: item.menuId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
    });

    return await tx.order.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        items: {
          include: {
            menu: true,
          },
        },
      },
    });
  });
};

export const deleteOrder = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await tx.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await tx.order.delete({
      where: {
        id,
      },
    });

    return {
      message: "Order deleted successfully",
    };
  });
};

export const getUserReceipt = async (userId) => {
  const orders = await prisma.order.findMany({
    where: {
      teacherId: userId,
      isSent: false,
    },
    include: {
      teacher: true,
      items: {
        include: {
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (orders.length === 0) {
    throw new Error("No pending receipt found");
  }

  const teacher = orders[0].teacher;

  let grandTotal = 0;

  const itemMap = new Map();

  for (const order of orders) {
    grandTotal += Number(order.total);

    for (const item of order.items) {
      const key = item.menu.id;

      if (!itemMap.has(key)) {
        itemMap.set(key, {
          menuId: item.menu.id,
          name: item.menu.name,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          subtotal: Number(item.subtotal),
        });
      } else {
        const existing = itemMap.get(key);

        existing.quantity += item.quantity;
        existing.subtotal += Number(item.subtotal);
      }
    }
  }

  return {
      receiptNo: orders[0].receiptNo,

  receiptNos: orders.map((order) => order.receiptNo),
    teacher,
    items: [...itemMap.values()],
    total: grandTotal,
  };
};

export const sendUserReceipt = async (userId) => {
  const receipt = await getUserReceipt(userId);

  await sendReceipt(
    receipt.teacher.phone,
    receipt
  );

  await prisma.order.updateMany({
    where: {
      teacherId: userId,
      isSent: false,
    },
    data: {
      isSent: true,
    },
  });

  return receipt;
};

export const getOrderHistory = async ({
  search = "",
  date = "",
}) => {
  const where = {};

  // ==========================
  // Search Teacher Name
  // ==========================
  if (search) {
    where.teacher = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  // ==========================
  // Filter Date
  // ==========================
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    where.createdAt = {
      gte: start,
      lte: end,
    };
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      teacher: true,
      items: {
        include: {
          menu: true,
        },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,

    receiptNo: order.receiptNo,

    teacher: {
      id: order.teacher.id,
      name: order.teacher.name,
      phone: order.teacher.phone,
    },

    total: Number(order.total),

    itemCount: order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ),

    status: order.isSent ? "Sent" : "Pending",

    isSent: order.isSent,

    createdAt: order.createdAt,

    items: order.items.map((item) => ({
      id: item.id,
      name: item.menu.name,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      subtotal: Number(item.subtotal),
    })),
  }));
};