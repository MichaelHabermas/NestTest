import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaGet, PrismaPost } from '../types';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getCustomers(): PrismaGet<CustomerDto[]> {
    try {
      return this.prisma.customer.findMany();
    } catch (e) {
      console.error('Cant get those customers', e);
      throw e;
    }
  }

  getCustomerByID(id: number): PrismaGet<CustomerDto> {
    return this.prisma.customer.findUniqueOrThrow({ where: { id } });
  }

  getCustomerByAccountNumber(acctNumber: number): PrismaGet<CustomerDto> {
    return this.prisma.customer.findUniqueOrThrow({ where: { acctNumber } });
  }

  getCustomerByName(name: string): PrismaGet<CustomerDto> {
    return this.prisma.customer.findFirst({ where: { name } });
  }

  addNewCustomer(newCustomer: CustomerDto): PrismaPost<CustomerDto> {
    return this.prisma.customer.create({ data: newCustomer });
  }

  updateCustomer(
    acctNumber: number,
    updatedCustomerData: Omit<Partial<CustomerDto>, 'acctNumber'>,
  ): PrismaPost<CustomerDto> {
    return this.prisma.customer.update({
      where: { acctNumber },
      data: updatedCustomerData,
    });
  }

  removeCustomerByAccountNumber(acctNumber: number): PrismaPost<CustomerDto> {
    return this.prisma.customer.delete({ where: { acctNumber } });
  }
}
