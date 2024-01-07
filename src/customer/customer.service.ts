import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaGet, PrismaPost } from '../types';

@Injectable()
export class CustomerService {
  protected customer: Prisma.CustomerDelegate;

  constructor(private prisma: PrismaService) {
    this.customer = prisma.customer;
  }

  getCustomers(): PrismaGet<CustomerDto[]> {
    try {
      return this.customer.findMany();
    } catch (e) {
      console.error('Cant get those customers', e);
      throw e;
    }
  }

  getCustomerByID(id: number): PrismaGet<CustomerDto> {
    return this.customer.findUniqueOrThrow({ where: { id } });
  }

  getCustomerByAccountNumber(acctNumber: number): PrismaGet<CustomerDto> {
    return this.customer.findUniqueOrThrow({ where: { acctNumber } });
  }

  getCustomerByName(name: string): PrismaGet<CustomerDto> {
    return this.customer.findFirst({ where: { name } });
  }

  addNewCustomer(newCustomer: CustomerDto): PrismaPost<CustomerDto> {
    return this.customer.create({ data: newCustomer });
  }

  updateCustomer(
    acctNumber: number,
    updatedCustomerData: Omit<Partial<CustomerDto>, 'acctNumber'>,
  ): PrismaPost<CustomerDto> {
    return this.customer.update({
      where: { acctNumber },
      data: updatedCustomerData,
    });
  }

  removeCustomerByAccountNumber(acctNumber: number): PrismaPost<CustomerDto> {
    return this.customer.delete({ where: { acctNumber } });
  }
}
