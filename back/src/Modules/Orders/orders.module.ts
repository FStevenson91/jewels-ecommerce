import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../Users/entities/users.entity';
import { Cart } from '../Cart/entities/cart.entity';
import { ProductsModule } from '../Products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, User, Cart]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
