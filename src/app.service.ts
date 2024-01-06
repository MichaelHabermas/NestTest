import { Injectable } from '@nestjs/common';

export interface IMessage {
  message: string;
}

@Injectable()
export class AppService {
  getHello(): IMessage {
    return { message: 'Hello World!' };
  }
}
