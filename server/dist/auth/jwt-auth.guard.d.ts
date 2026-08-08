import { CanActivate } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base implements CanActivate {
    handleRequest<TUser = any>(err: any, user: any): TUser;
}
export {};
