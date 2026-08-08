import { PaymentStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReceipt(data: {
        quotaId: number;
        memberId: number;
        recipientId?: number;
        amount: number;
        note?: string;
        receiptUrl: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        status: PaymentStatus;
        quotaId: number;
        memberId: number;
        amount: number;
        receiptUrl: string | null;
        note: string | null;
        paidAt: Date;
        recipientId: number | null;
    }>;
    updatePayment(id: number, data: {
        amount?: number;
        note?: string;
        recipientId?: number | null;
    }): Promise<{
        id: number;
        createdAt: Date;
        status: PaymentStatus;
        quotaId: number;
        memberId: number;
        amount: number;
        receiptUrl: string | null;
        note: string | null;
        paidAt: Date;
        recipientId: number | null;
    }>;
    delete(id: number): Promise<{
        ok: boolean;
    }>;
}
