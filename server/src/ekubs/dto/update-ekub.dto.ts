import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Cycle } from '../../generated/prisma/client';

export class UpdateEkubDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Cycle)
  cycle?: Cycle;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  quotaAmount?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalQuotas?: number;
}

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  preferredAmount?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;
}

export class AssignMemberQuotaDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  quotaId?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  amount?: number;
}
