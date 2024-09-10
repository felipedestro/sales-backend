import { CustomerService } from "@/services/customer.services";
import { Request, Response } from "express";

export class CustomerController {
  static async handleCreate(req: Request, res: Response) {
    const { name, document, birthday } = req.body;

    if (!name || !document || !birthday) {
      res.status(400);
      res.send("all data is required");
    } else {
      try {
        const _birthday = new Date(birthday);
        const data = await CustomerService.Create({ name, document, birthday: _birthday });
        res.status(201);
        res.send(data);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { name, document, birthday } = req.body;

    if (!id || !name || !document || !birthday) {
      res.status(400);
      res.send("all data is required");
    } else {
      try {
        const _birthday = new Date(birthday);
        const data = await CustomerService.Update({ id, name, document, birthday: _birthday });
        res.status(200);
        res.send(data);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleDelete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      res.send({ message: "set id for delete" });
    } else {
      try {
        const data = await CustomerService.Delete(id);
        res.status(200);
        res.send(data);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleFindUnique(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      res.send("set id for get register");
    } else {
      try {
        const data = await CustomerService.findUnique(id);
        res.status(200);
        res.send(data);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handleFindMany(_: Request, res: Response) {
    try {
      const data = await CustomerService.findMany();
      res.status(200);
      res.send(data);
    } catch {
      res.status(500);
      res.send("internal server error");
    }
  }
}
