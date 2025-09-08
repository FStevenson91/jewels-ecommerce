import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';
import { Order } from '../Orders/entities/orders.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Order])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
