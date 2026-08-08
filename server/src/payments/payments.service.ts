import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createReceipt(data: {
    quotaId: number;
    memberId: number;
    recipientId?: number;
    amount: number;
    note?: string;
    receiptUrl: string;
  }) {
    const quota = await this.prisma.quota.findUnique({
      where: { id: data.quotaId },
    });
    if (!quota) throw new NotFoundException('Quota not found');
    const member = await this.prisma.member.findFirst({
      where: { id: data.memberId, ekubId: quota.ekubId },
    });
    if (!member) throw new NotFoundException('Payer not found');
    if (data.recipientId) {
      const recipient = await this.prisma.member.findFirst({
        where: { id: data.recipientId, ekubId: quota.ekubId },
      });
      if (!recipient) throw new NotFoundException('Payee not found');
    }

    return this.prisma.payment.create({
      data: {
        quotaId: data.quotaId,
        memberId: data.memberId,
        recipientId: data.recipientId ?? null,
        amount: data.amount,
        note: data.note,
        receiptUrl: data.receiptUrl,
        status: PaymentStatus.PAID,
      },
    });
  }

  async updatePayment(
    id: number,
    data: { amount?: number; note?: string; recipientId?: number | null },
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { member: true },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    if (data.recipientId) {
      const recipient = await this.prisma.member.findFirst({
        where: { id: data.recipientId, ekubId: payment.member.ekubId },
      });
      if (!recipient) throw new NotFoundException('Payee not found');
    }
    return this.prisma.payment.update({
      where: { id },
      data: {
        amount: data.amount,
        note: data.note,
        recipientId: data.recipientId,
      },
    });
  }

  async delete(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    await this.prisma.payment.delete({ where: { id } });
    return { ok: true };
  }
}
