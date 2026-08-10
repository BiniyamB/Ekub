import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.auth.login(body.username, body.password);
  }

  @Post('member/login')
  loginMember(@Body() body: { username: string; password: string }) {
    return this.auth.loginMember(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('credentials')
  changeCredentials(
    @Req() req: { user: { id: number } },
    @Body()
    body: {
      currentPassword: string;
      username?: string;
      password?: string;
      name?: string;
    },
  ) {
    return this.auth.changeCredentials(req.user.id, {
      currentPassword: body.currentPassword,
      username: body.username,
      password: body.password,
      name: body.name,
    });
  }
}
