import prisma from "@/config/connection";

type customerServiceProprs = {
  id?: string;
  name: string;
  document: string;
  birthday: Date;
};

export class CustomerService {
  static async Create({ name, document, birthday }: customerServiceProprs) {
    const customer = await prisma.customer.create({
      data: {
        name,
        document,
        birthday,
      },
    });

    return customer;
  }

  static async Update({ id, name, document, birthday }: customerServiceProprs) {
    const customer = await prisma.customer.update({
      data: {
        name,
        document,
        birthday,
      },
      where: {
        id,
      },
    });

    return customer;
  }

  static async Delete(id: string) {
    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return customer;
  }

  static async findUnique(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  static async findMany() {
    const customer = await prisma.customer.findMany();
    return customer;
  }
}
