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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./entities/orders.entity");
const users_entity_1 = require("../Users/entities/users.entity");
const cart_entity_1 = require("../Cart/entities/cart.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const products_service_1 = require("../Products/products.service");
let OrdersService = class OrdersService {
    ordersRepository;
    usersRepository;
    cartRepository;
    productsService;
    constructor(ordersRepository, usersRepository, cartRepository, productsService) {
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.cartRepository = cartRepository;
        this.productsService = productsService;
    }
    async createOrderFromCart(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['cart', 'cart.items', 'cart.items.product'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        if (!user.cart || user.cart.items.length === 0) {
            throw new common_1.BadRequestException('The cart is empty.');
        }
        const order = new orders_entity_1.Order();
        order.user = user;
        order.status = 'pending';
        let totalPrice = 0;
        const orderItems = [];
        for (const cartItem of user.cart.items) {
            const product = cartItem.product;
            if (product.stock < cartItem.quantity) {
                throw new common_1.BadRequestException(`Not enough stock for product "${product.name}". Available: ${product.stock}`);
            }
            const orderItem = new order_item_entity_1.OrderItem();
            orderItem.product = product;
            orderItem.quantity = cartItem.quantity;
            orderItem.price = product.price;
            orderItem.order = order;
            orderItems.push(orderItem);
            await this.productsService.update(product.id, {
                stock: product.stock - cartItem.quantity,
            });
            totalPrice += product.price * cartItem.quantity;
        }
        order.items = orderItems;
        order.totalPrice = totalPrice;
        user.cart.items = [];
        await this.cartRepository.save(user.cart);
        return this.ordersRepository.save(order);
    }
    async findAll() {
        return this.ordersRepository.find({
            relations: ['user', 'items', 'items.product'],
        });
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['user', 'items', 'items.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found.`);
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map