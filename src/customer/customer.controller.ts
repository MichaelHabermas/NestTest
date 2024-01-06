import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  // @Get(':id')
  // getCustomerByID(
  //   @Param('id', ParseIntPipe) id: number,
  // ): CustomerDto | undefined {
  //   return this.customerService.getCustomerByID(id);
  // }
  //
  // @Get('acctNum/:acctNum')
  // getCustomerByAccountNumber(
  //   @Param('acctNum', ParseIntPipe) acctNum: number,
  // ): CustomerDto | undefined {
  //   return this.customerService.getCustomerByAccountNumber(acctNum);
  // }
  //
  // @Get('name/:name')
  // getCustomerByName(@Param('name') name: string): CustomerDto | undefined {
  //   return this.customerService.getCustomerByName(name);
  // }
}
