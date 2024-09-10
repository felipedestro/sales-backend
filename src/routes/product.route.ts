import { ProductController } from "@/controller/product.controller";
import { Router } from "express";

export const productRoute = Router();

productRoute.get("/", ProductController.handleFindMany);
productRoute.get("/:id", ProductController.handeFindUnique);
productRoute.post("/", ProductController.handleCreate);
productRoute.put("/:id", ProductController.handleUpdate);
productRoute.delete("/:id", ProductController.handleDelete);
