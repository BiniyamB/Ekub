import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Cycle } from '../../generated/prisma/client';

export class CreateEkubDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  quotaAmount: number;

  @IsInt()
  @Min(1)
  totalQuotas: number;

  @IsEnum(Cycle)
  cycle: Cycle;

  @IsOptional()
  @Type(() => Date)
  startDate?: Date;
}
