import prisma from "@/config/connection";

type orderOnProductProps = [
  {
    order_id: string;
    product_id: string;
    quantitative: number;
    total: number;
  }
];

export class OrderOnProductsService {
  static async CreateMany(orderOnProducts: orderOnProductProps) {
    const orderOnProduct = prisma.orderOnProducts.createMany({
      data: orderOnProducts,
      skipDuplicates: true,
    });

    return orderOnProduct;
  }

  static async update(orderOnProducts: orderOnProductProps, order_id: string) {
    const orderOnProduct = prisma.orderOnProducts.updateMany({
      data: orderOnProducts,
      where: {
        order_id,
      },
    });

    return orderOnProduct;
  }
}
