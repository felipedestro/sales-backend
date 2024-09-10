import prisma from "@/config/connection";

type orderServiceProps = {
  date: Date;
  customer_id: string;
};

export class OrderService {
  static async Create({ date, customer_id }: orderServiceProps) {
    const order = await prisma.order.create({
      data: {
        date,
        customer_id,
      },
    });

    return order.id;
  }

  static async Delete(id: string) {
    const order = await prisma.order.deleteMany({
      where: {
        id,
      },
    });

    return order;
  }
}
