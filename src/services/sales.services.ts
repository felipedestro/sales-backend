import prisma from "@/config/connection";

type salesServiceProps = {
  id?: string;
  date: Date;
  hour: Date;
  total: number;
  order_id: string;
};

export class SalesServices {
  static async Create({ date, hour, total, order_id }: salesServiceProps) {
    const sale = await prisma.sales.create({
      data: {
        date,
        hour,
        total,
        order_id,
      },
    });

    return sale;
  }

  static async Update({ id, date, total, order_id }: salesServiceProps) {
    const sale = await prisma.sales.update({
      data: {
        date,
        total,
        order_id,
      },
      where: {
        id,
      },
    });

    return sale;
  }

  static async Delete(id: string) {
    const sale = await prisma.sales.delete({
      where: {
        id,
      },
    });

    return sale;
  }

  static async findUnique(id: string) {
    const sale = await prisma.sales.findUnique({
      where: {
        id,
      },
    });

    return sale;
  }

  static async findMany() {
    const sale = await prisma.sales.findMany();
    return sale;
  }
}
