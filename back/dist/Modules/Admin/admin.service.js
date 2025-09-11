"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../Users/entities/users.entity");
const products_entity_1 = require("../Products/entities/products.entity");
const orders_entity_1 = require("../Orders/entities/orders.entity");
let AdminService = class AdminService {
    usersRepository;
    productsRepository;
    ordersRepository;
    constructor(usersRepository, productsRepository, ordersRepository) {
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
        this.ordersRepository = ordersRepository;
    }
    async getDashboardSummary() {
        const [userCount, productCount, orderCount] = await Promise.all([
            this.usersRepository.count(),
            this.productsRepository.count(),
            this.ordersRepository.count(),
        ]);
        const latestOrders = await this.ordersRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
            take: 5,
        });
        return {
            userCount,
            productCount,
            orderCount,
            latestOrders,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map