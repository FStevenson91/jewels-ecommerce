// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/entities/users.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usa una variable de entorno para la clave secreta
      signOptions: { expiresIn: '1d' }, // La validez del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Importante: agregar JwtStrategy a los providers
  exports: [AuthService, JwtModule, JwtStrategy], // Exportamos para que otros módulos puedan usarlo
})
export class AuthModule {}
