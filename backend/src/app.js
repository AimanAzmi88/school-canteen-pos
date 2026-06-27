import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";
import userRoutes from "./routes/user.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectWhatsapp } from "./config/whatsapp.js";
// import { sendMessage } from "./services/whatsapp.service.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/orders", orderRoutes);
app.use("/menus", menuRoutes);
app.use("/users", userRoutes);

connectWhatsapp();

// app.get("/test", async (req, res) => {

//     await sendMessage(
//         "601130133441",
//         "🔥 Hello dari School POS!"
//     );

//     res.json({
//         success: true
//     });

// });

app.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Kantin Backend API is running",
      database: {
        status: "Connected ✅",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      database: {
        status: "Disconnected ❌",
      },
      error: error.message,
    });
  }
});

export default app;