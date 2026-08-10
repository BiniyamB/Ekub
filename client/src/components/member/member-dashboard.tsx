"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Coins,
  LogOut,
  Send,
  Trophy,
  Upload,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { apiFetch, UPLOADS_URL } from "@/lib/api";
import type {
  MeMember,
  MeResponse,
  PlanReceipt,
  PaymentRound,
} from "@/lib/types";
import { cn, formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { PayerPaymentModal } from "@/components/member/payer-payment-modal";
import { ReceiptDetailModal } from "@/components/member/receipt-detail-modal";

export function MemberDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const qc = useQueryClient();
  const [payOpen, setPayOpen] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<PlanReceipt | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch<MeResponse>("/me", { token }),
  });

  const me = data?.member;
  const ekub = data?.ekub;
  const plan = data?.plan;

  const current = useMemo<PaymentRound | null>(() => {
    if (!plan || plan.rounds.length === 0) return null;
    return [...plan.rounds].sort(
      (a, b) =>
        new Date(b.winnerAt ?? 0).getTime() -
        new Date(a.winnerAt ?? 0).getTime(),
    )[0];
  }, [plan]);

  const pastRounds = useMemo(() => {
    if (!plan || !current) return plan?.rounds ?? [];
    return plan.rounds.filter((r) => r.quotaId !== current.quotaId);
  }, [plan, current]);

  async function refresh() {
    await qc.invalidateQueries({ queryKey: ["me"] });
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="shimmer-line h-64 animate-shimmer rounded-3xl" />
      </div>
    );
  }

  if (isError || !me || !ekub || !plan) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <div className="hero-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl">
          <Coins className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Could not load your ekub</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Something went wrong. Try again, or sign out and back in.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => void refetch()}>Retry</Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    );
  }

  const amIWinner = current?.winners.some((w) => w.realId === me.id) ?? false;
  const myWinner = current?.winners.find((w) => w.realId === me.id);
  const myPayer = current?.payers.find((p) => p.memberId === me.id);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="hero-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{me.name}</h1>
            <p className="text-sm text-muted-foreground">
              {ekub.name} · {ekub.cycleLabel} ·{" "}
              {ekub.quotas.length} quotas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            tone={
              ekub.status === "COMPLETED"
                ? "success"
                : ekub.status === "CANCELLED"
                  ? "danger"
                  : "primary"
            }
          >
            {ekub.status}
          </Badge>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      {/* My contribution */}
      <div className="glass mb-6 grid grid-cols-1 gap-4 rounded-3xl p-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">
              My registered contribution
            </div>
            <div className="text-lg font-extrabold">
              {formatMoney(me.preferredAmount)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Coins className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">
              Share in my quota slot
            </div>
            <div className="text-lg font-extrabold">
              {formatMoney(me.quotaAmount ?? me.preferredAmount)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <CircleDashed className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Address</div>
            <div className="truncate text-lg font-extrabold">{me.address}</div>
          </div>
        </div>
      </div>

      {/* Current round */}
      {!current ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl p-12 text-center">
          <div className="hero-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Clock className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold">No round drawn yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            The admin will run the first draw soon. Your receipts and
            confirmation duties will appear here.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "relative mb-6 overflow-hidden rounded-3xl border bg-card p-6",
            current.closed
              ? "border-border"
              : amIWinner
                ? "border-amber-400/60 shadow-lg shadow-amber-500/10"
                : "border-sky-400/60 shadow-lg shadow-sky-500/10",
          )}
        >
          {!current.closed && (
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1",
                amIWinner ? "hero-gradient" : "bg-sky-500",
              )}
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="hero-gradient flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white">
                #{current.position}
              </div>
              <div>
                <div className="text-base font-bold">
                  Round {current.position}
                  {current.closed ? " — closed" : " — in progress"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Won {formatDate(current.winnerAt)} · Pot{" "}
                  {formatMoney(current.pot)}
                </div>
              </div>
            </div>
            {current.closed && (
              <Badge tone="success">
                <CheckCircle2 className="h-3 w-3" /> Round closed
              </Badge>
            )}
          </div>

          {amIWinner && myWinner ? (
            <WinnerPanel
              round={current}
              myWinner={myWinner}
              onViewReceipt={setViewingReceipt}
            />
          ) : myPayer ? (
            <PayerPanel
              round={current}
              member={me}
              onOpen={() => setPayOpen(true)}
            />
          ) : (
            <p className="mt-4 rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              You are not part of this round.
            </p>
          )}
        </div>
      )}

      {/* Past rounds */}
      {pastRounds.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-bold">
            <Trophy className="h-4 w-4 text-primary" /> Earlier rounds
          </h3>
          <div className="space-y-2">
            {pastRounds.map((round) => (
              <div
                key={round.quotaId}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div>
                  <div className="text-sm font-bold">
                    Round {round.position}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {round.winners.map((w) => w.name).join(", ")} ·{" "}
                    {formatDate(round.winnerAt)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold">
                    {formatMoney(round.pot)}
                  </span>
                  {round.closed ? (
                    <Badge tone="success">closed</Badge>
                  ) : (
                    <Badge tone="warning">collecting</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payer payment popup */}
      {current && (
        <PayerPaymentModal
          open={payOpen}
          onClose={() => setPayOpen(false)}
          round={current}
          member={me}
          token={token}
          onSubmitted={() => void refresh()}
        />
      )}

      {/* Receipt detail / confirm */}
      <ReceiptDetailModal
        open={viewingReceipt !== null}
        onClose={() => setViewingReceipt(null)}
        receipt={viewingReceipt}
        token={token}
        onConfirm={() => {
          setViewingReceipt(null);
          void refresh();
        }}
      />
    </div>
  );
}

/** Winner view: who paid, who didn't, how much is left, and each receipt is
 *  clickable so the winner reviews it before confirming. */
function WinnerPanel({
  round,
  myWinner,
  onViewReceipt,
}: {
  round: PaymentRound;
  myWinner: NonNullable<PaymentRound["winners"][number]>;
  onViewReceipt: (r: PlanReceipt) => void;
}) {
  const rows = myWinner.assigned.map((a) => {
    const receipt = round.receipts.find(
      (r) => r.payerId === a.memberId && r.payeeId === myWinner.realId,
    );
    return { payer: a, receipt: receipt ?? null };
  });
  const confirmedCount = rows.filter(
    (r) => r.receipt?.status === "PAID",
  ).length;
  const left = Math.max(0, myWinner.pot - myWinner.received);

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-amber-500/10 p-3">
          <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
            {formatMoney(myWinner.pot)}
          </div>
          <div className="text-[10px] text-muted-foreground">your pot</div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 p-3">
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
            {formatMoney(myWinner.received)}
          </div>
          <div className="text-[10px] text-muted-foreground">received</div>
        </div>
        <div className="rounded-xl bg-red-500/10 p-3">
          <div className="text-lg font-extrabold text-red-600 dark:text-red-400">
            {formatMoney(left)}
          </div>
          <div className="text-[10px] text-muted-foreground">still left</div>
        </div>
      </div>
      <ProgressBar value={myWinner.receivedPercent} />

      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wide">
            Who pays you — {confirmedCount}/{rows.length} confirmed
          </span>
          {round.closed && (
            <span className="font-bold text-emerald-500">
              Round complete, next draw unlocked
            </span>
          )}
        </div>
        <div className="space-y-2">
          {rows.length === 0 && (
            <p className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              No members are assigned to pay you this round.
            </p>
          )}
          {rows.map(({ payer, receipt }) => (
            <div
              key={payer.memberId}
              className="flex items-center gap-3 rounded-2xl bg-muted/40 p-2.5"
            >
              {receipt?.receiptUrl ? (
                <button
                  onClick={() => onViewReceipt(receipt)}
                  title="Click to review the full receipt"
                  className="shrink-0 overflow-hidden rounded-lg transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${UPLOADS_URL}${receipt.receiptUrl}`}
                    alt="receipt"
                    className="h-11 w-11 object-cover"
                  />
                </button>
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-[9px] text-muted-foreground">
                  no file
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">
                  {payer.name}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  owes {formatMoney(payer.amount)}
                </div>
              </div>
              {!receipt ? (
                <Badge tone="danger">not paid</Badge>
              ) : receipt.status === "SUBMITTED" ? (
                <button onClick={() => onViewReceipt(receipt)}>
                  <Badge tone="warning" className="cursor-pointer">
                    <Upload className="h-3 w-3" /> review
                  </Badge>
                </button>
              ) : (
                <Badge tone="success">
                  <CheckCircle2 className="h-3 w-3" /> confirmed
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Payer view: who I pay, how much, and my receipt status. */
function PayerPanel({
  round,
  member,
  onOpen,
}: {
  round: PaymentRound;
  member: MeMember;
  onOpen: () => void;
}) {
  const me = round.payers.find((p) => p.memberId === member.id)!;
  const receipt = round.receipts.find((r) => r.payerId === member.id);
  const submitted = receipt && receipt.status !== "PAID";

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted/40 p-4">
        <div>
          <div className="text-sm font-bold">
            You pay <span className="gradient-text">{me.paysToName}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatMoney(me.owed)} owed ·{" "}
            {receipt?.status === "PAID"
              ? "fully confirmed"
              : formatMoney(me.paid) + " confirmed"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {receipt?.status === "PAID" ? (
            <Badge tone="success">
              <CheckCircle2 className="h-3 w-3" /> Confirmed by winner
            </Badge>
          ) : submitted ? (
            <Badge tone="warning">
              <Clock className="h-3 w-3" /> Waiting for {me.paysToName} to
              confirm
            </Badge>
          ) : (
            <Button onClick={onOpen}>
              <Send className="h-4 w-4" /> Submit my receipt
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Every member is assigned a winner by the system. Pick your assigned
        winner, attach a photo of your payment, and the winner confirms it
        after reviewing the receipt.
      </p>
    </div>
  );
}
