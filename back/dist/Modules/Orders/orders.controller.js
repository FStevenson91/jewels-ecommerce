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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const orders_entity_1 = require("./entities/orders.entity");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto) {
        return this.ordersService.createOrderFromCart(createOrderDto.userId);
    }
    findAll() {
        return this.ordersService.findAll();
    }
    findOne(id) {
        return this.ordersService.findOne(id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new order from a user's cart" }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The order has been successfully created.',
        type: orders_entity_1.Order,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request, e.g., empty cart or insufficient stock',
    }),
    (0, swagger_1.ApiBody)({
        type: create_order_dto_1.CreateOrderDto,
        examples: {
            a: {
                summary: 'Example Order Creation',
                value: {
                    userId: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all orders' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved a list of all orders.',
        type: [orders_entity_1.Order],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single order by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the order',
        example: 'f8e0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved the order.',
        type: orders_entity_1.Order,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map