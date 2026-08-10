export type Cycle = "WEEKLY" | "MONTHLY" | "ANNUALLY";
export type EkubStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
export type DrawStatus = "PENDING" | "SELECTED";

export interface Admin {
  id: number;
  username: string;
  name: string;
}

export interface Payment {
  id: number;
  quotaId: number;
  memberId: number;
  recipientId: number | null;
  amount: number;
  receiptUrl: string | null;
  note: string | null;
  status: "PAID" | "PENDING";
  paidAt: string;
  createdAt: string;
  member?: Member;
  recipient?: Member | null;
}

export interface Member {
  id: number;
  ekubId: number;
  name: string;
  address: string;
  phone: string | null;
  preferredAmount: number;
  quotaAmount: number | null;
  shareGroup: number | null;
  quotaId: number | null;
  createdAt: string;
}

export interface Quota {
  id: number;
  ekubId: number;
  position: number;
  status: DrawStatus;
  winnerAt: string | null;
  members: Member[];
  payments: Payment[];
}

export interface Ekub {
  id: number;
  name: string;
  description: string | null;
  quotaAmount: number;
  totalQuotas: number;
  cycle: Cycle;
  cycleLabel: string;
  startDate: string;
  status: EkubStatus;
  createdAt: string;
  members: Member[];
  quotas: Quota[];
  totalMembers: number;
  membersAssigned: number;
  drawnQuotas: number;
  totalCollected: number;
  totalExpected: number;
  collectionPercent: number;
  totalUnallocated: number;
  progress: number;
}

export type PayStatus = "PAID" | "PARTIAL" | "UNPAID";

export interface PlanAssignedPayer {
  memberId: number;
  name: string;
  amount: number;
}

export interface PlanWinner {
  memberId: number;
  realId: number;
  name: string;
  fill: number;
  pot: number;
  received: number;
  receivedPercent: number;
  assigned: PlanAssignedPayer[];
}

export interface PlanPayer {
  memberId: number;
  name: string;
  paysTo: number;
  paysToName: string;
  owed: number;
  paid: number;
  percent: number;
  status: PayStatus;
}

export interface PlanReceipt {
  id: number;
  payerId: number;
  payerName: string;
  payeeId: number | null;
  payeeName: string;
  amount: number;
  receiptUrl: string | null;
  paidAt: string;
}

export interface PaymentRound {
  quotaId: number;
  position: number;
  winnerAt: string | null;
  pot: number;
  winners: PlanWinner[];
  payers: PlanPayer[];
  receipts: PlanReceipt[];
}

export interface PaymentPlan {
  ekubId: number;
  quotaAmount: number;
  totalQuotas: number;
  rounds: PaymentRound[];
  totalOwed: number;
  totalPaid: number;
  overallPercent: number;
  paidPersons: number;
  partialPersons: number;
  unpaidPersons: number;
  persons: PlanPayer[];
}

export interface AuthResponse {
  access_token: string;
  admin: Admin;
}
