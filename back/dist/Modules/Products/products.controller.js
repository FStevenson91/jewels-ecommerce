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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const products_entity_1 = require("./entities/products.entity");
const products_service_1 = require("./products.service");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../Auth/decorators/roles.decorator");
const user_enum_1 = require("../Users/user.enum");
const roles_guard_1 = require("../Auth/Guards/roles.guard");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll() {
        return this.productsService.findAll();
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The product has been successfully created.',
        type: products_entity_1.Product,
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateProductDto,
        examples: {
            a: {
                summary: 'Example Product Creation',
                value: {
                    name: 'Wireless Mouse',
                    description: 'Ergonomic mouse with long battery life.',
                    price: 25.99,
                    stock: 200,
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all products' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved a list of all products.',
        type: [products_entity_1.Product],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single product by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the product',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved the product.',
        type: products_entity_1.Product,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing product' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the product',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The product has been successfully updated.',
        type: products_entity_1.Product,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateProductDto,
        examples: {
            a: {
                summary: 'Example Product Update',
                value: {
                    price: 22.5,
                    stock: 180,
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the product',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'The product has been successfully deleted.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map