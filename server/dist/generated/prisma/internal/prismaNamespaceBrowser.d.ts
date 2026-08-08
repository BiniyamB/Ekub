import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Admin: "Admin";
    readonly Ekub: "Ekub";
    readonly Member: "Member";
    readonly Quota: "Quota";
    readonly Payment: "Payment";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AdminScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly password: "password";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum];
export declare const EkubScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly quotaAmount: "quotaAmount";
    readonly totalQuotas: "totalQuotas";
    readonly cycle: "cycle";
    readonly startDate: "startDate";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type EkubScalarFieldEnum = (typeof EkubScalarFieldEnum)[keyof typeof EkubScalarFieldEnum];
export declare const MemberScalarFieldEnum: {
    readonly id: "id";
    readonly ekubId: "ekubId";
    readonly name: "name";
    readonly address: "address";
    readonly phone: "phone";
    readonly preferredAmount: "preferredAmount";
    readonly quotaAmount: "quotaAmount";
    readonly shareGroup: "shareGroup";
    readonly quotaId: "quotaId";
    readonly createdAt: "createdAt";
};
export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum];
export declare const QuotaScalarFieldEnum: {
    readonly id: "id";
    readonly ekubId: "ekubId";
    readonly position: "position";
    readonly status: "status";
    readonly winnerAt: "winnerAt";
};
export type QuotaScalarFieldEnum = (typeof QuotaScalarFieldEnum)[keyof typeof QuotaScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly quotaId: "quotaId";
    readonly memberId: "memberId";
    readonly amount: "amount";
    readonly receiptUrl: "receiptUrl";
    readonly note: "note";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly recipientId: "recipientId";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
