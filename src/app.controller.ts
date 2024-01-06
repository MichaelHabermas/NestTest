import { Controller, Get } from '@nestjs/common';
import { AppService, IMessage } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IMessage {
    return this.appService.getHello();
  }
}
