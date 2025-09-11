import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu_secreto_super_seguro', // ¡IMPORTANTE!: Usar la misma variable de entorno
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}