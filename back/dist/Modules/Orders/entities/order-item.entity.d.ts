import { Order } from './orders.entity';
import { Product } from 'src/Modules/Products/entities/products.entity';
export declare class OrderItem {
    id: string;
    quantity: number;
    price: number;
    order: Order;
    product: Product;
}
