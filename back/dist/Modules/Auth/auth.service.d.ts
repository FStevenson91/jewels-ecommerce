import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-register-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { User } from '../Users/entities/users.entity';
import { Role } from 'src/Modules/Users/user.enum';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            roles: Role[];
            cart: import("../Cart/entities/cart.entity").Cart;
            orders: import("../Orders/entities/orders.entity").Order[];
        };
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
