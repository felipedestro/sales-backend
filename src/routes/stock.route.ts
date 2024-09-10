import { StockController } from "@/controller/stock.controller";
import { Router } from "express";

export const stockRoute = Router();

stockRoute.post("/", StockController.handleCreate);
stockRoute.put("/:id", StockController.handleUpdate);
stockRoute.delete("/:id", StockController.handleDelete);
stockRoute.get("/", StockController.handleFindMany);
stockRoute.get("/:id", StockController.handleFindUnique);
