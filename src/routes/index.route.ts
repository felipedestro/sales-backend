import { Router } from "express";
import { customerRouter } from "./controller.route";
import { productRoute } from "./product.route";
import { orderRoute } from "./order.route";
import { stockRoute } from "./stock.route";

const router = Router();

router.use("/customer", customerRouter);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/stocks", stockRoute);

export default router;
