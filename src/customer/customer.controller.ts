import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { CustomerService, ICustomer } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(): ICustomer[] {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerByID(@Param('id', ParseIntPipe) id: number): ICustomer | undefined {
    return this.customerService.getCustomerByID(id);
  }

  @Get('acctNum/:acctNum')
  getCustomerByAccountNumber(@Param('acctNum', ParseIntPipe) acctNum: number): ICustomer | undefined {
    return this.customerService.getCustomerByAccountNumber(acctNum);
  }
}
