import { CustomerController } from "@/controller/customer.controller";
import { Router } from "express";

export const customerRouter = Router();

customerRouter.post("/", CustomerController.handleCreate);
customerRouter.delete("/:id", CustomerController.handleDelete);
customerRouter.put("/:id", CustomerController.handleUpdate);
customerRouter.get("/", CustomerController.handleFindMany);
customerRouter.get("/:id", CustomerController.handleFindUnique);
