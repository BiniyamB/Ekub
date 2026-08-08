import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuotaModel = runtime.Types.Result.DefaultSelection<Prisma.$QuotaPayload>;
export type AggregateQuota = {
    _count: QuotaCountAggregateOutputType | null;
    _avg: QuotaAvgAggregateOutputType | null;
    _sum: QuotaSumAggregateOutputType | null;
    _min: QuotaMinAggregateOutputType | null;
    _max: QuotaMaxAggregateOutputType | null;
};
export type QuotaAvgAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    position: number | null;
};
export type QuotaSumAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    position: number | null;
};
export type QuotaMinAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    position: number | null;
    status: $Enums.DrawStatus | null;
    winnerAt: Date | null;
};
export type QuotaMaxAggregateOutputType = {
    id: number | null;
    ekubId: number | null;
    position: number | null;
    status: $Enums.DrawStatus | null;
    winnerAt: Date | null;
};
export type QuotaCountAggregateOutputType = {
    id: number;
    ekubId: number;
    position: number;
    status: number;
    winnerAt: number;
    _all: number;
};
export type QuotaAvgAggregateInputType = {
    id?: true;
    ekubId?: true;
    position?: true;
};
export type QuotaSumAggregateInputType = {
    id?: true;
    ekubId?: true;
    position?: true;
};
export type QuotaMinAggregateInputType = {
    id?: true;
    ekubId?: true;
    position?: true;
    status?: true;
    winnerAt?: true;
};
export type QuotaMaxAggregateInputType = {
    id?: true;
    ekubId?: true;
    position?: true;
    status?: true;
    winnerAt?: true;
};
export type QuotaCountAggregateInputType = {
    id?: true;
    ekubId?: true;
    position?: true;
    status?: true;
    winnerAt?: true;
    _all?: true;
};
export type QuotaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuotaWhereInput;
    orderBy?: Prisma.QuotaOrderByWithRelationInput | Prisma.QuotaOrderByWithRelationInput[];
    cursor?: Prisma.QuotaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuotaCountAggregateInputType;
    _avg?: QuotaAvgAggregateInputType;
    _sum?: QuotaSumAggregateInputType;
    _min?: QuotaMinAggregateInputType;
    _max?: QuotaMaxAggregateInputType;
};
export type GetQuotaAggregateType<T extends QuotaAggregateArgs> = {
    [P in keyof T & keyof AggregateQuota]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuota[P]> : Prisma.GetScalarType<T[P], AggregateQuota[P]>;
};
export type QuotaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuotaWhereInput;
    orderBy?: Prisma.QuotaOrderByWithAggregationInput | Prisma.QuotaOrderByWithAggregationInput[];
    by: Prisma.QuotaScalarFieldEnum[] | Prisma.QuotaScalarFieldEnum;
    having?: Prisma.QuotaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuotaCountAggregateInputType | true;
    _avg?: QuotaAvgAggregateInputType;
    _sum?: QuotaSumAggregateInputType;
    _min?: QuotaMinAggregateInputType;
    _max?: QuotaMaxAggregateInputType;
};
export type QuotaGroupByOutputType = {
    id: number;
    ekubId: number;
    position: number;
    status: $Enums.DrawStatus;
    winnerAt: Date | null;
    _count: QuotaCountAggregateOutputType | null;
    _avg: QuotaAvgAggregateOutputType | null;
    _sum: QuotaSumAggregateOutputType | null;
    _min: QuotaMinAggregateOutputType | null;
    _max: QuotaMaxAggregateOutputType | null;
};
export type GetQuotaGroupByPayload<T extends QuotaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuotaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuotaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuotaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuotaGroupByOutputType[P]>;
}>>;
export type QuotaWhereInput = {
    AND?: Prisma.QuotaWhereInput | Prisma.QuotaWhereInput[];
    OR?: Prisma.QuotaWhereInput[];
    NOT?: Prisma.QuotaWhereInput | Prisma.QuotaWhereInput[];
    id?: Prisma.IntFilter<"Quota"> | number;
    ekubId?: Prisma.IntFilter<"Quota"> | number;
    position?: Prisma.IntFilter<"Quota"> | number;
    status?: Prisma.EnumDrawStatusFilter<"Quota"> | $Enums.DrawStatus;
    winnerAt?: Prisma.DateTimeNullableFilter<"Quota"> | Date | string | null;
    ekub?: Prisma.XOR<Prisma.EkubScalarRelationFilter, Prisma.EkubWhereInput>;
    members?: Prisma.MemberListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
};
export type QuotaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    winnerAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    ekub?: Prisma.EkubOrderByWithRelationInput;
    members?: Prisma.MemberOrderByRelationAggregateInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type QuotaWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.QuotaWhereInput | Prisma.QuotaWhereInput[];
    OR?: Prisma.QuotaWhereInput[];
    NOT?: Prisma.QuotaWhereInput | Prisma.QuotaWhereInput[];
    ekubId?: Prisma.IntFilter<"Quota"> | number;
    position?: Prisma.IntFilter<"Quota"> | number;
    status?: Prisma.EnumDrawStatusFilter<"Quota"> | $Enums.DrawStatus;
    winnerAt?: Prisma.DateTimeNullableFilter<"Quota"> | Date | string | null;
    ekub?: Prisma.XOR<Prisma.EkubScalarRelationFilter, Prisma.EkubWhereInput>;
    members?: Prisma.MemberListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
}, "id">;
export type QuotaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    winnerAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.QuotaCountOrderByAggregateInput;
    _avg?: Prisma.QuotaAvgOrderByAggregateInput;
    _max?: Prisma.QuotaMaxOrderByAggregateInput;
    _min?: Prisma.QuotaMinOrderByAggregateInput;
    _sum?: Prisma.QuotaSumOrderByAggregateInput;
};
export type QuotaScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuotaScalarWhereWithAggregatesInput | Prisma.QuotaScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuotaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuotaScalarWhereWithAggregatesInput | Prisma.QuotaScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Quota"> | number;
    ekubId?: Prisma.IntWithAggregatesFilter<"Quota"> | number;
    position?: Prisma.IntWithAggregatesFilter<"Quota"> | number;
    status?: Prisma.EnumDrawStatusWithAggregatesFilter<"Quota"> | $Enums.DrawStatus;
    winnerAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Quota"> | Date | string | null;
};
export type QuotaCreateInput = {
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    ekub: Prisma.EkubCreateNestedOneWithoutQuotasInput;
    members?: Prisma.MemberCreateNestedManyWithoutQuotaInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutQuotaInput;
};
export type QuotaUncheckedCreateInput = {
    id?: number;
    ekubId: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutQuotaInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutQuotaInput;
};
export type QuotaUpdateInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutQuotasNestedInput;
    members?: Prisma.MemberUpdateManyWithoutQuotaNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutQuotaNestedInput;
};
export type QuotaUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    members?: Prisma.MemberUncheckedUpdateManyWithoutQuotaNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutQuotaNestedInput;
};
export type QuotaCreateManyInput = {
    id?: number;
    ekubId: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
};
export type QuotaUpdateManyMutationInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuotaUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuotaListRelationFilter = {
    every?: Prisma.QuotaWhereInput;
    some?: Prisma.QuotaWhereInput;
    none?: Prisma.QuotaWhereInput;
};
export type QuotaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuotaNullableScalarRelationFilter = {
    is?: Prisma.QuotaWhereInput | null;
    isNot?: Prisma.QuotaWhereInput | null;
};
export type QuotaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    winnerAt?: Prisma.SortOrder;
};
export type QuotaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuotaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    winnerAt?: Prisma.SortOrder;
};
export type QuotaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    winnerAt?: Prisma.SortOrder;
};
export type QuotaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ekubId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuotaScalarRelationFilter = {
    is?: Prisma.QuotaWhereInput;
    isNot?: Prisma.QuotaWhereInput;
};
export type QuotaCreateNestedManyWithoutEkubInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput> | Prisma.QuotaCreateWithoutEkubInput[] | Prisma.QuotaUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutEkubInput | Prisma.QuotaCreateOrConnectWithoutEkubInput[];
    createMany?: Prisma.QuotaCreateManyEkubInputEnvelope;
    connect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
};
export type QuotaUncheckedCreateNestedManyWithoutEkubInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput> | Prisma.QuotaCreateWithoutEkubInput[] | Prisma.QuotaUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutEkubInput | Prisma.QuotaCreateOrConnectWithoutEkubInput[];
    createMany?: Prisma.QuotaCreateManyEkubInputEnvelope;
    connect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
};
export type QuotaUpdateManyWithoutEkubNestedInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput> | Prisma.QuotaCreateWithoutEkubInput[] | Prisma.QuotaUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutEkubInput | Prisma.QuotaCreateOrConnectWithoutEkubInput[];
    upsert?: Prisma.QuotaUpsertWithWhereUniqueWithoutEkubInput | Prisma.QuotaUpsertWithWhereUniqueWithoutEkubInput[];
    createMany?: Prisma.QuotaCreateManyEkubInputEnvelope;
    set?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    disconnect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    delete?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    connect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    update?: Prisma.QuotaUpdateWithWhereUniqueWithoutEkubInput | Prisma.QuotaUpdateWithWhereUniqueWithoutEkubInput[];
    updateMany?: Prisma.QuotaUpdateManyWithWhereWithoutEkubInput | Prisma.QuotaUpdateManyWithWhereWithoutEkubInput[];
    deleteMany?: Prisma.QuotaScalarWhereInput | Prisma.QuotaScalarWhereInput[];
};
export type QuotaUncheckedUpdateManyWithoutEkubNestedInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput> | Prisma.QuotaCreateWithoutEkubInput[] | Prisma.QuotaUncheckedCreateWithoutEkubInput[];
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutEkubInput | Prisma.QuotaCreateOrConnectWithoutEkubInput[];
    upsert?: Prisma.QuotaUpsertWithWhereUniqueWithoutEkubInput | Prisma.QuotaUpsertWithWhereUniqueWithoutEkubInput[];
    createMany?: Prisma.QuotaCreateManyEkubInputEnvelope;
    set?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    disconnect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    delete?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    connect?: Prisma.QuotaWhereUniqueInput | Prisma.QuotaWhereUniqueInput[];
    update?: Prisma.QuotaUpdateWithWhereUniqueWithoutEkubInput | Prisma.QuotaUpdateWithWhereUniqueWithoutEkubInput[];
    updateMany?: Prisma.QuotaUpdateManyWithWhereWithoutEkubInput | Prisma.QuotaUpdateManyWithWhereWithoutEkubInput[];
    deleteMany?: Prisma.QuotaScalarWhereInput | Prisma.QuotaScalarWhereInput[];
};
export type QuotaCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutMembersInput, Prisma.QuotaUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutMembersInput;
    connect?: Prisma.QuotaWhereUniqueInput;
};
export type QuotaUpdateOneWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutMembersInput, Prisma.QuotaUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.QuotaUpsertWithoutMembersInput;
    disconnect?: Prisma.QuotaWhereInput | boolean;
    delete?: Prisma.QuotaWhereInput | boolean;
    connect?: Prisma.QuotaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuotaUpdateToOneWithWhereWithoutMembersInput, Prisma.QuotaUpdateWithoutMembersInput>, Prisma.QuotaUncheckedUpdateWithoutMembersInput>;
};
export type EnumDrawStatusFieldUpdateOperationsInput = {
    set?: $Enums.DrawStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type QuotaCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutPaymentsInput, Prisma.QuotaUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.QuotaWhereUniqueInput;
};
export type QuotaUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.QuotaCreateWithoutPaymentsInput, Prisma.QuotaUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.QuotaCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.QuotaUpsertWithoutPaymentsInput;
    connect?: Prisma.QuotaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuotaUpdateToOneWithWhereWithoutPaymentsInput, Prisma.QuotaUpdateWithoutPaymentsInput>, Prisma.QuotaUncheckedUpdateWithoutPaymentsInput>;
};
export type QuotaCreateWithoutEkubInput = {
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    members?: Prisma.MemberCreateNestedManyWithoutQuotaInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutQuotaInput;
};
export type QuotaUncheckedCreateWithoutEkubInput = {
    id?: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutQuotaInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutQuotaInput;
};
export type QuotaCreateOrConnectWithoutEkubInput = {
    where: Prisma.QuotaWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput>;
};
export type QuotaCreateManyEkubInputEnvelope = {
    data: Prisma.QuotaCreateManyEkubInput | Prisma.QuotaCreateManyEkubInput[];
};
export type QuotaUpsertWithWhereUniqueWithoutEkubInput = {
    where: Prisma.QuotaWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuotaUpdateWithoutEkubInput, Prisma.QuotaUncheckedUpdateWithoutEkubInput>;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutEkubInput, Prisma.QuotaUncheckedCreateWithoutEkubInput>;
};
export type QuotaUpdateWithWhereUniqueWithoutEkubInput = {
    where: Prisma.QuotaWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuotaUpdateWithoutEkubInput, Prisma.QuotaUncheckedUpdateWithoutEkubInput>;
};
export type QuotaUpdateManyWithWhereWithoutEkubInput = {
    where: Prisma.QuotaScalarWhereInput;
    data: Prisma.XOR<Prisma.QuotaUpdateManyMutationInput, Prisma.QuotaUncheckedUpdateManyWithoutEkubInput>;
};
export type QuotaScalarWhereInput = {
    AND?: Prisma.QuotaScalarWhereInput | Prisma.QuotaScalarWhereInput[];
    OR?: Prisma.QuotaScalarWhereInput[];
    NOT?: Prisma.QuotaScalarWhereInput | Prisma.QuotaScalarWhereInput[];
    id?: Prisma.IntFilter<"Quota"> | number;
    ekubId?: Prisma.IntFilter<"Quota"> | number;
    position?: Prisma.IntFilter<"Quota"> | number;
    status?: Prisma.EnumDrawStatusFilter<"Quota"> | $Enums.DrawStatus;
    winnerAt?: Prisma.DateTimeNullableFilter<"Quota"> | Date | string | null;
};
export type QuotaCreateWithoutMembersInput = {
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    ekub: Prisma.EkubCreateNestedOneWithoutQuotasInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutQuotaInput;
};
export type QuotaUncheckedCreateWithoutMembersInput = {
    id?: number;
    ekubId: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutQuotaInput;
};
export type QuotaCreateOrConnectWithoutMembersInput = {
    where: Prisma.QuotaWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutMembersInput, Prisma.QuotaUncheckedCreateWithoutMembersInput>;
};
export type QuotaUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.QuotaUpdateWithoutMembersInput, Prisma.QuotaUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutMembersInput, Prisma.QuotaUncheckedCreateWithoutMembersInput>;
    where?: Prisma.QuotaWhereInput;
};
export type QuotaUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.QuotaWhereInput;
    data: Prisma.XOR<Prisma.QuotaUpdateWithoutMembersInput, Prisma.QuotaUncheckedUpdateWithoutMembersInput>;
};
export type QuotaUpdateWithoutMembersInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutQuotasNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutQuotaNestedInput;
};
export type QuotaUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutQuotaNestedInput;
};
export type QuotaCreateWithoutPaymentsInput = {
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    ekub: Prisma.EkubCreateNestedOneWithoutQuotasInput;
    members?: Prisma.MemberCreateNestedManyWithoutQuotaInput;
};
export type QuotaUncheckedCreateWithoutPaymentsInput = {
    id?: number;
    ekubId: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutQuotaInput;
};
export type QuotaCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.QuotaWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutPaymentsInput, Prisma.QuotaUncheckedCreateWithoutPaymentsInput>;
};
export type QuotaUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.QuotaUpdateWithoutPaymentsInput, Prisma.QuotaUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.QuotaCreateWithoutPaymentsInput, Prisma.QuotaUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.QuotaWhereInput;
};
export type QuotaUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.QuotaWhereInput;
    data: Prisma.XOR<Prisma.QuotaUpdateWithoutPaymentsInput, Prisma.QuotaUncheckedUpdateWithoutPaymentsInput>;
};
export type QuotaUpdateWithoutPaymentsInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ekub?: Prisma.EkubUpdateOneRequiredWithoutQuotasNestedInput;
    members?: Prisma.MemberUpdateManyWithoutQuotaNestedInput;
};
export type QuotaUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ekubId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    members?: Prisma.MemberUncheckedUpdateManyWithoutQuotaNestedInput;
};
export type QuotaCreateManyEkubInput = {
    id?: number;
    position: number;
    status?: $Enums.DrawStatus;
    winnerAt?: Date | string | null;
};
export type QuotaUpdateWithoutEkubInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    members?: Prisma.MemberUpdateManyWithoutQuotaNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutQuotaNestedInput;
};
export type QuotaUncheckedUpdateWithoutEkubInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    members?: Prisma.MemberUncheckedUpdateManyWithoutQuotaNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutQuotaNestedInput;
};
export type QuotaUncheckedUpdateManyWithoutEkubInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    winnerAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuotaCountOutputType = {
    members: number;
    payments: number;
};
export type QuotaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | QuotaCountOutputTypeCountMembersArgs;
    payments?: boolean | QuotaCountOutputTypeCountPaymentsArgs;
};
export type QuotaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaCountOutputTypeSelect<ExtArgs> | null;
};
export type QuotaCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
};
export type QuotaCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type QuotaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    position?: boolean;
    status?: boolean;
    winnerAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.Quota$membersArgs<ExtArgs>;
    payments?: boolean | Prisma.Quota$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuotaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quota"]>;
