import { Cycle } from '../../generated/prisma/client';
export declare class UpdateEkubDto {
    name?: string;
    description?: string;
    cycle?: Cycle;
    startDate?: Date;
    quotaAmount?: number;
    totalQuotas?: number;
}
export declare class UpdateMemberDto {
    name?: string;
    address?: string;
    phone?: string;
    preferredAmount?: number;
}
export declare class AssignMemberQuotaDto {
    quotaId?: number | null;
    amount?: number;
}
