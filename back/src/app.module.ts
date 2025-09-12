import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Modules/Users/users.module';
import { ProductsModule } from './Modules/Products/products.module';
import { OrdersModule } from './Modules/Orders/orders.module';
import { CategoriesModule } from './Modules/Categories/categories.module';
import { CartModule } from './Modules/Cart/cart.module';
import { AdminModule } from './Modules/Admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { DataSourceOptions } from 'typeorm';
import TypeOrmConfig from 'src/Config/TypeOrm.config';
import { AuthModule } from './Modules/Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TypeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DataSourceOptions>('typeorm');
        return {
          ...config,
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CartModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
