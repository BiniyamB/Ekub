"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleX,
  Coins,
  Eye,
  FileText,
  MapPin,
  Percent,
  Phone,
  Radio,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { Ekub, PayStatus, Payment, PaymentPlan } from "@/lib/types";
import { UPLOADS_URL, apiFetch } from "@/lib/api";
import { cn, formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { Reveal } from "@/components/reveal";
import { useDrawEvents } from "@/hooks/use-draw-events";

const statusTone: Record<PayStatus, "success" | "warning" | "danger"> = {
  PAID: "success",
  PARTIAL: "warning",
  UNPAID: "danger",
};

export function EkubDetail({
  ekub: initial,
  initialPlan,
}: {
  ekub: Ekub;
  initialPlan?: PaymentPlan | null;
}) {
  const [ekub, setEkub] = useState(initial);
  const [viewing, setViewing] = useState<Payment | null>(null);
  const [plan, setPlan] = useState<PaymentPlan | null>(initialPlan ?? null);

  const refresh = useCallback(async () => {
    try {
      const [fresh, freshPlan] = await Promise.all([
        apiFetch<Ekub>(`/ekubs/${initial.id}`),
        apiFetch<PaymentPlan>(`/ekubs/${initial.id}/payment-plan`).catch(
          () => null,
        ),
      ]);
      setEkub(fresh);
      setPlan(freshPlan);
    } catch {
      /* ignore */
    }
  }, [initial.id]);

  useDrawEvents(
    initial.id,
    useCallback(() => {
      void refresh();
    }, [refresh]),
    refresh,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={ekub.status === "COMPLETED" ? "success" : ekub.status === "CANCELLED" ? "danger" : "primary"}>
                  {ekub.status}
                </Badge>
                <Badge tone="info">{ekub.cycleLabel}</Badge>
                <Badge>Started {formatDate(ekub.startDate)}</Badge>
                <Link
                  href={`/watch/${ekub.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                >
                  <Radio className="h-3 w-3" /> Watch live draw
                </Link>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
                {ekub.name}
              </h1>
              {ekub.description && (
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                  {ekub.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 sm:flex-col sm:items-end">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Quota value</div>
                <div className="text-3xl font-extrabold">
                  <span className="gradient-text">
                    {formatMoney(ekub.quotaAmount)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {ekub.drawnQuotas} of {ekub.totalQuotas} drawn
                </div>
                <ProgressBar value={ekub.progress} className="mt-1 w-40" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Users, label: "Members", value: String(ekub.totalMembers) },
              { icon: Coins, label: "Expected pot", value: formatMoney(ekub.totalExpected) },
              { icon: CheckCircle2, label: "Collected", value: formatMoney(ekub.totalCollected) },
              { icon: Trophy, label: "Winners", value: String(ekub.drawnQuotas) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-muted/50 p-3">
                <s.icon className="mb-1 h-4 w-4 text-primary" />
                <div className="text-sm font-bold sm:text-base">{s.value}</div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Members */}
      <Reveal delay={0.1}>
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold">All members</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {m.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-primary">
                    {formatMoney(m.preferredAmount)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {m.phone ? (
                      <span className="inline-flex items-center gap-0.5">
                        <Phone className="h-3 w-3" /> {m.phone}
                      </span>
                    ) : (
                      "no phone"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Quota timeline */}
      <Reveal delay={0.15}>
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Quota rounds</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ekub.quotas.map((quota, i) => {
              const isWinner = quota.status === "SELECTED";
              const total = quota.members.reduce(
                (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
                0,
              );
              return (
                <motion.div
                  key={quota.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
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
                          {isWinner && quota.roundNumber
                            ? ` — won round #${quota.roundNumber}`
                            : ""}
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
                        <Trophy className="h-3 w-3" /> Winner
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
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Quota total:{" "}
                      <span className="font-bold text-foreground">
                        {formatMoney(total)}
                      </span>{" "}
                      / {formatMoney(ekub.quotaAmount)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      {quota.payments.length} receipt
                      {quota.payments.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {/* Receipts */}
                  {quota.payments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-border/70 pt-3">
                      {quota.payments.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setViewing(p)}
                          className="group/receipt relative overflow-hidden rounded-lg border border-border transition-all hover:scale-105"
                        >
                          {p.receiptUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`${UPLOADS_URL}${p.receiptUrl}`}
                              alt={`Receipt for ${p.member?.name ?? "member"}`}
                              className="h-16 w-16 object-cover"
                            />
                          ) : (
                            <span className="flex h-16 w-16 items-center justify-center bg-muted text-[10px] text-muted-foreground">
                              no file
                            </span>
                          )}
                          <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover/receipt:opacity-100">
                            <Eye className="h-5 w-5 text-white" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* Who pays who */}
      <Reveal delay={0.2}>
        <section className="mt-10">
          <h2 className="mb-1 flex items-center gap-2 text-xl font-bold">
            <Percent className="h-5 w-5 text-primary" /> Who pays who
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            The exact amount each drawn winner receives, how much every other
            member owes them, and who has already paid — verified by receipts
            attached from the admin panel.
          </p>

          {!plan || plan.rounds.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No winners drawn yet — once a draw runs, the payment plan appears
              here.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Summary */}
              <div className="glass rounded-3xl p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Paid {formatMoney(plan.totalPaid)} of{" "}
                      {formatMoney(plan.totalOwed)} owed
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                      <Badge tone="success">
                        <CheckCircle2 className="h-3 w-3" />{" "}
                        {plan.paidPersons} paid in full
                      </Badge>
                      <Badge tone="warning">
                        {plan.partialPersons} partially paid
                      </Badge>
                      <Badge tone="danger">
                        <CircleX className="h-3 w-3" /> {plan.unpaidPersons} not
                        paid yet
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold gradient-text">
                      {plan.overallPercent}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      overall paid
                    </div>
                  </div>
                </div>
                <ProgressBar value={plan.overallPercent} className="mt-4" />
              </div>

              {/* Rounds */}
              {plan.rounds.map((round) => (
                <div
                  key={round.quotaId}
                  className="overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="flex items-center gap-2.5 border-b border-border/70 px-5 py-4">
                    <div className="hero-gradient flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white">
                      #{round.position}
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        Round {round.position}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pot {formatMoney(round.pot)} · won{" "}
                        {formatDate(round.winnerAt)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Winner(s) — what they get
                      </h4>
                      <div className="space-y-2">
                        {round.winners.map((w) => (
                          <div
                            key={w.memberId}
                            className="rounded-2xl border border-amber-400/40 bg-amber-500/5 p-3.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold">
                                {w.name}
                              </span>
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

                    <div>
                      <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <ArrowRight className="h-3 w-3" /> Who pays them
                      </h4>
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
                              <Badge tone={statusTone[p.status]}>
                                {p.status}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <ProgressBar value={p.percent} className="h-1.5" />
                              <span className="w-10 text-right text-xs font-bold">
                                {p.percent}%
                              </span>
                            </div>
                          </div>
                        ))}
                        {round.payers.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No other members owe this round.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </Reveal>

      {/* Receipt lightbox */}
      <AnimatePresence>
        {viewing && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewing(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
            >
              {viewing.receiptUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${UPLOADS_URL}${viewing.receiptUrl}`}
                  alt="Receipt"
                  className="max-h-[60vh] w-full bg-muted object-contain"
                />
              )}
              <div className="space-y-1 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold">
                    {viewing.member?.name ?? "Member"}
                  </div>
                  <Badge tone="success">
                    {formatMoney(viewing.amount)} paid
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(viewing.paidAt)}
                </div>
                {viewing.note && (
                  <p className="pt-2 text-sm text-muted-foreground">
                    {viewing.note}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
