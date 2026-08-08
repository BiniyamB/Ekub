import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EkubStatus } from '../generated/prisma/client';
import { EkubsService } from './ekubs.service';
import { CreateEkubDto } from './dto/create-ekub.dto';
import { CreateMemberDto, RegisterMembersDto } from './dto/create-member.dto';
import { AssignMemberQuotaDto, UpdateEkubDto, UpdateMemberDto } from './dto/update-ekub.dto';
export declare class EkubsController {
    private ekubs;
    constructor(ekubs: EkubsService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    paymentPlan(id: number): Promise<{
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
    drawEvents(id: number): Observable<MessageEvent>;
    create(dto: CreateEkubDto): Promise<any>;
    registerMember(id: number, dto: CreateMemberDto): Promise<any>;
    registerMembers(id: number, dto: RegisterMembersDto): Promise<any>;
    removeMember(id: number, memberId: number): Promise<any>;
    updateMember(id: number, memberId: number, dto: UpdateMemberDto): Promise<any>;
    assignMemberToQuota(id: number, memberId: number, dto: AssignMemberQuotaDto): Promise<any>;
    updateEkub(id: number, dto: UpdateEkubDto): Promise<any>;
    generateQuotas(id: number): Promise<{
        ekub: any;
        assignedGroups: number;
        warnings: string[];
    }>;
    rebalanceQuotas(id: number): Promise<{
        ekub: any;
        assignedGroups: number;
        warnings: string[];
    }>;
    setQuotaMembers(id: number, quotaId: number, body: {
        members?: {
            memberId: number;
            amount: number;
        }[];
    }): Promise<{
        ekub: any;
        warnings: string[];
    }>;
    drawWinner(id: number): Promise<any>;
    reverseDraw(id: number, quotaId: number): Promise<any>;
    resetAllDraws(): Promise<{
        ok: boolean;
    }>;
    updateStatus(id: number, body: {
        status: EkubStatus;
    }): Promise<any>;
    delete(id: number): Promise<{
        ok: boolean;
    }>;
}
