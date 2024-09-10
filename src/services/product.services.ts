import prisma from "@/config/connection";

type productProps = {
  id?: string;
  name_product: string;
  description: string;
  price: number;
  id_stock?: string;
  quantitative?: number;
  name_stock?: string;
};

export class productService {
  static async Create({ name_product, description, price, id_stock }: productProps) {
    const product = await prisma.products.create({
      data: {
        name: name_product,
        description,
        price,
        stock_id: id_stock!,
      },
    });

    return product;
  }

  static async Update({ id, name_product, description, price, id_stock }: productProps) {
    const product = await prisma.products.update({
      data: {
        name: name_product,
        description,
        price,
        stock_id: id_stock!,
      },
      where: {
        id,
        AND: {
          stock_id: id_stock,
        },
      },
    });

    return product;
  }

  static async CreateProductAndStock({ name_product, description, price, quantitative, name_stock }: productProps) {
    if (!quantitative) {
      return new Error("quantitative is required");
    }
    const product = await prisma.products.create({
      data: {
        name: name_product,
        description,
        price,
        stock: {
          create: {
            name: name_stock!,
            quantitative,
          },
        },
      },
    });

    return product;
  }

  static async UpdateProductAndStock({
    id,
    name_product,
    description,
    price,
    id_stock,
    quantitative,
    name_stock,
  }: productProps) {
    const product = await prisma.products.update({
      data: {
        name: name_product,
        description,
        price,
        stock: {
          update: {
            name: name_stock,
            quantitative,
          },
        },
      },
      where: {
        id,
        AND: {
          stock_id: id_stock,
        },
      },
    });

    return product;
  }

  static async Delete(id: string) {
    const product = await prisma.products.delete({
      where: {
        id,
      },
    });

    return product;
  }

  static async findUnique(id: string) {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        description: true,
        price: true,
        stock_id: true,
        stock: {
          select: {
            name: true,
            quantitative: true,
          },
        },
      },
    });

    return product;
  }

  static async findMany() {
    const product = await prisma.products.findMany({
      select: {
        name: true,
        description: true,
        price: true,
        stock_id: true,
        stock: {
          select: {
            name: true,
            quantitative: true,
          },
        },
      },
    });

    return product;
  }

  static async findProductByStock(stock_id: string) {
    const product = await prisma.products.findFirst({
      where: {
        stock_id,
      },
    });

    return product;
  }
}
