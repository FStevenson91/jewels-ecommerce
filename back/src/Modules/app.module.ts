import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { OrdersModule } from './Orders/orders.module';
import { CategoriesModule } from './Categories/categories.module';
import { CartModule } from './Cart/cart.module';
import { AdminModule } from './Admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario', // Cambia 'tu_usuario' por el usuario de tu BD
      password: 'tu_contraseña', // Cambia 'tu_contraseña' por la contraseña de tu BD
      database: 'ecommerce_db', // Cambia 'ecommerce_db' por el nombre de tu BD
      autoLoadEntities: true,
      synchronize: true, // ¡ATENCIÓN! Usar solo en desarrollo, no en producción
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CartModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
