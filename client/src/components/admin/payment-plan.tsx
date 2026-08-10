"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  CircleX,
  FileText,
  Percent,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { apiFetch, UPLOADS_URL } from "@/lib/api";
import type { Ekub, PayStatus, PaymentPlan } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ProgressBar } from "@/components/ui/progress";
import { ReceiptForm } from "@/components/admin/receipt-form";

const statusTone: Record<PayStatus, "success" | "warning" | "danger"> = {
  PAID: "success",
  PARTIAL: "warning",
  UNPAID: "danger",
};

export function PaymentPlanPanel({ ekub, token }: { ekub: Ekub; token: string }) {
  const qc = useQueryClient();
  const [receiptFor, setReceiptFor] = useState<number | null>(null);

  const { data: plan, isLoading } = useQuery({
    queryKey: ["payment-plan", ekub.id],
    queryFn: () => apiFetch<PaymentPlan>(`/ekubs/${ekub.id}/payment-plan`, { token }),
  });

  async function refresh() {
    await qc.invalidateQueries({ queryKey: ["payment-plan", ekub.id] });
    await qc.invalidateQueries({ queryKey: ["ekub", ekub.id] });
  }

  if (isLoading) {
    return <div className="shimmer-line h-48 animate-shimmer rounded-3xl" />;
  }

  if (!plan || plan.rounds.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-border p-10 text-center">
        <CircleDashed className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No winners yet. Run a draw to see who pays who and how much each
          winner receives.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Overall summary */}
      <div className="glass rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Percent className="h-5 w-5 text-primary" /> Collection status
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {formatMoney(plan.totalPaid)} paid of{" "}
              {formatMoney(plan.totalOwed)} owed across drawn rounds
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold gradient-text">
              {plan.overallPercent}%
            </div>
            <div className="text-xs text-muted-foreground">overall paid</div>
          </div>
        </div>
        <ProgressBar value={plan.overallPercent} className="mt-4" />
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-emerald-500/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> {plan.paidPersons}
            </div>
            <div className="text-[10px] text-muted-foreground">paid in full</div>
          </div>
          <div className="rounded-xl bg-amber-500/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-amber-600 dark:text-amber-400">
              {plan.partialPersons}
            </div>
            <div className="text-[10px] text-muted-foreground">partially paid</div>
          </div>
          <div className="rounded-xl bg-red-500/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-red-600 dark:text-red-400">
              <CircleX className="h-4 w-4" /> {plan.unpaidPersons}
            </div>
            <div className="text-[10px] text-muted-foreground">not paid yet</div>
          </div>
        </div>
      </div>

      {/* Per round: who pays who */}
      {plan.rounds.map((round) => {
        return (
          <div
            key={round.quotaId}
            className="overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="hero-gradient flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white">
                  #{round.position}
                </div>
                <div>
                  <div className="text-sm font-bold">
                    Round {round.roundNumber} · Quota #{round.position}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pot {formatMoney(round.pot)} · won{" "}
                    {formatDate(round.winnerAt)}
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={() => setReceiptFor(round.quotaId)}>
                <Upload className="h-3.5 w-3.5" /> Attach receipt
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
              {/* Winners */}
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> Winner(s) — what they get
                </h4>
                <div className="space-y-2">
                  {round.winners.map((w) => (
                    <div
                      key={w.memberId}
                      className="rounded-2xl border border-amber-400/40 bg-amber-500/5 p-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{w.name}</span>
                        <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                          {formatMoney(w.pot)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Received {formatMoney(w.received)} of{" "}
                          {formatMoney(w.pot)}
                        </span>
                        <span className="font-bold">
                          {w.receivedPercent}%
                        </span>
                      </div>
                      <ProgressBar
                        value={w.receivedPercent}
                        className="mt-1.5 h-1.5"
                      />
                      {w.assigned.length > 0 && (
                        <div className="mt-2.5 space-y-1 border-t border-amber-400/20 pt-2">
                          {w.assigned.map((a) => (
                            <div
                              key={a.memberId}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-muted-foreground">
                                {a.name}
                              </span>
                              <span className="font-semibold">
                                {formatMoney(a.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payers */}
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <ArrowRight className="h-3.5 w-3.5" /> Who pays them
                </h4>
                {round.payers.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No other members owe this round.
                  </p>
                )}
                <div className="space-y-2">
                  {round.payers.map((p) => (
                    <div
                      key={p.memberId}
                      className="rounded-2xl bg-muted/40 p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            pays {p.paysToName} · {formatMoney(p.owed)} · paid{" "}
                            {formatMoney(p.paid)}
                          </div>
                        </div>
                        <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <ProgressBar value={p.percent} className="h-1.5" />
                        <span className="w-10 text-right text-xs font-bold">
                          {p.percent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Receipts */}
            {round.receipts.length > 0 && (
              <div className="border-t border-border/70 px-5 py-4">
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> Attached receipts
                </h4>
                <div className="flex flex-wrap gap-3">
                  {round.receipts.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-2 rounded-xl bg-muted/40 px-2.5 py-2"
                    >
                      {r.receiptUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${UPLOADS_URL}${r.receiptUrl}`}
                          alt="receipt"
                          className="h-8 w-8 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-[8px] text-muted-foreground">
                          no file
                        </span>
                      )}
                      <div className="text-xs">
                        <div className="font-bold">
                          {r.payerName} → {r.payeeName || "—"}
                        </div>
                        <div className="text-muted-foreground">
                          {formatMoney(r.amount)} · {formatDate(r.paidAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Receipt modal */}
      <Modal
        open={receiptFor !== null}
        onClose={() => setReceiptFor(null)}
        title="Attach a receipt"
      >
        {receiptFor && (
          <ReceiptForm
            quotaId={receiptFor}
            winners={winnersFor(receiptFor, plan)}
            defaultPayeeId={defaultPayeeFor(receiptFor, plan)}
            token={token}
            onUploaded={refresh}
          />
        )}
      </Modal>
    </div>
  );
}

function defaultPayeeFor(quotaId: number, plan: PaymentPlan) {
  const round = plan.rounds.find((r) => r.quotaId === quotaId);
  return round?.winners[0]?.realId;
}

function winnersFor(quotaId: number, plan: PaymentPlan) {
  return (
    plan.rounds.find((r) => r.quotaId === quotaId)?.winners ?? []
  );
}
