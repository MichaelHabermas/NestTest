import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getCustomers(): Promise<CustomerDto[]> {
    try {
      return this.prisma.customer.findMany();
    } catch (e) {
      console.error('Cant get those customers', e);
      throw e;
    }
  }

  getCustomerByID(id: number): Promise<CustomerDto | undefined> {
    return this.prisma.customer.findUniqueOrThrow({ where: { id } });
  }

  getCustomerByAccountNumber(
    acctNumber: number,
  ): Promise<CustomerDto | undefined> {
    return this.prisma.customer.findUniqueOrThrow({ where: { acctNumber } });
  }

  getCustomerByName(
    name: string,
  ): Prisma.Prisma__CustomerClient<CustomerDto | null, null, DefaultArgs> {
    return this.prisma.customer.findFirst({ where: { name } });
  }

  addNewCustomer(
    newCustomer: CustomerDto,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    return this.prisma.customer.create({ data: newCustomer });
  }

  updateCustomer(
    acctNumber: number,
    updatedCustomerData: Omit<Partial<CustomerDto>, 'acctNumber'>,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    return this.prisma.customer.update({
      where: { acctNumber },
      data: updatedCustomerData,
    });
  }

  removeCustomerByAccountNumber(
    acctNumber: number,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    return this.prisma.customer.delete({ where: { acctNumber } });
  }
}
