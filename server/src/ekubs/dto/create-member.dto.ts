import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsInt()
  @Min(1)
  preferredAmount: number;
}

export class RegisterMembersDto {
  @IsNotEmpty({ message: 'members array is required' })
  members: CreateMemberDto[];
}
