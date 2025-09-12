import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-register-user.dto';
import { LoginUserDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            roles: import("../Users/user.enum").Role[];
            cart: import("../Cart/entities/cart.entity").Cart;
            orders: import("../Orders/entities/orders.entity").Order[];
        };
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
