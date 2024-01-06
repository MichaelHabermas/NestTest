import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    CustomerModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
  ],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService, PrismaService],
})
export class AppModule {}
