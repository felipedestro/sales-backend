import { StockService } from "@/services/stock.services";
import { Request, Response } from "express";

export class StockController {
  static async handleCreate(req: Request, res: Response) {
    const { name, quantitative } = req.body;
    if (!name || !quantitative) {
      res.status(400);
      res.send("all data is required");
    } else {
      try {
        const stock = await StockService.Create({ name, quantitative });
        res.status(201);
        res.send(stock);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { name, quantitative } = req.body;
    if (!name || quantitative) {
      res.status(400);
      res.send("all data is required");
    } else {
      try {
        const stock = await StockService.Update({ id, name, quantitative });
        res.status(200);
        res.send(stock);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleDelete(req: Request, res: Response) {
    const { id } = req.params;
    const _stock = await StockService.findUnique(id);
    if (!_stock) {
      res.status(404);
      res.send("request id not found");
    } else {
      try {
        const stock = await StockService.Delete(id);
        res.status(200);
        res.send(stock);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleFindUnique(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const stock = await StockService.findUnique(id);
      res.status(200);
      res.send(stock);
    } catch {
      res.status(500);
      res.send("internal server error");
    }
  }

  static async handleFindMany(_: Request, res: Response) {
    try {
      const stock = await StockService.findMany();
      res.status(201);
      res.send(stock);
    } catch {
      res.status(500);
      res.send("internal server error");
    }
  }
}
