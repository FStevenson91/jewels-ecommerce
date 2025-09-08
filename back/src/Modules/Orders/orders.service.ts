import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { User } from '../Users/entities/users.entity';
import { Cart } from '../Cart/entities/cart.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from '../Products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private productsService: ProductsService,
  ) {}

  async createOrderFromCart(userId: string): Promise<Order> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['cart', 'cart.items', 'cart.items.product'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    if (!user.cart || user.cart.items.length === 0) {
      throw new BadRequestException('The cart is empty.');
    }

    const order = new Order();
    order.user = user;
    order.status = 'pending';

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const cartItem of user.cart.items) {
      const product = cartItem.product;

      if (product.stock < cartItem.quantity) {
        throw new BadRequestException(
          `Not enough stock for product "${product.name}". Available: ${product.stock}`,
        );
      }

      // Create a new OrderItem
      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = cartItem.quantity;
      orderItem.price = product.price;
      orderItem.order = order;
      orderItems.push(orderItem);

      // Deduct stock from the product
      await this.productsService.update(product.id, {
        stock: product.stock - cartItem.quantity,
      });

      totalPrice += product.price * cartItem.quantity;
    }

    order.items = orderItems;
    order.totalPrice = totalPrice;

    // Clear the user's cart
    user.cart.items = [];
    await this.cartRepository.save(user.cart);

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }
}
