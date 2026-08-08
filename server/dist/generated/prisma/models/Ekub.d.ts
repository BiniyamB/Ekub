import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EkubModel = runtime.Types.Result.DefaultSelection<Prisma.$EkubPayload>;
export type AggregateEkub = {
    _count: EkubCountAggregateOutputType | null;
    _avg: EkubAvgAggregateOutputType | null;
    _sum: EkubSumAggregateOutputType | null;
    _min: EkubMinAggregateOutputType | null;
    _max: EkubMaxAggregateOutputType | null;
};
export type EkubAvgAggregateOutputType = {
    id: number | null;
    quotaAmount: number | null;
    totalQuotas: number | null;
};
export type EkubSumAggregateOutputType = {
    id: number | null;
    quotaAmount: number | null;
    totalQuotas: number | null;
};
export type EkubMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    quotaAmount: number | null;
    totalQuotas: number | null;
    cycle: $Enums.Cycle | null;
    startDate: Date | null;
    status: $Enums.EkubStatus | null;
    createdAt: Date | null;
};
export type EkubMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    quotaAmount: number | null;
    totalQuotas: number | null;
    cycle: $Enums.Cycle | null;
    startDate: Date | null;
    status: $Enums.EkubStatus | null;
    createdAt: Date | null;
};
export type EkubCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    quotaAmount: number;
    totalQuotas: number;
    cycle: number;
    startDate: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type EkubAvgAggregateInputType = {
    id?: true;
    quotaAmount?: true;
    totalQuotas?: true;
};
export type EkubSumAggregateInputType = {
    id?: true;
    quotaAmount?: true;
    totalQuotas?: true;
};
export type EkubMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    quotaAmount?: true;
    totalQuotas?: true;
    cycle?: true;
    startDate?: true;
    status?: true;
    createdAt?: true;
};
export type EkubMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    quotaAmount?: true;
    totalQuotas?: true;
    cycle?: true;
    startDate?: true;
    status?: true;
    createdAt?: true;
};
export type EkubCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    quotaAmount?: true;
    totalQuotas?: true;
    cycle?: true;
    startDate?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type EkubAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EkubWhereInput;
    orderBy?: Prisma.EkubOrderByWithRelationInput | Prisma.EkubOrderByWithRelationInput[];
    cursor?: Prisma.EkubWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EkubCountAggregateInputType;
    _avg?: EkubAvgAggregateInputType;
    _sum?: EkubSumAggregateInputType;
    _min?: EkubMinAggregateInputType;
    _max?: EkubMaxAggregateInputType;
};
export type GetEkubAggregateType<T extends EkubAggregateArgs> = {
    [P in keyof T & keyof AggregateEkub]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEkub[P]> : Prisma.GetScalarType<T[P], AggregateEkub[P]>;
};
export type EkubGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EkubWhereInput;
    orderBy?: Prisma.EkubOrderByWithAggregationInput | Prisma.EkubOrderByWithAggregationInput[];
    by: Prisma.EkubScalarFieldEnum[] | Prisma.EkubScalarFieldEnum;
    having?: Prisma.EkubScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EkubCountAggregateInputType | true;
    _avg?: EkubAvgAggregateInputType;
    _sum?: EkubSumAggregateInputType;
    _min?: EkubMinAggregateInputType;
    _max?: EkubMaxAggregateInputType;
};
export type EkubGroupByOutputType = {
    id: number;
    name: string;
    description: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle: $Enums.Cycle;
    startDate: Date;
    status: $Enums.EkubStatus;
    createdAt: Date;
    _count: EkubCountAggregateOutputType | null;
    _avg: EkubAvgAggregateOutputType | null;
    _sum: EkubSumAggregateOutputType | null;
    _min: EkubMinAggregateOutputType | null;
    _max: EkubMaxAggregateOutputType | null;
};
export type GetEkubGroupByPayload<T extends EkubGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EkubGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EkubGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EkubGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EkubGroupByOutputType[P]>;
}>>;
export type EkubWhereInput = {
    AND?: Prisma.EkubWhereInput | Prisma.EkubWhereInput[];
    OR?: Prisma.EkubWhereInput[];
    NOT?: Prisma.EkubWhereInput | Prisma.EkubWhereInput[];
    id?: Prisma.IntFilter<"Ekub"> | number;
    name?: Prisma.StringFilter<"Ekub"> | string;
    description?: Prisma.StringNullableFilter<"Ekub"> | string | null;
    quotaAmount?: Prisma.IntFilter<"Ekub"> | number;
    totalQuotas?: Prisma.IntFilter<"Ekub"> | number;
    cycle?: Prisma.EnumCycleFilter<"Ekub"> | $Enums.Cycle;
    startDate?: Prisma.DateTimeFilter<"Ekub"> | Date | string;
    status?: Prisma.EnumEkubStatusFilter<"Ekub"> | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFilter<"Ekub"> | Date | string;
    quotas?: Prisma.QuotaListRelationFilter;
    members?: Prisma.MemberListRelationFilter;
};
export type EkubOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    quotas?: Prisma.QuotaOrderByRelationAggregateInput;
    members?: Prisma.MemberOrderByRelationAggregateInput;
};
export type EkubWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.EkubWhereInput | Prisma.EkubWhereInput[];
    OR?: Prisma.EkubWhereInput[];
    NOT?: Prisma.EkubWhereInput | Prisma.EkubWhereInput[];
    name?: Prisma.StringFilter<"Ekub"> | string;
    description?: Prisma.StringNullableFilter<"Ekub"> | string | null;
    quotaAmount?: Prisma.IntFilter<"Ekub"> | number;
    totalQuotas?: Prisma.IntFilter<"Ekub"> | number;
    cycle?: Prisma.EnumCycleFilter<"Ekub"> | $Enums.Cycle;
    startDate?: Prisma.DateTimeFilter<"Ekub"> | Date | string;
    status?: Prisma.EnumEkubStatusFilter<"Ekub"> | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFilter<"Ekub"> | Date | string;
    quotas?: Prisma.QuotaListRelationFilter;
    members?: Prisma.MemberListRelationFilter;
}, "id">;
export type EkubOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EkubCountOrderByAggregateInput;
    _avg?: Prisma.EkubAvgOrderByAggregateInput;
    _max?: Prisma.EkubMaxOrderByAggregateInput;
    _min?: Prisma.EkubMinOrderByAggregateInput;
    _sum?: Prisma.EkubSumOrderByAggregateInput;
};
export type EkubScalarWhereWithAggregatesInput = {
    AND?: Prisma.EkubScalarWhereWithAggregatesInput | Prisma.EkubScalarWhereWithAggregatesInput[];
    OR?: Prisma.EkubScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EkubScalarWhereWithAggregatesInput | Prisma.EkubScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Ekub"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Ekub"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Ekub"> | string | null;
    quotaAmount?: Prisma.IntWithAggregatesFilter<"Ekub"> | number;
    totalQuotas?: Prisma.IntWithAggregatesFilter<"Ekub"> | number;
    cycle?: Prisma.EnumCycleWithAggregatesFilter<"Ekub"> | $Enums.Cycle;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"Ekub"> | Date | string;
    status?: Prisma.EnumEkubStatusWithAggregatesFilter<"Ekub"> | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Ekub"> | Date | string;
};
export type EkubCreateInput = {
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    quotas?: Prisma.QuotaCreateNestedManyWithoutEkubInput;
    members?: Prisma.MemberCreateNestedManyWithoutEkubInput;
};
export type EkubUncheckedCreateInput = {
    id?: number;
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    quotas?: Prisma.QuotaUncheckedCreateNestedManyWithoutEkubInput;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutEkubInput;
};
export type EkubUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotas?: Prisma.QuotaUpdateManyWithoutEkubNestedInput;
    members?: Prisma.MemberUpdateManyWithoutEkubNestedInput;
};
export type EkubUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotas?: Prisma.QuotaUncheckedUpdateManyWithoutEkubNestedInput;
    members?: Prisma.MemberUncheckedUpdateManyWithoutEkubNestedInput;
};
export type EkubCreateManyInput = {
    id?: number;
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
};
export type EkubUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EkubUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EkubCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EkubAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
};
export type EkubMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EkubMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EkubSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    totalQuotas?: Prisma.SortOrder;
};
export type EkubScalarRelationFilter = {
    is?: Prisma.EkubWhereInput;
    isNot?: Prisma.EkubWhereInput;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumCycleFieldUpdateOperationsInput = {
    set?: $Enums.Cycle;
};
export type EnumEkubStatusFieldUpdateOperationsInput = {
    set?: $Enums.EkubStatus;
};
export type EkubCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.EkubCreateWithoutMembersInput, Prisma.EkubUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.EkubCreateOrConnectWithoutMembersInput;
    connect?: Prisma.EkubWhereUniqueInput;
};
export type EkubUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.EkubCreateWithoutMembersInput, Prisma.EkubUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.EkubCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.EkubUpsertWithoutMembersInput;
    connect?: Prisma.EkubWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EkubUpdateToOneWithWhereWithoutMembersInput, Prisma.EkubUpdateWithoutMembersInput>, Prisma.EkubUncheckedUpdateWithoutMembersInput>;
};
export type EkubCreateNestedOneWithoutQuotasInput = {
    create?: Prisma.XOR<Prisma.EkubCreateWithoutQuotasInput, Prisma.EkubUncheckedCreateWithoutQuotasInput>;
    connectOrCreate?: Prisma.EkubCreateOrConnectWithoutQuotasInput;
    connect?: Prisma.EkubWhereUniqueInput;
};
export type EkubUpdateOneRequiredWithoutQuotasNestedInput = {
    create?: Prisma.XOR<Prisma.EkubCreateWithoutQuotasInput, Prisma.EkubUncheckedCreateWithoutQuotasInput>;
    connectOrCreate?: Prisma.EkubCreateOrConnectWithoutQuotasInput;
    upsert?: Prisma.EkubUpsertWithoutQuotasInput;
    connect?: Prisma.EkubWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EkubUpdateToOneWithWhereWithoutQuotasInput, Prisma.EkubUpdateWithoutQuotasInput>, Prisma.EkubUncheckedUpdateWithoutQuotasInput>;
};
export type EkubCreateWithoutMembersInput = {
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    quotas?: Prisma.QuotaCreateNestedManyWithoutEkubInput;
};
export type EkubUncheckedCreateWithoutMembersInput = {
    id?: number;
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    quotas?: Prisma.QuotaUncheckedCreateNestedManyWithoutEkubInput;
};
export type EkubCreateOrConnectWithoutMembersInput = {
    where: Prisma.EkubWhereUniqueInput;
    create: Prisma.XOR<Prisma.EkubCreateWithoutMembersInput, Prisma.EkubUncheckedCreateWithoutMembersInput>;
};
export type EkubUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.EkubUpdateWithoutMembersInput, Prisma.EkubUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.EkubCreateWithoutMembersInput, Prisma.EkubUncheckedCreateWithoutMembersInput>;
    where?: Prisma.EkubWhereInput;
};
export type EkubUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.EkubWhereInput;
    data: Prisma.XOR<Prisma.EkubUpdateWithoutMembersInput, Prisma.EkubUncheckedUpdateWithoutMembersInput>;
};
export type EkubUpdateWithoutMembersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotas?: Prisma.QuotaUpdateManyWithoutEkubNestedInput;
};
export type EkubUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotas?: Prisma.QuotaUncheckedUpdateManyWithoutEkubNestedInput;
};
export type EkubCreateWithoutQuotasInput = {
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    members?: Prisma.MemberCreateNestedManyWithoutEkubInput;
};
export type EkubUncheckedCreateWithoutQuotasInput = {
    id?: number;
    name: string;
    description?: string | null;
    quotaAmount: number;
    totalQuotas: number;
    cycle?: $Enums.Cycle;
    startDate?: Date | string;
    status?: $Enums.EkubStatus;
    createdAt?: Date | string;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutEkubInput;
};
export type EkubCreateOrConnectWithoutQuotasInput = {
    where: Prisma.EkubWhereUniqueInput;
    create: Prisma.XOR<Prisma.EkubCreateWithoutQuotasInput, Prisma.EkubUncheckedCreateWithoutQuotasInput>;
};
export type EkubUpsertWithoutQuotasInput = {
    update: Prisma.XOR<Prisma.EkubUpdateWithoutQuotasInput, Prisma.EkubUncheckedUpdateWithoutQuotasInput>;
    create: Prisma.XOR<Prisma.EkubCreateWithoutQuotasInput, Prisma.EkubUncheckedCreateWithoutQuotasInput>;
    where?: Prisma.EkubWhereInput;
};
export type EkubUpdateToOneWithWhereWithoutQuotasInput = {
    where?: Prisma.EkubWhereInput;
    data: Prisma.XOR<Prisma.EkubUpdateWithoutQuotasInput, Prisma.EkubUncheckedUpdateWithoutQuotasInput>;
};
export type EkubUpdateWithoutQuotasInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.MemberUpdateManyWithoutEkubNestedInput;
};
export type EkubUncheckedUpdateWithoutQuotasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quotaAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalQuotas?: Prisma.IntFieldUpdateOperationsInput | number;
    cycle?: Prisma.EnumCycleFieldUpdateOperationsInput | $Enums.Cycle;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumEkubStatusFieldUpdateOperationsInput | $Enums.EkubStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.MemberUncheckedUpdateManyWithoutEkubNestedInput;
};
export type EkubCountOutputType = {
    quotas: number;
    members: number;
};
export type EkubCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quotas?: boolean | EkubCountOutputTypeCountQuotasArgs;
    members?: boolean | EkubCountOutputTypeCountMembersArgs;
};
export type EkubCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubCountOutputTypeSelect<ExtArgs> | null;
};
export type EkubCountOutputTypeCountQuotasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuotaWhereInput;
};
export type EkubCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
};
export type EkubSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    quotaAmount?: boolean;
    totalQuotas?: boolean;
    cycle?: boolean;
    startDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    quotas?: boolean | Prisma.Ekub$quotasArgs<ExtArgs>;
    members?: boolean | Prisma.Ekub$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.EkubCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ekub"]>;
