import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'ekub-secret',
    });
  }

  validate(payload: {
    sub: number;
    username: string;
    name: string;
    type?: 'admin' | 'member';
    ekubId?: number;
  }) {
    return {
      id: payload.sub,
      username: payload.username,
      name: payload.name,
      type: payload.type ?? 'admin',
      ekubId: payload.ekubId ?? null,
    };
  }
}
