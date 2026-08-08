import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MemberModel = runtime.Types.Result.DefaultSelection<Prisma.$MemberPayload>;
export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null;
    _avg: MemberAvgAggregateOutputType | null;
    _sum: MemberSumAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type MemberAvgAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    preferredAmount: number | null;
    quotaAmount: number | null;
    shareGroup: number | null;
    quotaId: number | null;
};
export type MemberSumAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    preferredAmount: number | null;
    quotaAmount: number | null;
    shareGroup: number | null;
    quotaId: number | null;
};
export type MemberMinAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    name: string | null;
    address: string | null;
    phone: string | null;
    preferredAmount: number | null;
    quotaAmount: number | null;
    shareGroup: number | null;
    quotaId: number | null;
    createdAt: Date | null;
};
export type MemberMaxAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    name: string | null;
    address: string | null;
    phone: string | null;
    preferredAmount: number | null;
    quotaAmount: number | null;
    shareGroup: number | null;
    quotaId: number | null;
    createdAt: Date | null;
};
export type MemberCountAggregateOutputType = {
    id: number;
    ekubId: number;
    name: number;
    address: number;
    phone: number;
    preferredAmount: number;
    quotaAmount: number;
    shareGroup: number;
    quotaId: number;
    createdAt: number;
    _all: number;
};
export type MemberAvgAggregateInputType = {
    id?: true;
    ekubId?: true;
    preferredAmount?: true;
    quotaAmount?: true;
    shareGroup?: true;
    quotaId?: true;
};
export type MemberSumAggregateInputType = {
    id?: true;
    ekubId?: true;
    preferredAmount?: true;
    quotaAmount?: true;
    shareGroup?: true;
    quotaId?: true;
};
export type MemberMinAggregateInputType = {
    id?: true;
    ekubId?: true;
    name?: true;
    address?: true;
    phone?: true;
    preferredAmount?: true;
    quotaAmount?: true;
    shareGroup?: true;
    quotaId?: true;
    createdAt?: true;
};
export type MemberMaxAggregateInputType = {
    id?: true;
    ekubId?: true;
    name?: true;
    address?: true;
    phone?: true;
    preferredAmount?: true;
    quotaAmount?: true;
    shareGroup?: true;
    quotaId?: true;
    createdAt?: true;
};
export type MemberCountAggregateInputType = {
    id?: true;
    ekubId?: true;
    name?: true;
    address?: true;
    phone?: true;
    preferredAmount?: true;
    quotaAmount?: true;
    shareGroup?: true;
    quotaId?: true;
    createdAt?: true;
    _all?: true;
};
export type MemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MemberCountAggregateInputType;
    _avg?: MemberAvgAggregateInputType;
    _sum?: MemberSumAggregateInputType;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
    [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMember[P]> : Prisma.GetScalarType<T[P], AggregateMember[P]>;
};
export type MemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithAggregationInput | Prisma.MemberOrderByWithAggregationInput[];
    by: Prisma.MemberScalarFieldEnum[] | Prisma.MemberScalarFieldEnum;
    having?: Prisma.MemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MemberCountAggregateInputType | true;
    _avg?: MemberAvgAggregateInputType;
    _sum?: MemberSumAggregateInputType;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type MemberGroupByOutputType = {
    id: number;
    ekubId: number;
    name: string;
    address: string;
    phone: string | null;
    preferredAmount: number;
    quotaAmount: number | null;
    shareGroup: number | null;
    quotaId: number | null;
    createdAt: Date;
    _count: MemberCountAggregateOutputType | null;
    _avg: MemberAvgAggregateOutputType | null;
    _sum: MemberSumAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]>;
}>>;
export type MemberWhereInput = {
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    id?: Prisma.IntFilter<"Member"> | number;
    ekubId?: Prisma.IntFilter<"Member"> | number;
    name?: Prisma.StringFilter<"Member"> | string;
    address?: Prisma.StringFilter<"Member"> | string;
    phone?: Prisma.StringNullableFilter<"Member"> | string | null;
    preferredAmount?: Prisma.IntFilter<"Member"> | number;
    quotaAmount?: Prisma.IntNullableFilter<"Member"> | number | null;
    shareGroup?: Prisma.IntNullableFilter<"Member"> | number | null;
    quotaId?: Prisma.IntNullableFilter<"Member"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    ekub?: Prisma.XOR<Prisma.EkubScalarRelationFilter, Prisma.EkubWhereInput>;
    quota?: Prisma.XOR<Prisma.QuotaNullableScalarRelationFilter, Prisma.QuotaWhereInput> | null;
    payments?: Prisma.PaymentListRelationFilter;
    receivedPayments?: Prisma.PaymentListRelationFilter;
};
export type MemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    shareGroup?: Prisma.SortOrderInput | Prisma.SortOrder;
    quotaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    ekub?: Prisma.EkubOrderByWithRelationInput;
    quota?: Prisma.QuotaOrderByWithRelationInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
    receivedPayments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    ekubId?: Prisma.IntFilter<"Member"> | number;
    name?: Prisma.StringFilter<"Member"> | string;
    address?: Prisma.StringFilter<"Member"> | string;
    phone?: Prisma.StringNullableFilter<"Member"> | string | null;
    preferredAmount?: Prisma.IntFilter<"Member"> | number;
    quotaAmount?: Prisma.IntNullableFilter<"Member"> | number | null;
    shareGroup?: Prisma.IntNullableFilter<"Member"> | number | null;
    quotaId?: Prisma.IntNullableFilter<"Member"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    ekub?: Prisma.XOR<Prisma.EkubScalarRelationFilter, Prisma.EkubWhereInput>;
    quota?: Prisma.XOR<Prisma.QuotaNullableScalarRelationFilter, Prisma.QuotaWhereInput> | null;
    payments?: Prisma.PaymentListRelationFilter;
    receivedPayments?: Prisma.PaymentListRelationFilter;
}, "id">;
export type MemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    shareGroup?: Prisma.SortOrderInput | Prisma.SortOrder;
    quotaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MemberCountOrderByAggregateInput;
    _avg?: Prisma.MemberAvgOrderByAggregateInput;
    _max?: Prisma.MemberMaxOrderByAggregateInput;
    _min?: Prisma.MemberMinOrderByAggregateInput;
    _sum?: Prisma.MemberSumOrderByAggregateInput;
};
export type MemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.MemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Member"> | number;
    ekubId?: Prisma.IntWithAggregatesFilter<"Member"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    address?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Member"> | string | null;
    preferredAmount?: Prisma.IntWithAggregatesFilter<"Member"> | number;
    quotaAmount?: Prisma.IntNullableWithAggregatesFilter<"Member"> | number | null;
    shareGroup?: Prisma.IntNullableWithAggregatesFilter<"Member"> | number | null;
    quotaId?: Prisma.IntNullableWithAggregatesFilter<"Member"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Member"> | Date | string;
};
export type MemberCreateInput = {
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    ekub: Prisma.EkubCreateNestedOneWithoutMembersInput;
    quota?: Prisma.QuotaCreateNestedOneWithoutMembersInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentCreateNestedManyWithoutRecipientInput;
};
export type MemberUncheckedCreateInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentUncheckedCreateNestedManyWithoutRecipientInput;
};
export type MemberUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutMembersNestedInput;
    quota?: Prisma.QuotaUpdateOneWithoutMembersNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUncheckedUpdateManyWithoutRecipientNestedInput;
};
export type MemberCreateManyInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
};
export type MemberUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberListRelationFilter = {
    every?: Prisma.MemberWhereInput;
    some?: Prisma.MemberWhereInput;
    none?: Prisma.MemberWhereInput;
};
export type MemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    shareGroup?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MemberAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    shareGroup?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
};
export type MemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    shareGroup?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    shareGroup?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MemberSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    preferredAmount?: Prisma.SortOrder;
    quotaAmount?: Prisma.SortOrder;
    shareGroup?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
};
export type MemberScalarRelationFilter = {
    is?: Prisma.MemberWhereInput;
    isNot?: Prisma.MemberWhereInput;
};
export type MemberNullableScalarRelationFilter = {
    is?: Prisma.MemberWhereInput | null;
    isNot?: Prisma.MemberWhereInput | null;
};
export type MemberCreateNestedManyWithoutEkubInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput> | Prisma.MemberCreateWithoutEkubInput[] | Prisma.MemberUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutEkubInput | Prisma.MemberCreateOrConnectWithoutEkubInput[];
    createMany?: Prisma.MemberCreateManyEkubInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUncheckedCreateNestedManyWithoutEkubInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput> | Prisma.MemberCreateWithoutEkubInput[] | Prisma.MemberUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutEkubInput | Prisma.MemberCreateOrConnectWithoutEkubInput[];
    createMany?: Prisma.MemberCreateManyEkubInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUpdateManyWithoutEkubNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput> | Prisma.MemberCreateWithoutEkubInput[] | Prisma.MemberUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutEkubInput | Prisma.MemberCreateOrConnectWithoutEkubInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutEkubInput | Prisma.MemberUpsertWithWhereUniqueWithoutEkubInput[];
    createMany?: Prisma.MemberCreateManyEkubInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutEkubInput | Prisma.MemberUpdateWithWhereUniqueWithoutEkubInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutEkubInput | Prisma.MemberUpdateManyWithWhereWithoutEkubInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type MemberUncheckedUpdateManyWithoutEkubNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput> | Prisma.MemberCreateWithoutEkubInput[] | Prisma.MemberUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutEkubInput | Prisma.MemberCreateOrConnectWithoutEkubInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutEkubInput | Prisma.MemberUpsertWithWhereUniqueWithoutEkubInput[];
    createMany?: Prisma.MemberCreateManyEkubInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutEkubInput | Prisma.MemberUpdateWithWhereUniqueWithoutEkubInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutEkubInput | Prisma.MemberUpdateManyWithWhereWithoutEkubInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MemberCreateNestedManyWithoutQuotaInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput> | Prisma.MemberCreateWithoutQuotaInput[] | Prisma.MemberUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutQuotaInput | Prisma.MemberCreateOrConnectWithoutQuotaInput[];
    createMany?: Prisma.MemberCreateManyQuotaInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUncheckedCreateNestedManyWithoutQuotaInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput> | Prisma.MemberCreateWithoutQuotaInput[] | Prisma.MemberUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutQuotaInput | Prisma.MemberCreateOrConnectWithoutQuotaInput[];
    createMany?: Prisma.MemberCreateManyQuotaInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUpdateManyWithoutQuotaNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput> | Prisma.MemberCreateWithoutQuotaInput[] | Prisma.MemberUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutQuotaInput | Prisma.MemberCreateOrConnectWithoutQuotaInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutQuotaInput | Prisma.MemberUpsertWithWhereUniqueWithoutQuotaInput[];
    createMany?: Prisma.MemberCreateManyQuotaInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutQuotaInput | Prisma.MemberUpdateWithWhereUniqueWithoutQuotaInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutQuotaInput | Prisma.MemberUpdateManyWithWhereWithoutQuotaInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type MemberUncheckedUpdateManyWithoutQuotaNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput> | Prisma.MemberCreateWithoutQuotaInput[] | Prisma.MemberUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutQuotaInput | Prisma.MemberCreateOrConnectWithoutQuotaInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutQuotaInput | Prisma.MemberUpsertWithWhereUniqueWithoutQuotaInput[];
    createMany?: Prisma.MemberCreateManyQuotaInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutQuotaInput | Prisma.MemberUpdateWithWhereUniqueWithoutQuotaInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutQuotaInput | Prisma.MemberUpdateManyWithWhereWithoutQuotaInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type MemberCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.MemberWhereUniqueInput;
};
export type MemberCreateNestedOneWithoutReceivedPaymentsInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedCreateWithoutReceivedPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutReceivedPaymentsInput;
    connect?: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.MemberUpsertWithoutPaymentsInput;
    connect?: Prisma.MemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MemberUpdateToOneWithWhereWithoutPaymentsInput, Prisma.MemberUpdateWithoutPaymentsInput>, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
};
export type MemberUpdateOneWithoutReceivedPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedCreateWithoutReceivedPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutReceivedPaymentsInput;
    upsert?: Prisma.MemberUpsertWithoutReceivedPaymentsInput;
    disconnect?: Prisma.MemberWhereInput | boolean;
    delete?: Prisma.MemberWhereInput | boolean;
    connect?: Prisma.MemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MemberUpdateToOneWithWhereWithoutReceivedPaymentsInput, Prisma.MemberUpdateWithoutReceivedPaymentsInput>, Prisma.MemberUncheckedUpdateWithoutReceivedPaymentsInput>;
};
export type MemberCreateWithoutEkubInput = {
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    quota?: Prisma.QuotaCreateNestedOneWithoutMembersInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentCreateNestedManyWithoutRecipientInput;
};
export type MemberUncheckedCreateWithoutEkubInput = {
    id?: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentUncheckedCreateNestedManyWithoutRecipientInput;
};
export type MemberCreateOrConnectWithoutEkubInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput>;
};
export type MemberCreateManyEkubInputEnvelope = {
    data: Prisma.MemberCreateManyEkubInput | Prisma.MemberCreateManyEkubInput[];
};
export type MemberUpsertWithWhereUniqueWithoutEkubInput = {
    where: Prisma.MemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.MemberUpdateWithoutEkubInput, Prisma.MemberUncheckedUpdateWithoutEkubInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutEkubInput, Prisma.MemberUncheckedCreateWithoutEkubInput>;
};
export type MemberUpdateWithWhereUniqueWithoutEkubInput = {
    where: Prisma.MemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutEkubInput, Prisma.MemberUncheckedUpdateWithoutEkubInput>;
};
export type MemberUpdateManyWithWhereWithoutEkubInput = {
    where: Prisma.MemberScalarWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyWithoutEkubInput>;
};
export type MemberScalarWhereInput = {
    AND?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
    OR?: Prisma.MemberScalarWhereInput[];
    NOT?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
    id?: Prisma.IntFilter<"Member"> | number;
    ekubId?: Prisma.IntFilter<"Member"> | number;
    name?: Prisma.StringFilter<"Member"> | string;
    address?: Prisma.StringFilter<"Member"> | string;
    phone?: Prisma.StringNullableFilter<"Member"> | string | null;
    preferredAmount?: Prisma.IntFilter<"Member"> | number;
    quotaAmount?: Prisma.IntNullableFilter<"Member"> | number | null;
    shareGroup?: Prisma.IntNullableFilter<"Member"> | number | null;
    quotaId?: Prisma.IntNullableFilter<"Member"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
};
export type MemberCreateWithoutQuotaInput = {
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    ekub: Prisma.EkubCreateNestedOneWithoutMembersInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentCreateNestedManyWithoutRecipientInput;
};
export type MemberUncheckedCreateWithoutQuotaInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
    receivedPayments?: Prisma.PaymentUncheckedCreateNestedManyWithoutRecipientInput;
};
export type MemberCreateOrConnectWithoutQuotaInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput>;
};
export type MemberCreateManyQuotaInputEnvelope = {
    data: Prisma.MemberCreateManyQuotaInput | Prisma.MemberCreateManyQuotaInput[];
};
export type MemberUpsertWithWhereUniqueWithoutQuotaInput = {
    where: Prisma.MemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.MemberUpdateWithoutQuotaInput, Prisma.MemberUncheckedUpdateWithoutQuotaInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutQuotaInput, Prisma.MemberUncheckedCreateWithoutQuotaInput>;
};
export type MemberUpdateWithWhereUniqueWithoutQuotaInput = {
    where: Prisma.MemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutQuotaInput, Prisma.MemberUncheckedUpdateWithoutQuotaInput>;
};
export type MemberUpdateManyWithWhereWithoutQuotaInput = {
    where: Prisma.MemberScalarWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyWithoutQuotaInput>;
};
export type MemberCreateWithoutPaymentsInput = {
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    ekub: Prisma.EkubCreateNestedOneWithoutMembersInput;
    quota?: Prisma.QuotaCreateNestedOneWithoutMembersInput;
    receivedPayments?: Prisma.PaymentCreateNestedManyWithoutRecipientInput;
};
export type MemberUncheckedCreateWithoutPaymentsInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
    receivedPayments?: Prisma.PaymentUncheckedCreateNestedManyWithoutRecipientInput;
};
export type MemberCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
};
export type MemberCreateWithoutReceivedPaymentsInput = {
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
    ekub: Prisma.EkubCreateNestedOneWithoutMembersInput;
    quota?: Prisma.QuotaCreateNestedOneWithoutMembersInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
};
export type MemberUncheckedCreateWithoutReceivedPaymentsInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
};
export type MemberCreateOrConnectWithoutReceivedPaymentsInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedCreateWithoutReceivedPaymentsInput>;
};
export type MemberUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.MemberUpdateWithoutPaymentsInput, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.MemberWhereInput;
};
export type MemberUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.MemberWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutPaymentsInput, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
};
export type MemberUpdateWithoutPaymentsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutMembersNestedInput;
    quota?: Prisma.QuotaUpdateOneWithoutMembersNestedInput;
    receivedPayments?: Prisma.PaymentUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receivedPayments?: Prisma.PaymentUncheckedUpdateManyWithoutRecipientNestedInput;
};
export type MemberUpsertWithoutReceivedPaymentsInput = {
    update: Prisma.XOR<Prisma.MemberUpdateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedUpdateWithoutReceivedPaymentsInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedCreateWithoutReceivedPaymentsInput>;
    where?: Prisma.MemberWhereInput;
};
export type MemberUpdateToOneWithWhereWithoutReceivedPaymentsInput = {
    where?: Prisma.MemberWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutReceivedPaymentsInput, Prisma.MemberUncheckedUpdateWithoutReceivedPaymentsInput>;
};
export type MemberUpdateWithoutReceivedPaymentsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutMembersNestedInput;
    quota?: Prisma.QuotaUpdateOneWithoutMembersNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
};
export type MemberUncheckedUpdateWithoutReceivedPaymentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
};
export type MemberCreateManyEkubInput = {
    id?: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    quotaId?: number | null;
    createdAt?: Date | string;
};
export type MemberUpdateWithoutEkubInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quota?: Prisma.QuotaUpdateOneWithoutMembersNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateWithoutEkubInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUncheckedUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateManyWithoutEkubInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quotaId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCreateManyQuotaInput = {
    id?: number;
    ekubId: number;
    name: string;
    address: string;
    phone?: string | null;
    preferredAmount: number;
    quotaAmount?: number | null;
    shareGroup?: number | null;
    createdAt?: Date | string;
};
export type MemberUpdateWithoutQuotaInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutMembersNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateWithoutQuotaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
    receivedPayments?: Prisma.PaymentUncheckedUpdateManyWithoutRecipientNestedInput;
};
export type MemberUncheckedUpdateManyWithoutQuotaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferredAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaAmount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareGroup?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCountOutputType = {
    payments: number;
    receivedPayments: number;
};
export type MemberCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | MemberCountOutputTypeCountPaymentsArgs;
    receivedPayments?: boolean | MemberCountOutputTypeCountReceivedPaymentsArgs;
};
export type MemberCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberCountOutputTypeSelect<ExtArgs> | null;
};
export type MemberCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type MemberCountOutputTypeCountReceivedPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type MemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    name?: boolean;
    address?: boolean;
    phone?: boolean;
    preferredAmount?: boolean;
    quotaAmount?: boolean;
    shareGroup?: boolean;
    quotaId?: boolean;
    createdAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
    payments?: boolean | Prisma.Member$paymentsArgs<ExtArgs>;
    receivedPayments?: boolean | Prisma.Member$receivedPaymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    name?: boolean;
    address?: boolean;
    phone?: boolean;
    preferredAmount?: boolean;
    quotaAmount?: boolean;
    shareGroup?: boolean;
    quotaId?: boolean;
    createdAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    name?: boolean;
    address?: boolean;
    phone?: boolean;
    preferredAmount?: boolean;
    quotaAmount?: boolean;
    shareGroup?: boolean;
    quotaId?: boolean;
    createdAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectScalar = {
    id?: boolean;
    ekubId?: boolean;
    name?: boolean;
    address?: boolean;
    phone?: boolean;
    preferredAmount?: boolean;
    quotaAmount?: boolean;
    shareGroup?: boolean;
    quotaId?: boolean;
    createdAt?: boolean;
};
export type MemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ekubId" | "name" | "address" | "phone" | "preferredAmount" | "quotaAmount" | "shareGroup" | "quotaId" | "createdAt", ExtArgs["result"]["member"]>;
export type MemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
    payments?: boolean | Prisma.Member$paymentsArgs<ExtArgs>;
    receivedPayments?: boolean | Prisma.Member$receivedPaymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
};
export type MemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    quota?: boolean | Prisma.Member$quotaArgs<ExtArgs>;
};
export type $MemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Member";
    objects: {
        ekub: Prisma.$EkubPayload<ExtArgs>;
        quota: Prisma.$QuotaPayload<ExtArgs> | null;
        payments: Prisma.$PaymentPayload<ExtArgs>[];
        receivedPayments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        ekubId: number;
        name: string;
        address: string;
        phone: string | null;
        preferredAmount: number;
        quotaAmount: number | null;
        shareGroup: number | null;
        quotaId: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["member"]>;
    composites: {};
};
export type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MemberPayload, S>;
export type MemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MemberCountAggregateInputType | true;
};
export interface MemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Member'];
        meta: {
            name: 'Member';
        };
    };
    findUnique<T extends MemberFindUniqueArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MemberFindFirstArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MemberFindManyArgs>(args?: Prisma.SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MemberCreateArgs>(args: Prisma.SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MemberCreateManyArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MemberDeleteArgs>(args: Prisma.SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MemberUpdateArgs>(args: Prisma.SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MemberUpdateManyArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MemberUpsertArgs>(args: Prisma.SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MemberCountArgs>(args?: Prisma.Subset<T, MemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MemberCountAggregateOutputType> : number>;
    aggregate<T extends MemberAggregateArgs>(args: Prisma.Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>;
    groupBy<T extends MemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MemberGroupByArgs['orderBy'];
    } : {
        orderBy?: MemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MemberFieldRefs;
}
export interface Prisma__MemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ekub<T extends Prisma.EkubDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EkubDefaultArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    quota<T extends Prisma.Member$quotaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$quotaArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.Member$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    receivedPayments<T extends Prisma.Member$receivedPaymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$receivedPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MemberFieldRefs {
    readonly id: Prisma.FieldRef<"Member", 'Int'>;
    readonly ekubId: Prisma.FieldRef<"Member", 'Int'>;
    readonly name: Prisma.FieldRef<"Member", 'String'>;
    readonly address: Prisma.FieldRef<"Member", 'String'>;
    readonly phone: Prisma.FieldRef<"Member", 'String'>;
    readonly preferredAmount: Prisma.FieldRef<"Member", 'Int'>;
    readonly quotaAmount: Prisma.FieldRef<"Member", 'Int'>;
    readonly shareGroup: Prisma.FieldRef<"Member", 'Int'>;
    readonly quotaId: Prisma.FieldRef<"Member", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Member", 'DateTime'>;
}
export type MemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
};
export type MemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
};
export type MemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
    include?: Prisma.MemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type MemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
    include?: Prisma.MemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
};
export type MemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type Member$quotaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where?: Prisma.QuotaWhereInput;
};
export type Member$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type Member$receivedPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type MemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
};