export type EkubSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    quotaAmount?: boolean;
    totalQuotas?: boolean;
    cycle?: boolean;
    startDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["ekub"]>;
export type EkubSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    quotaAmount?: boolean;
    totalQuotas?: boolean;
    cycle?: boolean;
    startDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["ekub"]>;
export type EkubSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    quotaAmount?: boolean;
    totalQuotas?: boolean;
    cycle?: boolean;
    startDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type EkubOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "quotaAmount" | "totalQuotas" | "cycle" | "startDate" | "status" | "createdAt", ExtArgs["result"]["ekub"]>;
export type EkubInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quotas?: boolean | Prisma.Ekub$quotasArgs<ExtArgs>;
    members?: boolean | Prisma.Ekub$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.EkubCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EkubIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type EkubIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $EkubPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Ekub";
    objects: {
        quotas: Prisma.$QuotaPayload<ExtArgs>[];
        members: Prisma.$MemberPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        description: string | null;
        quotaAmount: number;
        totalQuotas: number;
        cycle: $Enums.Cycle;
        startDate: Date;
        status: $Enums.EkubStatus;
        createdAt: Date;
    }, ExtArgs["result"]["ekub"]>;
    composites: {};
};
export type EkubGetPayload<S extends boolean | null | undefined | EkubDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EkubPayload, S>;
export type EkubCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EkubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EkubCountAggregateInputType | true;
};
export interface EkubDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Ekub'];
        meta: {
            name: 'Ekub';
        };
    };
    findUnique<T extends EkubFindUniqueArgs>(args: Prisma.SelectSubset<T, EkubFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EkubFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EkubFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EkubFindFirstArgs>(args?: Prisma.SelectSubset<T, EkubFindFirstArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EkubFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EkubFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EkubFindManyArgs>(args?: Prisma.SelectSubset<T, EkubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EkubCreateArgs>(args: Prisma.SelectSubset<T, EkubCreateArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EkubCreateManyArgs>(args?: Prisma.SelectSubset<T, EkubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EkubCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EkubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EkubDeleteArgs>(args: Prisma.SelectSubset<T, EkubDeleteArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EkubUpdateArgs>(args: Prisma.SelectSubset<T, EkubUpdateArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EkubDeleteManyArgs>(args?: Prisma.SelectSubset<T, EkubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EkubUpdateManyArgs>(args: Prisma.SelectSubset<T, EkubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EkubUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EkubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EkubUpsertArgs>(args: Prisma.SelectSubset<T, EkubUpsertArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EkubCountArgs>(args?: Prisma.Subset<T, EkubCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EkubCountAggregateOutputType> : number>;
    aggregate<T extends EkubAggregateArgs>(args: Prisma.Subset<T, EkubAggregateArgs>): Prisma.PrismaPromise<GetEkubAggregateType<T>>;
    groupBy<T extends EkubGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EkubGroupByArgs['orderBy'];
    } : {
        orderBy?: EkubGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EkubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEkubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EkubFieldRefs;
}
export interface Prisma__EkubClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    quotas<T extends Prisma.Ekub$quotasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ekub$quotasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    members<T extends Prisma.Ekub$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ekub$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EkubFieldRefs {
    readonly id: Prisma.FieldRef<"Ekub", 'Int'>;
    readonly name: Prisma.FieldRef<"Ekub", 'String'>;
    readonly description: Prisma.FieldRef<"Ekub", 'String'>;
    readonly quotaAmount: Prisma.FieldRef<"Ekub", 'Int'>;
    readonly totalQuotas: Prisma.FieldRef<"Ekub", 'Int'>;
    readonly cycle: Prisma.FieldRef<"Ekub", 'Cycle'>;
    readonly startDate: Prisma.FieldRef<"Ekub", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Ekub", 'EkubStatus'>;
    readonly createdAt: Prisma.FieldRef<"Ekub", 'DateTime'>;
}
export type EkubFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where: Prisma.EkubWhereUniqueInput;
};
export type EkubFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where: Prisma.EkubWhereUniqueInput;
};
export type EkubFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where?: Prisma.EkubWhereInput;
    orderBy?: Prisma.EkubOrderByWithRelationInput | Prisma.EkubOrderByWithRelationInput[];
    cursor?: Prisma.EkubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EkubScalarFieldEnum | Prisma.EkubScalarFieldEnum[];
};
export type EkubFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where?: Prisma.EkubWhereInput;
    orderBy?: Prisma.EkubOrderByWithRelationInput | Prisma.EkubOrderByWithRelationInput[];
    cursor?: Prisma.EkubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EkubScalarFieldEnum | Prisma.EkubScalarFieldEnum[];
};
export type EkubFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where?: Prisma.EkubWhereInput;
    orderBy?: Prisma.EkubOrderByWithRelationInput | Prisma.EkubOrderByWithRelationInput[];
    cursor?: Prisma.EkubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EkubScalarFieldEnum | Prisma.EkubScalarFieldEnum[];
};
export type EkubCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EkubCreateInput, Prisma.EkubUncheckedCreateInput>;
};
export type EkubCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EkubCreateManyInput | Prisma.EkubCreateManyInput[];
};
export type EkubCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    data: Prisma.EkubCreateManyInput | Prisma.EkubCreateManyInput[];
};
export type EkubUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EkubUpdateInput, Prisma.EkubUncheckedUpdateInput>;
    where: Prisma.EkubWhereUniqueInput;
};
export type EkubUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EkubUpdateManyMutationInput, Prisma.EkubUncheckedUpdateManyInput>;
    where?: Prisma.EkubWhereInput;
    limit?: number;
};
export type EkubUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EkubUpdateManyMutationInput, Prisma.EkubUncheckedUpdateManyInput>;
    where?: Prisma.EkubWhereInput;
    limit?: number;
};
export type EkubUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where: Prisma.EkubWhereUniqueInput;
    create: Prisma.XOR<Prisma.EkubCreateInput, Prisma.EkubUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EkubUpdateInput, Prisma.EkubUncheckedUpdateInput>;
};
export type EkubDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
    where: Prisma.EkubWhereUniqueInput;
};
export type EkubDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EkubWhereInput;
    limit?: number;
};
export type Ekub$quotasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where?: Prisma.QuotaWhereInput;
    orderBy?: Prisma.QuotaOrderByWithRelationInput | Prisma.QuotaOrderByWithRelationInput[];
    cursor?: Prisma.QuotaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuotaScalarFieldEnum | Prisma.QuotaScalarFieldEnum[];
};
export type Ekub$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type EkubDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EkubSelect<ExtArgs> | null;
    omit?: Prisma.EkubOmit<ExtArgs> | null;
    include?: Prisma.EkubInclude<ExtArgs> | null;
};
