import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';
export declare class CartService {
    private cartRepository;
    private cartItemRepository;
    private usersRepository;
    private productsRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, usersRepository: Repository<User>, productsRepository: Repository<Product>);
    findOrCreateCart(userId: string): Promise<Cart>;
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart>;
    removeFromCart(userId: string, productId: string): Promise<void>;
}
