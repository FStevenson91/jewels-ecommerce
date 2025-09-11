import { User } from 'src/Modules/Users/entities/users.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: string;
    totalPrice: number;
    createdAt: Date;
    status: string;
    user: User;
    items: OrderItem[];
}
