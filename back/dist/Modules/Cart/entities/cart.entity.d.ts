import { User } from 'src/Modules/Users/entities/users.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: string;
    user: User;
    items: CartItem[];
}
