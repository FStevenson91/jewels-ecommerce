import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';
import { ProductsModule } from '../Products/products.module';
import { UsersModule } from '../Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, User, Product]),
    // Importar los módulos que necesitamos para las dependencias del servicio
    ProductsModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
