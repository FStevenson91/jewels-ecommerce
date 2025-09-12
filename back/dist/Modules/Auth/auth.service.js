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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_entity_1 = require("../Users/entities/users.entity");
const user_enum_1 = require("../Users/user.enum");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: createUserDto.email },
            });
            if (user) {
                throw new common_1.BadRequestException('El usuario ya está registrado');
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const newUser = this.userRepository.create({
                ...createUserDto,
                password: hashedPassword,
                roles: [user_enum_1.Role.User],
            });
            await this.userRepository.save(newUser);
            const { password: _, ...result } = newUser;
            return { message: 'Usuario registrado exitosamente', data: result };
        }
        catch {
            throw new common_1.InternalServerErrorException('Error al registrar el usuario');
        }
    }
    async login(loginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Credenciales incorrectas');
        }
        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles,
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'Inicio de sesión exitoso',
            token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map