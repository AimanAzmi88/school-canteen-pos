import { Router } from "express";

import userRoutes from "./user.routes.js";
import menuRoutes from "./menu.routes.js";
import orderRoutes from "./order.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/menus", menuRoutes);
router.use("/orders", orderRoutes);

export default router;