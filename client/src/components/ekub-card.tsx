"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Coins,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Ekub } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";

const cycleIcons = {
  WEEKLY: "7d cycle",
  MONTHLY: "Monthly",
  ANNUALLY: "Yearly",
};

export function EkubCard({ ekub, index }: { ekub: Ekub; index: number }) {
  const statusTone =
    ekub.status === "COMPLETED"
      ? "success"
      : ekub.status === "CANCELLED"
        ? "danger"
        : "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/ekub/${ekub.id}`}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-card-foreground">
              {ekub.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              {cycleIcons[ekub.cycle]} · {ekub.totalQuotas} quotas
            </p>
          </div>
          <Badge tone={statusTone}>{ekub.status}</Badge>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Quota value</div>
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="gradient-text">
                {formatMoney(ekub.quotaAmount)}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {ekub.drawnQuotas}/{ekub.totalQuotas} drawn
          </span>
        </div>

        <ProgressBar value={ekub.progress} />

        {ekub.drawnQuotas > 0 && (
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Pot collected</span>
            <span className="font-bold">
              {ekub.collectionPercent}% of {formatMoney(ekub.totalExpected)}
            </span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 border-t border-border/70 pt-3 text-center">
          <div className="rounded-xl bg-muted/60 p-2">
            <Users className="mx-auto mb-1 h-4 w-4 text-primary" />
            <div className="text-sm font-bold">{ekub.totalMembers}</div>
            <div className="text-[10px] text-muted-foreground">members</div>
          </div>
          <div className="rounded-xl bg-muted/60 p-2">
            <Coins className="mx-auto mb-1 h-4 w-4 text-amber-500" />
            <div className="text-sm font-bold">
              {formatMoney(ekub.totalCollected)}
            </div>
            <div className="text-[10px] text-muted-foreground">collected</div>
          </div>
          <div className="rounded-xl bg-muted/60 p-2">
            <Trophy className="mx-auto mb-1 h-4 w-4 text-fuchsia-500" />
            <div className="text-sm font-bold">{ekub.drawnQuotas}</div>
            <div className="text-[10px] text-muted-foreground">winners</div>
          </div>
        </div>

        <span className="flex items-center gap-1 text-sm font-semibold text-primary">
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
