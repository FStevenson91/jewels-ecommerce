import { User } from 'src/Modules/Users/entities/users.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