export type QuotaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    position?: boolean;
    status?: boolean;
    winnerAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quota"]>;
export type QuotaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ekubId?: boolean;
    position?: boolean;
    status?: boolean;
    winnerAt?: boolean;
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quota"]>;
export type QuotaSelectScalar = {
    id?: boolean;
    ekubId?: boolean;
    position?: boolean;
    status?: boolean;
    winnerAt?: boolean;
};
export type QuotaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ekubId" | "position" | "status" | "winnerAt", ExtArgs["result"]["quota"]>;
export type QuotaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.Quota$membersArgs<ExtArgs>;
    payments?: boolean | Prisma.Quota$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuotaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuotaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
};
export type QuotaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ekub?: boolean | Prisma.EkubDefaultArgs<ExtArgs>;
};
export type $QuotaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Quota";
    objects: {
        ekub: Prisma.$EkubPayload<ExtArgs>;
        members: Prisma.$MemberPayload<ExtArgs>[];
        payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        ekubId: number;
        position: number;
        status: $Enums.DrawStatus;
        winnerAt: Date | null;
    }, ExtArgs["result"]["quota"]>;
    composites: {};
};
export type QuotaGetPayload<S extends boolean | null | undefined | QuotaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuotaPayload, S>;
export type QuotaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuotaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuotaCountAggregateInputType | true;
};
export interface QuotaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Quota'];
        meta: {
            name: 'Quota';
        };
    };
    findUnique<T extends QuotaFindUniqueArgs>(args: Prisma.SelectSubset<T, QuotaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuotaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuotaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuotaFindFirstArgs>(args?: Prisma.SelectSubset<T, QuotaFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuotaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuotaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuotaFindManyArgs>(args?: Prisma.SelectSubset<T, QuotaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuotaCreateArgs>(args: Prisma.SelectSubset<T, QuotaCreateArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuotaCreateManyArgs>(args?: Prisma.SelectSubset<T, QuotaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuotaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuotaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuotaDeleteArgs>(args: Prisma.SelectSubset<T, QuotaDeleteArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuotaUpdateArgs>(args: Prisma.SelectSubset<T, QuotaUpdateArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuotaDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuotaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuotaUpdateManyArgs>(args: Prisma.SelectSubset<T, QuotaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuotaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuotaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuotaUpsertArgs>(args: Prisma.SelectSubset<T, QuotaUpsertArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuotaCountArgs>(args?: Prisma.Subset<T, QuotaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuotaCountAggregateOutputType> : number>;
    aggregate<T extends QuotaAggregateArgs>(args: Prisma.Subset<T, QuotaAggregateArgs>): Prisma.PrismaPromise<GetQuotaAggregateType<T>>;
    groupBy<T extends QuotaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuotaGroupByArgs['orderBy'];
    } : {
        orderBy?: QuotaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuotaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuotaFieldRefs;
}
export interface Prisma__QuotaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ekub<T extends Prisma.EkubDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EkubDefaultArgs<ExtArgs>>): Prisma.Prisma__EkubClient<runtime.Types.Result.GetResult<Prisma.$EkubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    members<T extends Prisma.Quota$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Quota$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.Quota$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Quota$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuotaFieldRefs {
    readonly id: Prisma.FieldRef<"Quota", 'Int'>;
    readonly ekubId: Prisma.FieldRef<"Quota", 'Int'>;
    readonly position: Prisma.FieldRef<"Quota", 'Int'>;
    readonly status: Prisma.FieldRef<"Quota", 'DrawStatus'>;
    readonly winnerAt: Prisma.FieldRef<"Quota", 'DateTime'>;
}
export type QuotaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where: Prisma.QuotaWhereUniqueInput;
};
export type QuotaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where: Prisma.QuotaWhereUniqueInput;
};
export type QuotaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuotaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuotaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuotaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuotaCreateInput, Prisma.QuotaUncheckedCreateInput>;
};
export type QuotaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuotaCreateManyInput | Prisma.QuotaCreateManyInput[];
};
export type QuotaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    data: Prisma.QuotaCreateManyInput | Prisma.QuotaCreateManyInput[];
    include?: Prisma.QuotaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuotaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuotaUpdateInput, Prisma.QuotaUncheckedUpdateInput>;
    where: Prisma.QuotaWhereUniqueInput;
};
export type QuotaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuotaUpdateManyMutationInput, Prisma.QuotaUncheckedUpdateManyInput>;
    where?: Prisma.QuotaWhereInput;
    limit?: number;
};
export type QuotaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuotaUpdateManyMutationInput, Prisma.QuotaUncheckedUpdateManyInput>;
    where?: Prisma.QuotaWhereInput;
    limit?: number;
    include?: Prisma.QuotaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuotaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where: Prisma.QuotaWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuotaCreateInput, Prisma.QuotaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuotaUpdateInput, Prisma.QuotaUncheckedUpdateInput>;
};
export type QuotaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
    where: Prisma.QuotaWhereUniqueInput;
};
export type QuotaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuotaWhereInput;
    limit?: number;
};
export type Quota$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Quota$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuotaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuotaSelect<ExtArgs> | null;
    omit?: Prisma.QuotaOmit<ExtArgs> | null;
    include?: Prisma.QuotaInclude<ExtArgs> | null;
};
