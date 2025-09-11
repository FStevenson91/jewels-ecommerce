import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from './entities/cart.entity';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart>;
    getCart(userId: string): Promise<Cart>;
    removeFromCart(userId: string, productId: string): Promise<void>;
}
