import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomers(): Promise<CustomerDto[]> {
    try {
      return this.prisma.customer.findMany();
    } catch (e) {
      console.error('Cant get those customers', e);
      throw e;
    }
  }

  // getCustomerByID(id: number): CustomerDto | undefined {
  //   return this.prisma.customer.find((customer) => customer.id === id);
  // }
  //
  // getCustomerByAccountNumber(acctNum: number): CustomerDto | undefined {
  //   return this.prisma.customer.find(({ acctNumber }) => acctNumber === acctNum);
  // }
  //
  // getCustomerByName(name: string): CustomerDto | undefined {
  //   return this.prisma.customer.find((customer) => customer.name === name);
  // }
}
