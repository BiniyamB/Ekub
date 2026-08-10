import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Restricts routes to MEMBER users only. Admin JWTs are rejected. */
@Injectable()
export class MemberJwtAuthGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  handleRequest<TUser = any>(err: any, user: any): TUser {
    const type = (user as { type?: string } | null | undefined)?.type;
    if (err || !user || type !== 'member') {
      throw err || new Error('Unauthorized');
    }
    return user as TUser;
  }
}
