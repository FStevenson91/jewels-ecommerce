import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { User } from '../Users/entities/users.entity';
import { Cart } from '../Cart/entities/cart.entity';
import { ProductsService } from '../Products/products.service';
export declare class OrdersService {
    private ordersRepository;
    private usersRepository;
    private cartRepository;
    private productsService;
    constructor(ordersRepository: Repository<Order>, usersRepository: Repository<User>, cartRepository: Repository<Cart>, productsService: ProductsService);
    createOrderFromCart(userId: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
}
