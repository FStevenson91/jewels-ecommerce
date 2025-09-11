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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const users_entity_1 = require("../Users/entities/users.entity");
const products_entity_1 = require("../Products/entities/products.entity");
let CartService = class CartService {
    cartRepository;
    cartItemRepository;
    usersRepository;
    productsRepository;
    constructor(cartRepository, cartItemRepository, usersRepository, productsRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async findOrCreateCart(userId) {
        let cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['items', 'items.product'],
        });
        if (!cart) {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
            }
            cart = this.cartRepository.create({ user });
            await this.cartRepository.save(cart);
        }
        return cart;
    }
    async addToCart(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const [cart, product] = await Promise.all([
            this.findOrCreateCart(userId),
            this.productsRepository.findOne({ where: { id: productId } }),
        ]);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found.`);
        }
        if (product.stock < quantity) {
            throw new common_1.BadRequestException(`Insufficient stock. Available: ${product.stock}`);
        }
        let cartItem = cart.items.find((item) => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
            await this.cartItemRepository.save(cartItem);
        }
        else {
            cartItem = this.cartItemRepository.create({
                cart,
                product,
                quantity,
            });
            await this.cartItemRepository.save(cartItem);
            cart.items.push(cartItem);
        }
        const updatedCart = await this.cartRepository.save(cart);
        return updatedCart;
    }
    async removeFromCart(userId, productId) {
        const cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['items', 'items.product'],
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found for this user.');
        }
        const cartItem = cart.items.find((item) => item.product.id === productId);
        if (!cartItem) {
            throw new common_1.NotFoundException('Product not found in cart.');
        }
        await this.cartItemRepository.remove(cartItem);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map