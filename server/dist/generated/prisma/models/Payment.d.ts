import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentPayload>;
export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type PaymentAvgAggregateOutputType = {
    id: number | null;
    quotaId: number | null;
    memberId: number | null;
    amount: number | null;
    recipientId: number | null;
};
export type PaymentSumAggregateOutputType = {
    id: number | null;
    quotaId: number | null;
    memberId: number | null;
    amount: number | null;
    recipientId: number | null;
};
export type PaymentMinAggregateOutputType = {
    id: number | null;
    quotaId: number | null;
    memberId: number | null;
    amount: number | null;
    receiptUrl: string | null;
    note: string | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    recipientId: number | null;
};
export type PaymentMaxAggregateOutputType = {
    id: number | null;
    quotaId: number | null;
    memberId: number | null;
    amount: number | null;
    receiptUrl: string | null;
    note: string | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    recipientId: number | null;
};
export type PaymentCountAggregateOutputType = {
    id: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl: number;
    note: number;
    status: number;
    paidAt: number;
    createdAt: number;
    recipientId: number;
    _all: number;
};
export type PaymentAvgAggregateInputType = {
    id?: true;
    quotaId?: true;
    memberId?: true;
    amount?: true;
    recipientId?: true;
};
export type PaymentSumAggregateInputType = {
    id?: true;
    quotaId?: true;
    memberId?: true;
    amount?: true;
    recipientId?: true;
};
export type PaymentMinAggregateInputType = {
    id?: true;
    quotaId?: true;
    memberId?: true;
    amount?: true;
    receiptUrl?: true;
    note?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    recipientId?: true;
};
export type PaymentMaxAggregateInputType = {
    id?: true;
    quotaId?: true;
    memberId?: true;
    amount?: true;
    receiptUrl?: true;
    note?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    recipientId?: true;
};
export type PaymentCountAggregateInputType = {
    id?: true;
    quotaId?: true;
    memberId?: true;
    amount?: true;
    receiptUrl?: true;
    note?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    recipientId?: true;
    _all?: true;
};
export type PaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentCountAggregateInputType;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayment[P]> : Prisma.GetScalarType<T[P], AggregatePayment[P]>;
};
export type PaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithAggregationInput | Prisma.PaymentOrderByWithAggregationInput[];
    by: Prisma.PaymentScalarFieldEnum[] | Prisma.PaymentScalarFieldEnum;
    having?: Prisma.PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type PaymentGroupByOutputType = {
    id: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl: string | null;
    note: string | null;
    status: $Enums.PaymentStatus;
    paidAt: Date;
    createdAt: Date;
    recipientId: number | null;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>;
}>>;
export type PaymentWhereInput = {
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    id?: Prisma.IntFilter<"Payment"> | number;
    quotaId?: Prisma.IntFilter<"Payment"> | number;
    memberId?: Prisma.IntFilter<"Payment"> | number;
    amount?: Prisma.IntFilter<"Payment"> | number;
    receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null;
    note?: Prisma.StringNullableFilter<"Payment"> | string | null;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    recipientId?: Prisma.IntNullableFilter<"Payment"> | number | null;
    quota?: Prisma.XOR<Prisma.QuotaScalarRelationFilter, Prisma.QuotaWhereInput>;
    member?: Prisma.XOR<Prisma.MemberScalarRelationFilter, Prisma.MemberWhereInput>;
    recipient?: Prisma.XOR<Prisma.MemberNullableScalarRelationFilter, Prisma.MemberWhereInput> | null;
};
export type PaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receiptUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    quota?: Prisma.QuotaOrderByWithRelationInput;
    member?: Prisma.MemberOrderByWithRelationInput;
    recipient?: Prisma.MemberOrderByWithRelationInput;
};
export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    quotaId?: Prisma.IntFilter<"Payment"> | number;
    memberId?: Prisma.IntFilter<"Payment"> | number;
    amount?: Prisma.IntFilter<"Payment"> | number;
    receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null;
    note?: Prisma.StringNullableFilter<"Payment"> | string | null;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    recipientId?: Prisma.IntNullableFilter<"Payment"> | number | null;
    quota?: Prisma.XOR<Prisma.QuotaScalarRelationFilter, Prisma.QuotaWhereInput>;
    member?: Prisma.XOR<Prisma.MemberScalarRelationFilter, Prisma.MemberWhereInput>;
    recipient?: Prisma.XOR<Prisma.MemberNullableScalarRelationFilter, Prisma.MemberWhereInput> | null;
}, "id">;
export type PaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receiptUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PaymentCountOrderByAggregateInput;
    _avg?: Prisma.PaymentAvgOrderByAggregateInput;
    _max?: Prisma.PaymentMaxOrderByAggregateInput;
    _min?: Prisma.PaymentMinOrderByAggregateInput;
    _sum?: Prisma.PaymentSumOrderByAggregateInput;
};
export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Payment"> | number;
    quotaId?: Prisma.IntWithAggregatesFilter<"Payment"> | number;
    memberId?: Prisma.IntWithAggregatesFilter<"Payment"> | number;
    amount?: Prisma.IntWithAggregatesFilter<"Payment"> | number;
    receiptUrl?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null;
    status?: Prisma.EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string;
    recipientId?: Prisma.IntNullableWithAggregatesFilter<"Payment"> | number | null;
};
export type PaymentCreateInput = {
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    quota: Prisma.QuotaCreateNestedOneWithoutPaymentsInput;
    member: Prisma.MemberCreateNestedOneWithoutPaymentsInput;
    recipient?: Prisma.MemberCreateNestedOneWithoutReceivedPaymentsInput;
};
export type PaymentUncheckedCreateInput = {
    id?: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentUpdateInput = {
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quota?: Prisma.QuotaUpdateOneRequiredWithoutPaymentsNestedInput;
    member?: Prisma.MemberUpdateOneRequiredWithoutPaymentsNestedInput;
    recipient?: Prisma.MemberUpdateOneWithoutReceivedPaymentsNestedInput;
};
export type PaymentUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentCreateManyInput = {
    id?: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentUpdateManyMutationInput = {
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentListRelationFilter = {
    every?: Prisma.PaymentWhereInput;
    some?: Prisma.PaymentWhereInput;
    none?: Prisma.PaymentWhereInput;
};
export type PaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receiptUrl?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
};
export type PaymentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
};
export type PaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receiptUrl?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
};
export type PaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    receiptUrl?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
};
export type PaymentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quotaId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
};
export type PaymentCreateNestedManyWithoutMemberInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput> | Prisma.PaymentCreateWithoutMemberInput[] | Prisma.PaymentUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutMemberInput | Prisma.PaymentCreateOrConnectWithoutMemberInput[];
    createMany?: Prisma.PaymentCreateManyMemberInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput> | Prisma.PaymentCreateWithoutRecipientInput[] | Prisma.PaymentUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecipientInput | Prisma.PaymentCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.PaymentCreateManyRecipientInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutMemberInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput> | Prisma.PaymentCreateWithoutMemberInput[] | Prisma.PaymentUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutMemberInput | Prisma.PaymentCreateOrConnectWithoutMemberInput[];
    createMany?: Prisma.PaymentCreateManyMemberInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput> | Prisma.PaymentCreateWithoutRecipientInput[] | Prisma.PaymentUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecipientInput | Prisma.PaymentCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.PaymentCreateManyRecipientInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutMemberNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput> | Prisma.PaymentCreateWithoutMemberInput[] | Prisma.PaymentUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutMemberInput | Prisma.PaymentCreateOrConnectWithoutMemberInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutMemberInput | Prisma.PaymentUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: Prisma.PaymentCreateManyMemberInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutMemberInput | Prisma.PaymentUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutMemberInput | Prisma.PaymentUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput> | Prisma.PaymentCreateWithoutRecipientInput[] | Prisma.PaymentUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecipientInput | Prisma.PaymentCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutRecipientInput | Prisma.PaymentUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.PaymentCreateManyRecipientInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutRecipientInput | Prisma.PaymentUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutRecipientInput | Prisma.PaymentUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput> | Prisma.PaymentCreateWithoutMemberInput[] | Prisma.PaymentUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutMemberInput | Prisma.PaymentCreateOrConnectWithoutMemberInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutMemberInput | Prisma.PaymentUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: Prisma.PaymentCreateManyMemberInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutMemberInput | Prisma.PaymentUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutMemberInput | Prisma.PaymentUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput> | Prisma.PaymentCreateWithoutRecipientInput[] | Prisma.PaymentUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecipientInput | Prisma.PaymentCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutRecipientInput | Prisma.PaymentUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.PaymentCreateManyRecipientInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutRecipientInput | Prisma.PaymentUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutRecipientInput | Prisma.PaymentUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentCreateNestedManyWithoutQuotaInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput> | Prisma.PaymentCreateWithoutQuotaInput[] | Prisma.PaymentUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutQuotaInput | Prisma.PaymentCreateOrConnectWithoutQuotaInput[];
    createMany?: Prisma.PaymentCreateManyQuotaInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutQuotaInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput> | Prisma.PaymentCreateWithoutQuotaInput[] | Prisma.PaymentUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutQuotaInput | Prisma.PaymentCreateOrConnectWithoutQuotaInput[];
    createMany?: Prisma.PaymentCreateManyQuotaInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutQuotaNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput> | Prisma.PaymentCreateWithoutQuotaInput[] | Prisma.PaymentUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutQuotaInput | Prisma.PaymentCreateOrConnectWithoutQuotaInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutQuotaInput | Prisma.PaymentUpsertWithWhereUniqueWithoutQuotaInput[];
    createMany?: Prisma.PaymentCreateManyQuotaInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutQuotaInput | Prisma.PaymentUpdateWithWhereUniqueWithoutQuotaInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutQuotaInput | Prisma.PaymentUpdateManyWithWhereWithoutQuotaInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutQuotaNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput> | Prisma.PaymentCreateWithoutQuotaInput[] | Prisma.PaymentUncheckedCreateWithoutQuotaInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutQuotaInput | Prisma.PaymentCreateOrConnectWithoutQuotaInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutQuotaInput | Prisma.PaymentUpsertWithWhereUniqueWithoutQuotaInput[];
    createMany?: Prisma.PaymentCreateManyQuotaInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutQuotaInput | Prisma.PaymentUpdateWithWhereUniqueWithoutQuotaInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutQuotaInput | Prisma.PaymentUpdateManyWithWhereWithoutQuotaInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
};
export type PaymentCreateWithoutMemberInput = {
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    quota: Prisma.QuotaCreateNestedOneWithoutPaymentsInput;
    recipient?: Prisma.MemberCreateNestedOneWithoutReceivedPaymentsInput;
};
export type PaymentUncheckedCreateWithoutMemberInput = {
    id?: number;
    quotaId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentCreateOrConnectWithoutMemberInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput>;
};
export type PaymentCreateManyMemberInputEnvelope = {
    data: Prisma.PaymentCreateManyMemberInput | Prisma.PaymentCreateManyMemberInput[];
};
export type PaymentCreateWithoutRecipientInput = {
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    quota: Prisma.QuotaCreateNestedOneWithoutPaymentsInput;
    member: Prisma.MemberCreateNestedOneWithoutPaymentsInput;
};
export type PaymentUncheckedCreateWithoutRecipientInput = {
    id?: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutRecipientInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput>;
};
export type PaymentCreateManyRecipientInputEnvelope = {
    data: Prisma.PaymentCreateManyRecipientInput | Prisma.PaymentCreateManyRecipientInput[];
};
export type PaymentUpsertWithWhereUniqueWithoutMemberInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutMemberInput, Prisma.PaymentUncheckedUpdateWithoutMemberInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutMemberInput, Prisma.PaymentUncheckedCreateWithoutMemberInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutMemberInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutMemberInput, Prisma.PaymentUncheckedUpdateWithoutMemberInput>;
};
export type PaymentUpdateManyWithWhereWithoutMemberInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutMemberInput>;
};
export type PaymentScalarWhereInput = {
    AND?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    OR?: Prisma.PaymentScalarWhereInput[];
    NOT?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    id?: Prisma.IntFilter<"Payment"> | number;
    quotaId?: Prisma.IntFilter<"Payment"> | number;
    memberId?: Prisma.IntFilter<"Payment"> | number;
    amount?: Prisma.IntFilter<"Payment"> | number;
    receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null;
    note?: Prisma.StringNullableFilter<"Payment"> | string | null;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    recipientId?: Prisma.IntNullableFilter<"Payment"> | number | null;
};
export type PaymentUpsertWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutRecipientInput, Prisma.PaymentUncheckedUpdateWithoutRecipientInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutRecipientInput, Prisma.PaymentUncheckedCreateWithoutRecipientInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutRecipientInput, Prisma.PaymentUncheckedUpdateWithoutRecipientInput>;
};
export type PaymentUpdateManyWithWhereWithoutRecipientInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutRecipientInput>;
};
export type PaymentCreateWithoutQuotaInput = {
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    member: Prisma.MemberCreateNestedOneWithoutPaymentsInput;
    recipient?: Prisma.MemberCreateNestedOneWithoutReceivedPaymentsInput;
};
export type PaymentUncheckedCreateWithoutQuotaInput = {
    id?: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentCreateOrConnectWithoutQuotaInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput>;
};
export type PaymentCreateManyQuotaInputEnvelope = {
    data: Prisma.PaymentCreateManyQuotaInput | Prisma.PaymentCreateManyQuotaInput[];
};
export type PaymentUpsertWithWhereUniqueWithoutQuotaInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutQuotaInput, Prisma.PaymentUncheckedUpdateWithoutQuotaInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutQuotaInput, Prisma.PaymentUncheckedCreateWithoutQuotaInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutQuotaInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutQuotaInput, Prisma.PaymentUncheckedUpdateWithoutQuotaInput>;
};
export type PaymentUpdateManyWithWhereWithoutQuotaInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutQuotaInput>;
};
export type PaymentCreateManyMemberInput = {
    id?: number;
    quotaId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentCreateManyRecipientInput = {
    id?: number;
    quotaId: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type PaymentUpdateWithoutMemberInput = {
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quota?: Prisma.QuotaUpdateOneRequiredWithoutPaymentsNestedInput;
    recipient?: Prisma.MemberUpdateOneWithoutReceivedPaymentsNestedInput;
};
export type PaymentUncheckedUpdateWithoutMemberInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentUncheckedUpdateManyWithoutMemberInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentUpdateWithoutRecipientInput = {
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quota?: Prisma.QuotaUpdateOneRequiredWithoutPaymentsNestedInput;
    member?: Prisma.MemberUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type PaymentUncheckedUpdateWithoutRecipientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutRecipientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    quotaId?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentCreateManyQuotaInput = {
    id?: number;
    memberId: number;
    amount: number;
    receiptUrl?: string | null;
    note?: string | null;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string;
    createdAt?: Date | string;
    recipientId?: number | null;
};
export type PaymentUpdateWithoutQuotaInput = {
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    member?: Prisma.MemberUpdateOneRequiredWithoutPaymentsNestedInput;
    recipient?: Prisma.MemberUpdateOneWithoutReceivedPaymentsNestedInput;
};
export type PaymentUncheckedUpdateWithoutQuotaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentUncheckedUpdateManyWithoutQuotaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    memberId?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type PaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quotaId?: boolean;
    memberId?: boolean;
    amount?: boolean;
    receiptUrl?: boolean;
    note?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quotaId?: boolean;
    memberId?: boolean;
    amount?: boolean;
    receiptUrl?: boolean;
    note?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quotaId?: boolean;
    memberId?: boolean;
    amount?: boolean;
    receiptUrl?: boolean;
    note?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectScalar = {
    id?: boolean;
    quotaId?: boolean;
    memberId?: boolean;
    amount?: boolean;
    receiptUrl?: boolean;
    note?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
};
export type PaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quotaId" | "memberId" | "amount" | "receiptUrl" | "note" | "status" | "paidAt" | "createdAt" | "recipientId", ExtArgs["result"]["payment"]>;
export type PaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
};
export type PaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
};
export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quota?: boolean | Prisma.QuotaDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
    recipient?: boolean | Prisma.Payment$recipientArgs<ExtArgs>;
};
export type $PaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Payment";
    objects: {
        quota: Prisma.$QuotaPayload<ExtArgs>;
        member: Prisma.$MemberPayload<ExtArgs>;
        recipient: Prisma.$MemberPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        quotaId: number;
        memberId: number;
        amount: number;
        receiptUrl: string | null;
        note: string | null;
        status: $Enums.PaymentStatus;
        paidAt: Date;
        createdAt: Date;
        recipientId: number | null;
    }, ExtArgs["result"]["payment"]>;
    composites: {};
};
export type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentPayload, S>;
export type PaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentCountAggregateInputType | true;
};
export interface PaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Payment'];
        meta: {
            name: 'Payment';
        };
    };
    findUnique<T extends PaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentCreateArgs>(args: Prisma.SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentDeleteArgs>(args: Prisma.SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentUpdateArgs>(args: Prisma.SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentUpsertArgs>(args: Prisma.SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentCountArgs>(args?: Prisma.Subset<T, PaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentCountAggregateOutputType> : number>;
    aggregate<T extends PaymentAggregateArgs>(args: Prisma.Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;
    groupBy<T extends PaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentFieldRefs;
}
export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    quota<T extends Prisma.QuotaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuotaDefaultArgs<ExtArgs>>): Prisma.Prisma__QuotaClient<runtime.Types.Result.GetResult<Prisma.$QuotaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    member<T extends Prisma.MemberDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MemberDefaultArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    recipient<T extends Prisma.Payment$recipientArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Payment$recipientArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentFieldRefs {
    readonly id: Prisma.FieldRef<"Payment", 'Int'>;
    readonly quotaId: Prisma.FieldRef<"Payment", 'Int'>;
    readonly memberId: Prisma.FieldRef<"Payment", 'Int'>;
    readonly amount: Prisma.FieldRef<"Payment", 'Int'>;
    readonly receiptUrl: Prisma.FieldRef<"Payment", 'String'>;
    readonly note: Prisma.FieldRef<"Payment", 'String'>;
    readonly status: Prisma.FieldRef<"Payment", 'PaymentStatus'>;
    readonly paidAt: Prisma.FieldRef<"Payment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Payment", 'DateTime'>;
    readonly recipientId: Prisma.FieldRef<"Payment", 'Int'>;
}
export type PaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
};
export type PaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
};
export type PaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    include?: Prisma.PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type PaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
    include?: Prisma.PaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
};
export type PaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type Payment$recipientArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
};
export type PaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
};
