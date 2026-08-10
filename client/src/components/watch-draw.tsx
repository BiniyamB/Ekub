"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Coins,
  PartyPopper,
  Radio,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";
import { cn, formatMoney } from "@/lib/format";
import type { Ekub } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import {
  useDrawEvents,
  type DrawEventPayload,
  type DrawQuota,
} from "@/hooks/use-draw-events";

const cycleLabels = {
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  ANNUALLY: "Yearly",
} as const;

function toBrief(quota: {
  id: number;
  position: number;
  members: Array<{ name: string }>;
}): DrawQuota {
  return {
    id: quota.id,
    position: quota.position,
    members: quota.members.map((m) => ({ name: m.name })),
  };
}

export function WatchDraw({ ekub: initial }: { ekub: Ekub }) {
  const [ekub, setEkub] = useState(initial);
  const [phase, setPhase] = useState<"idle" | "spinning" | "revealed">("idle");
  const [shown, setShown] = useState<DrawQuota | null>(null);
  const [winner, setWinner] = useState<DrawQuota | null>(null);
  const [live, setLive] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const spinning = useRef(false);

  const refresh = useCallback(async () => {
    try {
      const fresh = await apiFetch<Ekub>(`/ekubs/${initial.id}`);
      setEkub(fresh);
    } catch {
      /* ignore */
    }
  }, [initial.id]);

  useEffect(() => {
    const timersRef = timers.current;
    return () => {
      timersRef.forEach(clearTimeout);
    };
  }, []);

  const startSpin = useCallback(
    (pending: DrawQuota[], won: DrawQuota) => {
      if (spinning.current) return;
      spinning.current = true;
      setWinner(null);
      setShown(pending[0] ?? won);
      setPhase("spinning");
      let frame = 0;
      const totalFrames = 18;
      const tick = () => {
        frame += 1;
        if (frame >= totalFrames) {
          setShown(won);
          setWinner(won);
          setPhase("revealed");
          spinning.current = false;
          void refresh();
          return;
        }
        setShown(pending[Math.floor(Math.random() * pending.length)]);
        timers.current.push(setTimeout(tick, 105));
      };
      timers.current.push(setTimeout(tick, 105));
    },
    [refresh],
  );

  const handleEvent = useCallback(
    (event: DrawEventPayload) => {
      if (event.type === "draw" && event.winner) {
        startSpin(event.pending, event.winner);
      } else {
        spinning.current = false;
        setPhase("idle");
        setShown(null);
        setWinner(null);
        void refresh();
      }
    },
    [startSpin, refresh],
  );

  useDrawEvents(
    initial.id,
    handleEvent,
    useCallback(() => {
      setLive(true);
      void refresh();
    }, [refresh]),
    useCallback(() => setLive(false), []),
  );

  const pendingCount = ekub.quotas.filter((q) => q.status === "PENDING").length;
  const lastWinner = ekub.quotas
    .filter((q) => q.status === "SELECTED")
    .sort(
      (a, b) =>
        new Date(b.winnerAt ?? 0).getTime() - new Date(a.winnerAt ?? 0).getTime(),
    )[0];
  const showTrophy = phase === "revealed" && winner;
  const staticWinner =
    phase === "idle" && lastWinner ? toBrief(lastWinner) : null;
  const display = showTrophy
    ? winner
    : staticWinner ?? (phase === "spinning" ? shown : null);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    live ? "animate-pulse bg-emerald-500" : "bg-muted-foreground",
                  )}
                />
                {live ? "LIVE" : "Connecting…"}
              </span>
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
              <Badge tone="info">{cycleLabels[ekub.cycle]}</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {ekub.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              {ekub.drawnQuotas} of {ekub.totalQuotas} drawn
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Pot value</div>
              <div className="text-3xl font-extrabold">
                <span className="gradient-text">{formatMoney(ekub.quotaAmount)}</span>
              </div>
            </div>
            <ProgressBar value={ekub.progress} className="w-44" />
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="relative mt-10 flex flex-col items-center">
        <div className="relative flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
          <div className="absolute inset-0 rounded-[2.5rem] bg-amber-500/15 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={display?.id ?? "empty"}
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 8 }}
              transition={{ type: "spring", damping: 15, stiffness: 240 }}
              className="glass flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2.5rem] shadow-xl"
            >
              {showTrophy || staticWinner ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 220, delay: 0.1 }}
                    className="hero-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg shadow-amber-500/40"
                  >
                    <Trophy className="h-8 w-8" />
                  </motion.div>
                  <div className="text-3xl font-extrabold">
                    Quota #{display?.position}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {display?.members.map((m) => m.name).join(", ")}
                  </div>
                </>
              ) : display ? (
                <>
                  <div className="text-5xl font-extrabold gradient-text">
                    #{display.position}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {display.members.map((m) => m.name).join(", ") ?? "shuffling…"}
                  </div>
                </>
              ) : (
                <>
                  <div className="hero-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
                    <Radio className="h-7 w-7" />
                  </div>
                  <div className="text-lg font-bold">Waiting for the draw</div>
                  <div className="text-xs text-muted-foreground">
                    {pendingCount} quota slot{pendingCount === 1 ? "" : "s"} in the
                    pool
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {showTrophy && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl bg-amber-500/10 px-6 py-4 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400">
              <PartyPopper className="h-4 w-4" />
              Congratulate the winner!
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Pot value {formatMoney(ekub.quotaAmount)} — receipts will be
              attached publicly.
            </div>
          </motion.div>
        )}
      </div>

      {/* Quota grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ekub.quotas.map((quota) => {
          const isWinner = quota.status === "SELECTED";
          const isShown = phase === "spinning" && shown?.id === quota.id;
          const total = quota.members.reduce(
            (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
            0,
          );
          return (
            <div
              key={quota.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-card p-4 transition-all",
                isWinner
                  ? "border-amber-400/60 shadow-lg shadow-amber-500/10"
                  : isShown
                    ? "border-primary/60 shadow-lg shadow-primary/10"
                    : "border-border",
              )}
            >
              {isWinner && (
                <div className="hero-gradient absolute inset-x-0 top-0 h-1" />
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl text-sm font-extrabold",
                      isWinner
                        ? "hero-gradient text-white"
                        : isShown
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    #{quota.position}
                  </div>
                  <span className="text-sm font-bold">Quota {quota.position}</span>
                </div>
                {isWinner ? (
                  <Badge tone="warning" className="animate-pulse">
                    <Trophy className="h-3 w-3" /> Winner
                  </Badge>
                ) : (
                  <Badge>Pending</Badge>
                )}
              </div>
              <div className="mt-3 space-y-1">
                {quota.members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5 text-sm"
                  >
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-muted-foreground">
                      {formatMoney(m.quotaAmount ?? m.preferredAmount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5" /> {formatMoney(total)} /{" "}
                  {formatMoney(ekub.quotaAmount)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {quota.members.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={`/ekub/${ekub.id}`}
          className="glass inline-flex h-10 items-center rounded-xl px-5 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        >
          Back to ekub details
        </Link>
      </div>
    </div>
  );
}
