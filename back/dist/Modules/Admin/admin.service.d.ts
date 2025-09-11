import { Repository } from 'typeorm';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';
import { Order } from '../Orders/entities/orders.entity';
export declare class AdminService {
    private usersRepository;
    private productsRepository;
    private ordersRepository;
    constructor(usersRepository: Repository<User>, productsRepository: Repository<Product>, ordersRepository: Repository<Order>);
    getDashboardSummary(): Promise<{
        userCount: number;
        productCount: number;
        orderCount: number;
        latestOrders: Order[];
    }>;
}
