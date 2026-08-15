"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Clock,
  Coins,
  Eye,
  LogOut,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  Upload,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { apiFetch, receiptImageUrl } from "@/lib/api";
import type {
  Ekub,
  MeMember,
  MeResponse,
  PlanReceipt,
  PaymentRound,
} from "@/lib/types";
import { cn, formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { EkubCard } from "@/components/ekub-card";
import { Reveal } from "@/components/reveal";
import { useDrawEvents } from "@/hooks/use-draw-events";
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
  const [editingReceipt, setEditingReceipt] = useState<PlanReceipt | null>(null);
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

      {/* What members must do */}
      <MemberHowTo />

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
                  Round {current.roundNumber}
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
              onEdit={(r) => setEditingReceipt(r)}
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
                    Round {round.roundNumber}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Quota #{round.position} ·{" "}
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

      {/* Live draw + ekub detail for this member's circle */}
      <MemberEkubView ekub={ekub} onRefresh={refresh} />

      {/* Browse all public ekubs */}
      <BrowseEkubs />

      {/* How it works */}
      <HowItWorks />

      {/* CTA */}
      <Reveal className="mt-16">
        <div className="hero-gradient relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-2xl shadow-fuchsia-500/30 sm:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-amber-300/40 blur-3xl" />
          </div>
          <h2 className="relative text-2xl font-extrabold sm:text-3xl">
            Ready to run a transparent savings circle?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-white/85">
            Open the admin panel to create your first ekub and invite members
            to start saving together.
          </p>
          <a
            href="/admin"
            className="relative mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-8 text-base font-bold text-fuchsia-700 shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Open admin panel <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>

      {/* Payer payment popup (submit or edit) */}
      {current && (
        <PayerPaymentModal
          open={payOpen || editingReceipt !== null}
          onClose={() => {
            setPayOpen(false);
            setEditingReceipt(null);
          }}
          round={current}
          member={me}
          token={token}
          editing={editingReceipt}
          onSubmitted={() => void refresh()}
          onDelete={async (receipt) => {
            await apiFetch(`/me/receipts/${receipt.id}`, {
              method: "DELETE",
              token,
            });
            await refresh();
          }}
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

/** Short plain-English guide so members know exactly what to do and when. */
function MemberHowTo() {
  const steps = [
    {
      title: "Your quota's turn",
      desc: "Each round, one quota wins by a live random draw (1st, 2nd, 3rd…). Watch it happen and wait your turn.",
    },
    {
      title: "When you're a payer",
      desc: "Pay the exact amount to the winner assigned to you, then upload a photo of your receipt.",
    },
    {
      title: "When you're a winner",
      desc: "Review each payer's receipt, then confirm it once you actually receive the money.",
    },
    {
      title: "Round closes, next draw",
      desc: "Once all receipts are confirmed, the round closes and the admin runs the next draw.",
    },
  ];

  return (
    <div className="glass mb-6 rounded-3xl border-l-4 border-l-primary p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-extrabold uppercase tracking-wide">
          What you need to do
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl bg-muted/40 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="hero-gradient flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-bold">{s.title}</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
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
                    src={receiptImageUrl(receipt.receiptUrl)}
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
  onEdit,
}: {
  round: PaymentRound;
  member: MeMember;
  onOpen: () => void;
  onEdit: (receipt: PlanReceipt) => void;
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
            <>
              <Badge tone="warning">
                <Clock className="h-3 w-3" /> Waiting for {me.paysToName} to
                confirm
              </Badge>
              <Button variant="outline" size="sm" onClick={() => onEdit(receipt)}>
                <Upload className="h-4 w-4" /> Edit
              </Button>
            </>
          ) : (
            <Button onClick={onOpen}>
              <Send className="h-4 w-4" /> Submit my receipt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Restores the live-draw + quota/member detail experience for this member's
 *  own ekub: members list, quota slots with the members inside each one, and
 *  a link to watch the draw live while the admin runs it. */
function MemberEkubView({
  ekub,
  onRefresh,
}: {
  ekub: Ekub;
  onRefresh: () => Promise<void>;
}) {
  useDrawEvents(
    ekub.id,
    () => {
      void onRefresh();
    },
    () => {
      void onRefresh();
    },
  );

  return (
    <Reveal className="mt-14">
      <div className="mb-4">
        <LandingBadge />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {ekub.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Live members, quotas and the draw — always public.
          </p>
        </div>
        <Link
          href={`/watch/${ekub.id}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
        >
          <Radio className="h-4 w-4" /> Watch live draw
        </Link>
      </div>

      {/* Members */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ekub.members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 transition-colors hover:border-primary/40"
          >
            <div className="hero-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              {m.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">{m.name}</div>
              <div className="truncate text-xs text-muted-foreground">
                {m.address}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-primary">
                {formatMoney(m.preferredAmount)}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {m.quotaId ? `quota #${m.quotaId}` : "unassigned"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quota timeline: which members are in each quota */}
      <div className="mt-8">
        <h3 className="mb-1 flex items-center gap-2 text-xl font-bold">
          <Coins className="h-5 w-5 text-primary" /> Quota slots
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Every member is combined into a quota slot. Members of a drawn quota
          share that round&apos;s pot.
        </p>

        <DrawOrder quotas={ekub.quotas} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ekub.quotas.map((quota) => {
            const isWinner = quota.status === "SELECTED";
            const total = quota.members.reduce(
              (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
              0,
            );
            return (
              <div
                key={quota.id}
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-lg",
                  isWinner
                    ? "border-amber-400/60 shadow-lg shadow-amber-500/10"
                    : "border-border",
                )}
              >
                {isWinner && (
                  <div className="hero-gradient absolute inset-x-0 top-0 h-1" />
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold",
                        isWinner
                          ? "hero-gradient text-white shadow-lg shadow-amber-500/30"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      #{quota.position}
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        Quota {quota.position}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isWinner
                          ? `Won on ${formatDate(quota.winnerAt)}`
                          : "Awaiting draw"}
                      </div>
                    </div>
                  </div>
                  {isWinner ? (
                    <Badge tone="warning" className="animate-pulse">
                      <Trophy className="h-3 w-3" />{" "}
                      {quota.roundNumber
                        ? `${ordinal(quota.roundNumber)} winner`
                        : "Winner"}
                    </Badge>
                  ) : (
                    <Badge>Pending</Badge>
                  )}
                </div>

                <div className="mt-4 space-y-1.5">
                  {quota.members.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-sm"
                    >
                      <span className="font-semibold">{m.name}</span>
                      <span className="text-muted-foreground">
                        {formatMoney(m.quotaAmount ?? m.preferredAmount)}
                      </span>
                    </div>
                  ))}
                  {quota.members.length === 0 && (
                    <p className="rounded-xl bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                      No members assigned yet.
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Slot total:{" "}
                    <span className="font-bold text-foreground">
                      {formatMoney(total)}
                    </span>{" "}
                    / {formatMoney(ekub.quotaAmount)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    {quota.members.length} member
                    {quota.members.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

/** Restores the public "Live ekub circles" grid from the landing page — every
 *  ekub is browsable and each card links to its public detail / draw. */
function BrowseEkubs() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ekubs"],
    queryFn: () => apiFetch<Ekub[]>("/ekubs"),
  });

  const ekubs = data ?? [];
  const totalSaved = ekubs.reduce((s, e) => s + e.totalCollected, 0);
  const totalMembers = ekubs.reduce((s, e) => s + e.totalMembers, 0);
  const winners = ekubs.reduce((s, e) => s + e.drawnQuotas, 0);

  return (
    <section id="ekubs" className="mt-16 scroll-mt-24">
      <Reveal>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Live ekub circles
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every quota, winner and receipt is visible to everyone.
            </p>
          </div>
          <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground sm:block">
            {ekubs.length} total
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { icon: Coins, label: "Active ekubs", value: String(ekubs.length) },
            {
              icon: Users,
              label: "Total members",
              value: String(totalMembers),
            },
            { icon: Trophy, label: "Winners drawn", value: String(winners) },
            {
              icon: ShieldCheck,
              label: "Collected",
              value: formatMoney(totalSaved),
            },
          ].map((s) => (
            <div
              key={s.label}
              className="glass flex flex-col items-center gap-1 rounded-2xl p-4"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <div className="text-xl font-extrabold sm:text-2xl">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="shimmer-line h-72 animate-shimmer rounded-2xl"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl p-14 text-center">
          <h3 className="text-lg font-bold">Could not load ekubs</h3>
          <Button variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      ) : ekubs.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl p-14 text-center">
          <div className="hero-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Coins className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">No ekubs yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            The admin can create the first ekub circle from the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ekubs.map((ekub, i) => (
            <EkubCard key={ekub.id} ekub={ekub} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

/** Restores the landing page "How an ekub works" explainer. */
function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mt-16 scroll-mt-24 border-y border-border/60 bg-muted/30 py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              How an ekub works here
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              From creating a circle to collecting the pot — four simple steps.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              title: "Create the circle",
              desc: "Set the quota value (e.g. 50,000 Br), pick weekly, monthly or yearly, and choose how many quotas to run.",
            },
            {
              n: "02",
              title: "Register members",
              desc: "Add each member with their address and preferred amount. The system automatically combines people to fill each quota.",
            },
            {
              n: "03",
              title: "Draw the winner",
              desc: "A random selector picks one quota per round — fairly, with no favorites. Watch it live.",
            },
            {
              n: "04",
              title: "Track receipts",
              desc: "Each member of the winning quota uploads their receipt so every payment is public and verifiable.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <div className="hero-gradient absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl transition-opacity group-hover:opacity-30" />
                <div className="text-4xl font-extrabold text-primary/25 transition-colors group-hover:text-primary/50">
                  {step.n}
                </div>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Restores the landing hero sparkline badge style at the top of the browse
 *  sections. */
function LandingBadge() {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">
      <Sparkles className="h-4 w-4 text-amber-500" />
      Traditional ekub, reimagined for the digital age
    </span>
  );
}

/** The sequence in which quotas win the draw — round 1, round 2, ... sorted by
 *  winner timestamp, with the quota that won each one. */
function DrawOrder({ quotas }: { quotas: Ekub["quotas"] }) {
  const drawn = quotas
    .filter((q) => q.status === "SELECTED" && q.roundNumber != null)
    .sort((a, b) => (a.roundNumber ?? 0) - (b.roundNumber ?? 0));

  if (drawn.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <Radio className="h-4 w-4 text-emerald-500" /> Draw order — which quota
        won each round
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {drawn.map((q, i) => (
          <div key={q.id} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted-foreground">→</span>}
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold",
                i === drawn.length - 1
                  ? "hero-gradient text-white shadow-lg shadow-fuchsia-500/30"
                  : "bg-muted",
              )}
            >
              <span className="rounded-full bg-white/20 px-1.5 text-xs font-extrabold">
                {ordinal(q.roundNumber ?? i + 1)}
              </span>
              <span>
                Quota #{q.position}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
