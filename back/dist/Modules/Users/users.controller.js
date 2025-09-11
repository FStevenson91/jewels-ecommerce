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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_entity_1 = require("./entities/users.entity");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully created.',
        type: users_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        examples: {
            a: {
                summary: 'Example User Creation',
                value: {
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    password: 'password123',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all users' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved a list of all users.',
        type: [users_entity_1.User],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single user by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved the user.',
        type: users_entity_1.User,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing user' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The user has been successfully updated.',
        type: users_entity_1.User,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
        examples: {
            a: {
                summary: 'Example User Update',
                value: {
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The UUID of the user',
        example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'The user has been successfully deleted.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map