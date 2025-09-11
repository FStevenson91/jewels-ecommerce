import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/Modules/Users/entities/users.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'shipped', 'delivered'

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}
