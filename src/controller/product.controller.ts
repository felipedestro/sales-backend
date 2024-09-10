import { productService } from "@/services/product.services";
import { Request, Response } from "express";

export class ProductController {
  static async handleCreate(req: Request, res: Response) {
    const { name_product, description, price, id_stock, quantitative, name_stock } = req.body;

    if (quantitative && name_stock) {
      try {
        const product = await productService.CreateProductAndStock({
          name_product,
          description,
          price,
          quantitative,
          name_stock,
        });
        res.status(201);
        res.send(product);
      } catch (err) {
        res.status(500);
        console.log(err);
        res.send("internal server error");
      }
    } else {
      if (!name_product || !description || !price || !id_stock) {
        res.status(400);
        res.send("all data is required");
      } else {
        const stock = await productService.findProductByStock(id_stock);
        if (stock) {
          res.status(404);
          res.send("stock already exists and belongs to another product");
        } else {
          try {
            const product = await productService.Create({ name_product, description, price, id_stock });
            res.status(201);
            res.send(product);
          } catch (err) {
            res.status(500);
            res.send("internal server error");
          }
        }
      }
    }
  }

  static async handleUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { name_product, description, price, id_stock, quantitative, name_stock } = req.body;

    if (quantitative && name_stock) {
      try {
        const product = await productService.UpdateProductAndStock({
          id,
          name_product,
          description,
          price,
          quantitative,
          name_stock,
        });
        res.status(200);
        res.send(product);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    } else {
      if (!id || !name_product || !description || !price || !id_stock) {
        res.status(400);
        res.send("all data is required");
      } else {
        try {
          const data = await productService.findUnique(id);
          if (data?.stock_id === id_stock) {
            const product = await productService.Update({ id, name_product, description, price, id_stock });
            res.status(200);
            res.send(product);
          } else {
            res.status(404);
            res.send("stock id does not match");
          }
        } catch {
          res.status(500);
          res.send("internal server error");
        }
      }
    }
  }

  static async handleDelete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      res.send("all data is required");
    } else {
      try {
        const product = await productService.Delete(id);
        res.status(200);
        res.send(product);
      } catch {
        res.status(500);
        res.send("internal server error");
      }
    }
  }

  static async handeFindUnique(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await productService.findUnique(id);
      res.status(200);
      res.send(product);
    } catch {
      res.status(500);
      res.send("internal server error");
    }
  }

  static async handleFindMany(req: Request, res: Response) {
    try {
      const products = await productService.findMany();
      res.status(200);
      res.send(products);
    } catch {
      res.status(500);
      res.send("internal server error");
    }
  }
}
