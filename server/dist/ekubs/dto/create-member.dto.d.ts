export declare class CreateMemberDto {
    name: string;
    address: string;
    phone?: string;
    preferredAmount: number;
}
export declare class RegisterMembersDto {
    members: CreateMemberDto[];
}
