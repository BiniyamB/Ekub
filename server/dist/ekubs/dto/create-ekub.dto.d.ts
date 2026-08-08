import { Cycle } from '../../generated/prisma/client';
export declare class CreateEkubDto {
    name: string;
    description?: string;
    quotaAmount: number;
    totalQuotas: number;
    cycle: Cycle;
    startDate?: Date;
}
