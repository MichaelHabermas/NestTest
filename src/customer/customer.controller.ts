import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CustomerDto | undefined> {
    return this.customerService.getCustomerByID(id);
  }

  @Get('acctNum/:acctNum')
  getCustomerByAccountNumber(
    @Param('acctNum', ParseIntPipe) acctNum: number,
  ): Promise<CustomerDto | undefined> {
    return this.customerService.getCustomerByAccountNumber(acctNum);
  }

  @Get('name/:name')
  getCustomerByName(
    @Param('name') name: string,
  ): Prisma.Prisma__CustomerClient<CustomerDto | null, null, DefaultArgs> {
    return this.customerService.getCustomerByName(name);
  }

  @Post()
  addNewCustomer(
    @Body() newCustomer: CustomerDto,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    return this.customerService.addNewCustomer(newCustomer);
  }

  @Patch('patch/:acctNumber')
  updateCustomer(
    @Param('acctNumber', ParseIntPipe) acctNumber: number,
    @Body() updatedCustomerData: Partial<CustomerDto>,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    if (updatedCustomerData.acctNumber !== undefined) {
      throw new Error('Cannot update Account Number');
    }
    return this.customerService.updateCustomer(acctNumber, updatedCustomerData);
  }

  @Delete('delete/:acctNumber')
  removeCustomerByAccountNumber(
    @Param('acctNumber', ParseIntPipe) acctNumber: number,
  ): Prisma.Prisma__CustomerClient<CustomerDto, never, DefaultArgs> {
    return this.customerService.removeCustomerByAccountNumber(acctNumber);
  }
}
