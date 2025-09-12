// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-register-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { User } from '../Users/entities/users.entity';
import { Role } from 'src/Modules/Users/user.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        throw new BadRequestException('El usuario ya está registrado');
      }

      const hashedPassword: string = await bcrypt.hash(
        createUserDto.password,
        10,
      );
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        roles: [Role.User], // Asignamos el rol 'User' por defecto
      });

      await this.userRepository.save(newUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = newUser;
      return { message: 'Usuario registrado exitosamente', data: result };
    } catch {
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    // Genera el token JWT usando el payload
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
}
