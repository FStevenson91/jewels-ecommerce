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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const cart_entity_1 = require("./entities/cart.entity");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    addToCart(userId, addToCartDto) {
        return this.cartService.addToCart(userId, addToCartDto);
    }
    getCart(userId) {
        return this.cartService.findOrCreateCart(userId);
    }
    removeFromCart(userId, productId) {
        return this.cartService.removeFromCart(userId, productId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: "Add a product to the user's cart" }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The product has been successfully added to the cart.',
        type: cart_entity_1.Cart,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Insufficient stock or invalid product/user ID.',
    }),
    (0, swagger_1.ApiBody)({
        type: add_to_cart_dto_1.AddToCartDto,
        examples: {
            a: {
                summary: 'Example Add to Cart',
                value: {
                    productId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
                    quantity: 1,
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve the user's cart" }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Successfully retrieved the user's cart.",
        type: cart_entity_1.Cart,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User or cart not found.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)(':userId/:productId'),
    (0, swagger_1.ApiOperation)({ summary: "Remove a product from the user's cart" }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        description: 'The UUID of the product to remove',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The product has been successfully removed from the cart.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product or cart not found.' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map