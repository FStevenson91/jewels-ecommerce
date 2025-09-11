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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const categories_entity_1 = require("./entities/categories.entity");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The category has been successfully created.',
        type: categories_entity_1.Category,
    }),
    (0, swagger_1.ApiBody)({
        type: create_category_dto_1.CreateCategoryDto,
        examples: {
            a: {
                summary: 'Example Category Creation',
                value: {
                    name: 'Books',
                    description: 'All types of literary works.',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all categories' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved a list of all categories.',
        type: [categories_entity_1.Category],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single category by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the category',
        example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved the category.',
        type: categories_entity_1.Category,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing category' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the category',
        example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The category has been successfully updated.',
        type: categories_entity_1.Category,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Category not found' }),
    (0, swagger_1.ApiBody)({
        type: update_category_dto_1.UpdateCategoryDto,
        examples: {
            a: {
                summary: 'Example Category Update',
                value: {
                    name: 'Fiction',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the category',
        example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'The category has been successfully deleted.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map