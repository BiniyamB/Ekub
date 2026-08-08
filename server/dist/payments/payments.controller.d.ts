import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private payments;
    constructor(payments: PaymentsService);
    createReceipt(file: Express.Multer.File | undefined, body: {
        quotaId: string;
        memberId: string;
        recipientId?: string;
        amount: string;
        note?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        status: import("../generated/prisma/enums").PaymentStatus;
        quotaId: number;
        memberId: number;
        amount: number;
        receiptUrl: string | null;
        note: string | null;
        paidAt: Date;
        recipientId: number | null;
    }>;
    update(id: number, body: {
        amount?: number;
        note?: string;
        recipientId?: number | null;
    }): Promise<{
        id: number;
        createdAt: Date;
        status: import("../generated/prisma/enums").PaymentStatus;
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
