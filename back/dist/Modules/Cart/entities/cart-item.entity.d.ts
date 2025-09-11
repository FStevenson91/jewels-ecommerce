import { Cart } from './cart.entity';
import { Product } from 'src/Modules/Products/entities/products.entity';
export declare class CartItem {
    id: string;
    quantity: number;
    cart: Cart;
    product: Product;
}
