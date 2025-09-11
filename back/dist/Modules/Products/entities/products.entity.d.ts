import { CartItem } from 'src/Modules/Cart/entities/cart-item.entity';
import { OrderItem } from 'src/Modules/Orders/entities/order-item.entity';
import { Category } from 'src/Modules/Categories/entities/categories.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    cartItems: CartItem[];
    orderItems: OrderItem[];
    categories: Category[];
}
