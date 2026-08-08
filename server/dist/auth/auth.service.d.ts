import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    validateAdmin(username: string, password: string): Promise<{
        id: number;
        username: string;
        password: string;
        name: string;
        createdAt: Date;
    } | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            name: string;
        };
    }>;
    changeCredentials(adminId: number, data: {
        currentPassword: string;
        username?: string;
        password?: string;
        name?: string;
    }): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            name: string;
        };
    }>;
}
