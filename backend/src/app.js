import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";
import userRoutes from "./routes/user.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectWhatsapp } from "./config/whatsapp.js";
import apiRoutes from "./routes/index.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes)
connectWhatsapp();


app.get("/api", async (req, res) => {
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