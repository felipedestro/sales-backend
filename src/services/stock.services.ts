import prisma from "@/config/connection";

type stockServiceProprs = {
  id?: string;
  name: string;
  quantitative: number;
};

export class StockService {
  static async Create({ name, quantitative }: stockServiceProprs) {
    const stock = await prisma.stocks.create({
      data: {
        name,
        quantitative,
      },
    });

    return stock;
  }

  static async Update({ id, name, quantitative }: stockServiceProprs) {
    const stock = await prisma.stocks.update({
      data: {
        name,
        quantitative,
      },
      where: {
        id,
      },
    });

    return stock;
  }

  static async Delete(id: string) {
    const stock = await prisma.stocks.delete({
      where: {
        id,
      },
    });

    return stock;
  }

  static async findUnique(id: string) {
    const stock = await prisma.stocks.findUnique({
      where: {
        id,
      },
    });

    return stock;
  }

  static async findMany() {
    const stock = await prisma.stocks.findMany();

    return stock;
  }
}
