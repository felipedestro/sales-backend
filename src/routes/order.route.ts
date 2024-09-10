import { OrderController } from "@/controller/order.controller";
import { Router } from "express";

export const orderRoute = Router();

orderRoute.post("/", OrderController.handleCreate);
