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
import { PrismaGet, PrismaPost } from '../types';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(): PrismaGet<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerByID(
    @Param('id', ParseIntPipe) id: number,
  ): PrismaGet<CustomerDto> {
    return this.customerService.getCustomerByID(id);
  }

  @Get('acctNum/:acctNum')
  getCustomerByAccountNumber(
    @Param('acctNum', ParseIntPipe) acctNum: number,
  ): PrismaGet<CustomerDto> {
    return this.customerService.getCustomerByAccountNumber(acctNum);
  }

  @Get('name/:name')
  getCustomerByName(@Param('name') name: string): PrismaGet<CustomerDto> {
    return this.customerService.getCustomerByName(name);
  }

  @Post()
  addNewCustomer(@Body() newCustomer: CustomerDto): PrismaPost<CustomerDto> {
    return this.customerService.addNewCustomer(newCustomer);
  }

  @Patch('patch/:acctNumber')
  updateCustomer(
    @Param('acctNumber', ParseIntPipe) acctNumber: number,
    @Body() updatedCustomerData: Partial<CustomerDto>,
  ): PrismaPost<CustomerDto> {
    if (updatedCustomerData.acctNumber !== undefined) {
      throw new Error('Cannot update Account Number');
    }
    return this.customerService.updateCustomer(acctNumber, updatedCustomerData);
  }

  @Delete('delete/:acctNumber')
  removeCustomerByAccountNumber(
    @Param('acctNumber', ParseIntPipe) acctNumber: number,
  ): PrismaPost<CustomerDto> {
    return this.customerService.removeCustomerByAccountNumber(acctNumber);
  }
}
