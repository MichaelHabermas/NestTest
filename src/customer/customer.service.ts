import { Injectable } from '@nestjs/common';

export interface ICustomer {
  id: number;
  name: string;
  acctNumber: number;
}

const data: ICustomer[] = [
  {
    id: 1,
    name: 'Bob Be',
    acctNumber: 356789,
  },
  {
    id: 2,
    name: 'Helen Sue',
    acctNumber: 425727,
  },
  {
    id: 3,
    name: 'Jimmy Dean',
    acctNumber: 247966,
  },
];

@Injectable()
export class CustomerService {
  constructor() {}

  getCustomers(): ICustomer[] {
    return data;
  }

  getCustomerByID(id: number): ICustomer | undefined {
    return data.find((customer) => customer.id === id);
  }

  getCustomerByAccountNumber(acctNum: number): ICustomer | undefined {
    return data.find(({ acctNumber }) => acctNumber === acctNum);
  }
}
