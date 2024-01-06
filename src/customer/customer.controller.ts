import {Controller, Get} from '@nestjs/common';
import {CustomerService, ICustomer} from "./customer.service";

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    getCustomers(): ICustomer[] {
        return this.customerService.getCustomers();
    }

    @Get()
    getCustomerByID(id: number): ICustomer | undefined {
        return this.customerService.getCustomerByID(id);
    }
}
