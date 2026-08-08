import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AdminModel = runtime.Types.Result.DefaultSelection<Prisma.$AdminPayload>;
export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null;
    _avg: AdminAvgAggregateOutputType | null;
    _sum: AdminSumAggregateOutputType | null;
    _min: AdminMinAggregateOutputType | null;
    _max: AdminMaxAggregateOutputType | null;
};
export type AdminAvgAggregateOutputType = {
    id: number | null;
};
export type AdminSumAggregateOutputType = {
    id: number | null;
};
export type AdminMinAggregateOutputType = {
    id: number | null;
    username: string | null;
    password: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type AdminMaxAggregateOutputType = {
    id: number | null;
    username: string | null;
    password: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type AdminCountAggregateOutputType = {
    id: number;
    username: number;
    password: number;
    name: number;
    createdAt: number;
    _all: number;
};
export type AdminAvgAggregateInputType = {
    id?: true;
};
export type AdminSumAggregateInputType = {
    id?: true;
};
export type AdminMinAggregateInputType = {
    id?: true;
    username?: true;
    password?: true;
    name?: true;
    createdAt?: true;
};
export type AdminMaxAggregateInputType = {
    id?: true;
    username?: true;
    password?: true;
    name?: true;
    createdAt?: true;
};
export type AdminCountAggregateInputType = {
    id?: true;
    username?: true;
    password?: true;
    name?: true;
    createdAt?: true;
    _all?: true;
};
export type AdminAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput | Prisma.AdminOrderByWithRelationInput[];
    cursor?: Prisma.AdminWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AdminCountAggregateInputType;
    _avg?: AdminAvgAggregateInputType;
    _sum?: AdminSumAggregateInputType;
    _min?: AdminMinAggregateInputType;
    _max?: AdminMaxAggregateInputType;
};
export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
    [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdmin[P]> : Prisma.GetScalarType<T[P], AggregateAdmin[P]>;
};
export type AdminGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithAggregationInput | Prisma.AdminOrderByWithAggregationInput[];
    by: Prisma.AdminScalarFieldEnum[] | Prisma.AdminScalarFieldEnum;
    having?: Prisma.AdminScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdminCountAggregateInputType | true;
    _avg?: AdminAvgAggregateInputType;
    _sum?: AdminSumAggregateInputType;
    _min?: AdminMinAggregateInputType;
    _max?: AdminMaxAggregateInputType;
};
export type AdminGroupByOutputType = {
    id: number;
    username: string;
    password: string;
    name: string;
    createdAt: Date;
    _count: AdminCountAggregateOutputType | null;
    _avg: AdminAvgAggregateOutputType | null;
    _sum: AdminSumAggregateOutputType | null;
    _min: AdminMinAggregateOutputType | null;
    _max: AdminMaxAggregateOutputType | null;
};
export type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdminGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdminGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdminGroupByOutputType[P]>;
}>>;
export type AdminWhereInput = {
    AND?: Prisma.AdminWhereInput | Prisma.AdminWhereInput[];
    OR?: Prisma.AdminWhereInput[];
    NOT?: Prisma.AdminWhereInput | Prisma.AdminWhereInput[];
    id?: Prisma.IntFilter<"Admin"> | number;
    username?: Prisma.StringFilter<"Admin"> | string;
    password?: Prisma.StringFilter<"Admin"> | string;
    name?: Prisma.StringFilter<"Admin"> | string;
    createdAt?: Prisma.DateTimeFilter<"Admin"> | Date | string;
};
export type AdminOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    username?: string;
    AND?: Prisma.AdminWhereInput | Prisma.AdminWhereInput[];
    OR?: Prisma.AdminWhereInput[];
    NOT?: Prisma.AdminWhereInput | Prisma.AdminWhereInput[];
    password?: Prisma.StringFilter<"Admin"> | string;
    name?: Prisma.StringFilter<"Admin"> | string;
    createdAt?: Prisma.DateTimeFilter<"Admin"> | Date | string;
}, "id" | "username">;
export type AdminOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AdminCountOrderByAggregateInput;
    _avg?: Prisma.AdminAvgOrderByAggregateInput;
    _max?: Prisma.AdminMaxOrderByAggregateInput;
    _min?: Prisma.AdminMinOrderByAggregateInput;
    _sum?: Prisma.AdminSumOrderByAggregateInput;
};
export type AdminScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdminScalarWhereWithAggregatesInput | Prisma.AdminScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdminScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdminScalarWhereWithAggregatesInput | Prisma.AdminScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Admin"> | number;
    username?: Prisma.StringWithAggregatesFilter<"Admin"> | string;
    password?: Prisma.StringWithAggregatesFilter<"Admin"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Admin"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Admin"> | Date | string;
};
export type AdminCreateInput = {
    username: string;
    password: string;
    name: string;
    createdAt?: Date | string;
};
export type AdminUncheckedCreateInput = {
    id?: number;
    username: string;
    password: string;
    name: string;
    createdAt?: Date | string;
};
export type AdminUpdateInput = {
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminCreateManyInput = {
    id?: number;
    username: string;
    password: string;
    name: string;
    createdAt?: Date | string;
};
export type AdminUpdateManyMutationInput = {
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type AdminMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AdminSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["admin"]>;
export type AdminSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["admin"]>;
export type AdminSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["admin"]>;
export type AdminSelectScalar = {
    id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    createdAt?: boolean;
};
export type AdminOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username" | "password" | "name" | "createdAt", ExtArgs["result"]["admin"]>;
export type $AdminPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Admin";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        username: string;
        password: string;
        name: string;
        createdAt: Date;
    }, ExtArgs["result"]["admin"]>;
    composites: {};
};
export type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdminPayload, S>;
export type AdminCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdminCountAggregateInputType | true;
};
export interface AdminDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Admin'];
        meta: {
            name: 'Admin';
        };
    };
    findUnique<T extends AdminFindUniqueArgs>(args: Prisma.SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AdminFindFirstArgs>(args?: Prisma.SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AdminFindManyArgs>(args?: Prisma.SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AdminCreateArgs>(args: Prisma.SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AdminCreateManyArgs>(args?: Prisma.SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AdminDeleteArgs>(args: Prisma.SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AdminUpdateArgs>(args: Prisma.SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AdminDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AdminUpdateManyArgs>(args: Prisma.SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AdminUpsertArgs>(args: Prisma.SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AdminCountArgs>(args?: Prisma.Subset<T, AdminCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdminCountAggregateOutputType> : number>;
    aggregate<T extends AdminAggregateArgs>(args: Prisma.Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>;
    groupBy<T extends AdminGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdminGroupByArgs['orderBy'];
    } : {
        orderBy?: AdminGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AdminFieldRefs;
}
export interface Prisma__AdminClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AdminFieldRefs {
    readonly id: Prisma.FieldRef<"Admin", 'Int'>;
    readonly username: Prisma.FieldRef<"Admin", 'String'>;
    readonly password: Prisma.FieldRef<"Admin", 'String'>;
    readonly name: Prisma.FieldRef<"Admin", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Admin", 'DateTime'>;
}
export type AdminFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where: Prisma.AdminWhereUniqueInput;
};
export type AdminFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where: Prisma.AdminWhereUniqueInput;
};
export type AdminFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput | Prisma.AdminOrderByWithRelationInput[];
    cursor?: Prisma.AdminWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminScalarFieldEnum | Prisma.AdminScalarFieldEnum[];
};
export type AdminFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput | Prisma.AdminOrderByWithRelationInput[];
    cursor?: Prisma.AdminWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminScalarFieldEnum | Prisma.AdminScalarFieldEnum[];
};
export type AdminFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput | Prisma.AdminOrderByWithRelationInput[];
    cursor?: Prisma.AdminWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminScalarFieldEnum | Prisma.AdminScalarFieldEnum[];
};
export type AdminCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminCreateInput, Prisma.AdminUncheckedCreateInput>;
};
export type AdminCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AdminCreateManyInput | Prisma.AdminCreateManyInput[];
};
export type AdminCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    data: Prisma.AdminCreateManyInput | Prisma.AdminCreateManyInput[];
};
export type AdminUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminUpdateInput, Prisma.AdminUncheckedUpdateInput>;
    where: Prisma.AdminWhereUniqueInput;
};
export type AdminUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AdminUpdateManyMutationInput, Prisma.AdminUncheckedUpdateManyInput>;
    where?: Prisma.AdminWhereInput;
    limit?: number;
};
export type AdminUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminUpdateManyMutationInput, Prisma.AdminUncheckedUpdateManyInput>;
    where?: Prisma.AdminWhereInput;
    limit?: number;
};
export type AdminUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where: Prisma.AdminWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminCreateInput, Prisma.AdminUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AdminUpdateInput, Prisma.AdminUncheckedUpdateInput>;
};
export type AdminDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
    where: Prisma.AdminWhereUniqueInput;
};
export type AdminDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminWhereInput;
    limit?: number;
};
export type AdminDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSelect<ExtArgs> | null;
    omit?: Prisma.AdminOmit<ExtArgs> | null;
};
