"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReceipt(data) {
        const quota = await this.prisma.quota.findUnique({
            where: { id: data.quotaId },
        });
        if (!quota)
            throw new common_1.NotFoundException('Quota not found');
        const member = await this.prisma.member.findFirst({
            where: { id: data.memberId, ekubId: quota.ekubId },
        });
        if (!member)
            throw new common_1.NotFoundException('Payer not found');
        if (data.recipientId) {
            const recipient = await this.prisma.member.findFirst({
                where: { id: data.recipientId, ekubId: quota.ekubId },
            });
            if (!recipient)
                throw new common_1.NotFoundException('Payee not found');
        }
        return this.prisma.payment.create({
            data: {
                quotaId: data.quotaId,
                memberId: data.memberId,
                recipientId: data.recipientId ?? null,
                amount: data.amount,
                note: data.note,
                receiptUrl: data.receiptUrl,
                status: client_1.PaymentStatus.PAID,
            },
        });
    }
    async updatePayment(id, data) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: { member: true },
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        if (data.recipientId) {
            const recipient = await this.prisma.member.findFirst({
                where: { id: data.recipientId, ekubId: payment.member.ekubId },
            });
            if (!recipient)
                throw new common_1.NotFoundException('Payee not found');
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
    async delete(id) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        await this.prisma.payment.delete({ where: { id } });
        return { ok: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map