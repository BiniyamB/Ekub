import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    if (!admin) return null;
    const ok = await bcrypt.compare(password, admin.password);
    return ok ? admin : null;
  }

  async login(username: string, password: string) {
    const admin = await this.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: admin.id,
      username: admin.username,
      name: admin.name,
      type: 'admin' as const,
    };
    return {
      access_token: await this.jwt.signAsync(payload),
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
    };
  }

  /** Member sign-in. Every member is registered from the admin side with a
   *  username + password, then logs in at the landing page. */
  async loginMember(username: string, password: string) {
    const member = await this.prisma.member.findUnique({ where: { username } });
    if (!member || !member.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await bcrypt.compare(password, member.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: member.id,
      username: member.username,
      name: member.name,
      type: 'member' as const,
      ekubId: member.ekubId,
    };
    return {
      access_token: await this.jwt.signAsync(payload),
      member: {
        id: member.id,
        username: member.username,
        name: member.name,
        ekubId: member.ekubId,
      },
    };
  }

  async changeCredentials(
    adminId: number,
    data: {
      currentPassword: string;
      username?: string;
      password?: string;
      name?: string;
    },
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(data.currentPassword, admin.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const username =
      data.username !== undefined && data.username.trim().length > 0
        ? data.username.trim()
        : admin.username;
    const password =
      data.password !== undefined && data.password.trim().length > 0
        ? await bcrypt.hash(data.password, 10)
        : admin.password;
    const name =
      data.name !== undefined && data.name.trim().length > 0
        ? data.name.trim()
        : admin.name;

    if (username !== admin.username) {
      const taken = await this.prisma.admin.findUnique({ where: { username } });
      if (taken) throw new BadRequestException('Username is already taken');
    }

    const updated = await this.prisma.admin.update({
      where: { id: adminId },
      data: { username, password, name },
    });

    const payload = {
      sub: updated.id,
      username: updated.username,
      name: updated.name,
    };
    return {
      access_token: await this.jwt.signAsync(payload),
      admin: {
        id: updated.id,
        username: updated.username,
        name: updated.name,
      },
    };
  }
}
