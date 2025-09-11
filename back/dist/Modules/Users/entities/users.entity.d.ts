import { Cart } from 'src/Modules/Cart/entities/cart.entity';
import { Order } from 'src/Modules/Orders/entities/orders.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    cart: Cart;
    orders: Order[];
}
