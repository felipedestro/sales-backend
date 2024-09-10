import { productService } from "@/services/product.services";
import { Request, Response } from "express";

type OrderControllerProps = {
  date: Date;
  customer_id: string;
  orderOnProduct: [
    {
      order_id: string;
      product_id: string;
      quantitative: number;
    }
  ];
};

async function setTotal(product_id: string, quantitative: number) {
  const product = await productService.findUnique(product_id);
  if (product?.stock_id) {
    return quantitative * product?.price;
  } else {
    return 0;
  }
}

export class OrderController {
  static async handleCreate(req: Request, res: Response) {
    const { date, customer_id, orderOnProduct }: OrderControllerProps = req.body;

    const _order = new Array();

    for (let i = 0; i < orderOnProduct.length; i++) {
      _order.push({
        order_id: orderOnProduct[i].order_id,
        product_id: orderOnProduct[i].product_id,
        quantitative: orderOnProduct[i].quantitative,
        total: await setTotal(orderOnProduct[i].product_id, orderOnProduct[i].quantitative),
      });
    }

    res.send(_order);
  }
}
