import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            name: string;
        };
    }>;
    changeCredentials(req: {
        user: {
            id: number;
        };
    }, body: {
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
