import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EkubsService } from '../ekubs/ekubs.service';

export type MemberAuthUser = {
  id: number;
  username: string;
  name: string;
  ekubId: number;
};

type EkubView = {
  name: string;
  status: string;
  quotas: Array<{
    id: number;
    position: number;
    status: string;
    winnerAt: Date | null;
    closedAt: Date | null;
    members: Array<{ id: number; name: string; shareGroup: number | null }>;
    payments: Array<{ status: string }>;
  }>;
};

@Injectable()
export class MembersService {
  constructor(
    private prisma: PrismaService,
    private ekubs: EkubsService,
  ) {}

  /** The signed-in member's own dashboard: their profile, their ekub and the
   *  full payment plan so the client can render the current round. */
  async me(user: MemberAuthUser) {
    const member = await this.prisma.member.findUnique({
      where: { id: user.id },
    });
    if (!member) throw new NotFoundException('Member not found');
    const ekub = (await this.ekubs.findOne(member.ekubId)) as EkubView;
    const plan = await this.ekubs.paymentPlan(member.ekubId);
    return {
      member: {
        id: member.id,
        ekubId: member.ekubId,
        name: member.name,
        username: member.username,
        address: member.address,
        phone: member.phone,
        preferredAmount: member.preferredAmount,
        quotaAmount: member.quotaAmount,
        quotaId: member.quotaId,
      },
      ekub,
      plan,
    };
  }

  /** A non-winner attaches their receipt for the current round. The receipt
   *  stays in SUBMITTED status until the winner opens it, reviews the image
   *  and confirms it — that confirmation is what marks the money as paid. */
  async uploadReceipt(
    user: MemberAuthUser,
    file: Express.Multer.File | undefined,
    data: {
      quotaId: number;
      recipientId: number;
      amount: number;
      note?: string;
    },
  ) {
    if (!file) {
      throw new BadRequestException('Please attach a receipt image');
    }
    const member = await this.prisma.member.findUnique({
      where: { id: user.id },
    });
    if (!member) throw new NotFoundException('Member not found');
    const quota = await this.prisma.quota.findFirst({
      where: { id: data.quotaId, ekubId: member.ekubId },
    });
    if (!quota) throw new NotFoundException('Round not found');
    if (quota.status !== 'SELECTED') {
      throw new BadRequestException('This round has not been drawn yet');
    }
    if (quota.closedAt) {
      throw new BadRequestException('This round is already closed');
    }

    const plan = await this.ekubs.paymentPlan(member.ekubId);
    const round = plan.rounds.find((r) => r.quotaId === quota.id);
    if (!round) {
      throw new BadRequestException('This round has no payment plan yet');
    }
    const isAssignedPayer = round.payers.some((p) => p.memberId === user.id);
    if (!isAssignedPayer) {
      throw new BadRequestException('You are not assigned to pay this round');
    }
    const isWinner = round.winners.some((w) => w.realId === data.recipientId);
    if (!isWinner) {
      throw new BadRequestException('Choose a winner of this round');
    }
    if (!data.amount || data.amount <= 0) {
      throw new BadRequestException('Enter a paid amount');
    }

    const existing = await this.prisma.payment.findFirst({
      where: {
        quotaId: quota.id,
        memberId: user.id,
        status: { in: [PaymentStatus.SUBMITTED, PaymentStatus.PAID] },
      },
    });
    if (existing) {
      throw new BadRequestException(
        'You already submitted a receipt for this round',
      );
    }

    return this.prisma.payment.create({
      data: {
        quotaId: quota.id,
        memberId: user.id,
        recipientId: data.recipientId,
        amount: data.amount,
        note: data.note,
        receiptUrl: `/uploads/${file.filename}`,
        status: PaymentStatus.SUBMITTED,
      },
    });
  }

  /** The winner reviews a payer's receipt and confirms it. Only the payee of
   *  that payment can confirm, and only while the round is still open. */
  async confirmReceipt(user: MemberAuthUser, paymentId: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { quota: true },
    });
    if (!payment) throw new NotFoundException('Receipt not found');
    if (payment.recipientId !== user.id) {
      throw new ForbiddenException(
        'Only the winner of this receipt can confirm it',
      );
    }
    if (payment.status !== PaymentStatus.SUBMITTED) {
      throw new BadRequestException('This receipt is already confirmed');
    }
    if (payment.quota.closedAt) {
      throw new BadRequestException('This round is already closed');
    }

    const updated = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.PAID,
        confirmedByWinnerAt: new Date(),
      },
    });
    await this.ekubs.refreshRoundClosures(payment.quota.ekubId);
    return updated;
  }
}
