import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EkubStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEkubDto } from './dto/create-ekub.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { AssignMemberQuotaDto, UpdateEkubDto, UpdateMemberDto } from './dto/update-ekub.dto';
export declare class EkubsService {
    private prisma;
    private readonly drawEvents;
    constructor(prisma: PrismaService);
    drawStream(ekubId: number): Observable<MessageEvent>;
    private emit;
    create(dto: CreateEkubDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    paymentPlan(ekubId: number): Promise<{
        ekubId: number;
        quotaAmount: number;
        totalQuotas: number;
        rounds: {
            quotaId: number;
            position: number;
            winnerAt: Date | null;
            pot: number;
            winners: {
                memberId: number;
                realId: number;
                name: string;
                fill: number;
                pot: number;
                received: number;
                receivedPercent: number;
                assigned: {
                    memberId: number;
                    name: string;
                    amount: number;
                }[];
            }[];
            payers: {
                memberId: number;
                name: string;
                paysTo: number;
                paysToName: string;
                owed: number;
                paid: number;
                percent: number;
                status: string;
            }[];
            receipts: {
                id: number;
                payerId: number;
                payerName: string;
                payeeId: number | null;
                payeeName: string;
                amount: number;
                receiptUrl: string | null;
                paidAt: Date;
            }[];
        }[];
        totalOwed: number;
        totalPaid: number;
        overallPercent: number;
        paidPersons: number;
        partialPersons: number;
        unpaidPersons: number;
        persons: {
            memberId: number;
            name: string;
            owed: number;
            paid: number;
            percent: number;
            status: string;
        }[];
    }>;
    registerMember(ekubId: number, dto: CreateMemberDto): Promise<any>;
    updateEkub(ekubId: number, dto: UpdateEkubDto): Promise<any>;
    updateMember(ekubId: number, memberId: number, dto: UpdateMemberDto): Promise<any>;
    assignMemberToQuota(ekubId: number, memberId: number, dto: AssignMemberQuotaDto): Promise<any>;
    setQuotaMembers(ekubId: number, quotaId: number, entries: {
        memberId: number;
        amount: number;
    }[]): Promise<{
        ekub: any;
        warnings: string[];
    }>;
    registerMembers(ekubId: number, dtos: CreateMemberDto[]): Promise<any>;
    generateQuotas(ekubId: number): Promise<{
        ekub: any;
        assignedGroups: number;
        warnings: string[];
    }>;
    rebalanceQuotas(ekubId: number): Promise<{
        ekub: any;
        assignedGroups: number;
        warnings: string[];
    }>;
    private assignMembers;
    private assignEvenly;
    drawWinner(ekubId: number): Promise<any>;
    reverseDraw(ekubId: number, quotaId: number): Promise<any>;
    resetAllDraws(): Promise<{
        ok: boolean;
    }>;
    removeMember(ekubId: number, memberId: number): Promise<any>;
    updateStatus(ekubId: number, status: EkubStatus): Promise<any>;
    delete(id: number): Promise<{
        ok: boolean;
    }>;
    private decorate;
    private unallocatedTotal;
}
