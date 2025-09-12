"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./Modules/Users/users.module");
const products_module_1 = require("./Modules/Products/products.module");
const orders_module_1 = require("./Modules/Orders/orders.module");
const categories_module_1 = require("./Modules/Categories/categories.module");
const cart_module_1 = require("./Modules/Cart/cart.module");
const admin_module_1 = require("./Modules/Admin/admin.module");
const config_1 = require("@nestjs/config");
const logger_middleware_1 = require("./middleware/logger.middleware");
const TypeOrm_config_1 = require("./Config/TypeOrm.config");
const auth_module_1 = require("./Modules/Auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [TypeOrm_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const config = configService.get('typeorm');
                    return {
                        ...config,
                        autoLoadEntities: true,
                    };
                },
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            categories_module_1.CategoriesModule,
            cart_module_1.CartModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map