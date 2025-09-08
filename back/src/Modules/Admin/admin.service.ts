import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Users/entities/users.entity';
import { Product } from '../Products/entities/products.entity';
import { Order } from '../Orders/entities/orders.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getDashboardSummary() {
    const [userCount, productCount, orderCount] = await Promise.all([
      this.usersRepository.count(),
      this.productsRepository.count(),
      this.ordersRepository.count(),
    ]);

    const latestOrders = await this.ordersRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return {
      userCount,
      productCount,
      orderCount,
      latestOrders,
    };
  }
}
