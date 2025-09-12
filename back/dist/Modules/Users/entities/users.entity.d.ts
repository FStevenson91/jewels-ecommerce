import { Cart } from 'src/Modules/Cart/entities/cart.entity';
import { Order } from 'src/Modules/Orders/entities/orders.entity';
import { Role } from '../user.enum';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: Role[];
    cart: Cart;
    orders: Order[];
}
