export declare const Cycle: {
    readonly WEEKLY: "WEEKLY";
    readonly MONTHLY: "MONTHLY";
    readonly ANNUALLY: "ANNUALLY";
};
export type Cycle = (typeof Cycle)[keyof typeof Cycle];
export declare const EkubStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type EkubStatus = (typeof EkubStatus)[keyof typeof EkubStatus];
export declare const DrawStatus: {
    readonly PENDING: "PENDING";
    readonly SELECTED: "SELECTED";
};
export type DrawStatus = (typeof DrawStatus)[keyof typeof DrawStatus];
export declare const PaymentStatus: {
    readonly PAID: "PAID";
    readonly PENDING: "PENDING";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
