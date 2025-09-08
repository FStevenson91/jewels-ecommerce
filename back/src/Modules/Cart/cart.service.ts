import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      cart = this.cartRepository.create({ user });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const { productId, quantity } = addToCartDto;

    const [cart, product] = await Promise.all([
      this.findOrCreateCart(userId),
      this.productsRepository.findOne({ where: { id: productId } }),
    ]);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    if (product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${product.stock}`,
      );
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
      });
      await this.cartItemRepository.save(cartItem);
      cart.items.push(cartItem);
    }

    // Recargar el carrito para obtener la lista actualizada de items
    const updatedCart = await this.cartRepository.save(cart);
    return updatedCart;
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    const cartItem = cart.items.find((item) => item.product.id === productId);

    if (!cartItem) {
      throw new NotFoundException('Product not found in cart.');
    }

    await this.cartItemRepository.remove(cartItem);
  }
}
