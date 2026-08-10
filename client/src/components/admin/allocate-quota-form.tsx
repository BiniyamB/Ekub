"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Ekub, Quota } from "@/lib/types";
import { cn, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AllocateQuotaForm({
  ekub,
  quota,
  token,
  onUpdated,
}: {
  ekub: Ekub;
  quota: Quota;
  token: string;
  onUpdated: (ekub: Ekub, warnings: string[]) => void;
}) {
  const inQuota = new Set(quota.members.map((m) => m.id));

  const [amounts, setAmounts] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};
    for (const m of quota.members) {
      init[m.id] = String(m.quotaAmount ?? m.preferredAmount);
    }
    return init;
  });
  const [loading, setLoading] = useState(false);

  const members = [...ekub.members].sort((a, b) => {
    const ia = inQuota.has(a.id) ? 0 : 1;
    const ib = inQuota.has(b.id) ? 0 : 1;
    return ia - ib;
  });

  const checked = members.filter((m) => amounts[m.id] !== undefined);
  const total = checked.reduce(
    (s, m) => s + (parseInt(amounts[m.id], 10) || 0),
    0,
  );
  const remainder = ekub.quotaAmount - total;

  function toggle(id: number) {
    setAmounts((prev) => {
      const next = { ...prev };
      if (next[id] !== undefined) {
        delete next[id];
      } else {
        const member = members.find((m) => m.id === id);
        next[id] = String(member?.preferredAmount ?? 0);
      }
      return next;
    });
  }

  function setAmount(id: number, value: string) {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  }

  function autoFill() {
    setAmounts((prev) => {
      const ids = Object.keys(prev).map(Number);
      if (ids.length === 0) return prev;
      const next = { ...prev };
      if (remainder > 0) {
        next[ids[0]] = String((parseInt(prev[ids[0]], 10) || 0) + remainder);
        return next;
      }
      let toTrim = -remainder;
      const byAmount = [...ids].sort(
        (a, b) => (parseInt(prev[b], 10) || 0) - (parseInt(prev[a], 10) || 0),
      );
      for (const id of byAmount) {
        if (toTrim <= 0) break;
        const current = parseInt(prev[id], 10) || 0;
        const cut = Math.min(current - 1, toTrim);
        if (cut <= 0) continue;
        next[id] = String(current - cut);
        toTrim -= cut;
      }
      return next;
    });
  }

  async function handleSave() {
    const entries = Object.entries(amounts)
      .map(([id, amount]) => ({
        memberId: Number(id),
        amount: parseInt(amount, 10),
      }))
      .filter((e) => Number.isFinite(e.amount) && e.amount > 0);
    if (entries.length === 0) {
      toast.error("Select at least one member with a valid share amount");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ ekub: Ekub; warnings: string[] }>(
        `/ekubs/${ekub.id}/quotas/${quota.id}/members`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({ members: entries }),
        },
      );
      onUpdated(res.ekub, res.warnings);
      if (res.warnings.length > 0) {
        res.warnings.forEach((w) => toast.warning(w));
      } else {
        toast.success(`Quota #${quota.position} updated`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "rounded-xl px-4 py-3 text-xs font-semibold",
          checked.length > 0 && total === ekub.quotaAmount
            ? "bg-emerald-500/10 text-emerald-600"
            : "bg-amber-500/10 text-amber-600",
        )}
      >
        Selected total: {formatMoney(total)} / {formatMoney(ekub.quotaAmount)}
        {checked.length > 0 && total !== ekub.quotaAmount && (
          <span className="mt-0.5 block font-medium">
            {remainder > 0
              ? `Short by ${formatMoney(remainder)}.`
              : `Over by ${formatMoney(-remainder)}.`}
          </span>
        )}
      </div>

      <div className="max-h-80 space-y-1.5 overflow-y-auto pr-1">
        {members.map((m) => {
          const checkedMember = amounts[m.id] !== undefined;
          const here = inQuota.has(m.id);
          const elsewhere = m.quotaId && m.quotaId !== quota.id;
          return (
            <div
              key={m.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors",
                checkedMember
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card",
              )}
            >
              <input
                type="checkbox"
                checked={checkedMember}
                onChange={() => toggle(m.id)}
                className="h-4 w-4 accent-fuchsia-600"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold">{m.name}</span>
                  {here ? (
                    <Badge tone="primary">this quota</Badge>
                  ) : elsewhere ? (
                    <Badge>in quota #{m.quotaId}</Badge>
                  ) : (
                    <Badge tone="warning">unassigned</Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Preferred {formatMoney(m.preferredAmount)}
                </div>
              </div>
              <input
                type="number"
                min={1}
                disabled={!checkedMember}
                value={checkedMember ? amounts[m.id] : ""}
                onChange={(e) => setAmount(m.id, e.target.value)}
                className={cn(
                  "h-8 w-28 shrink-0 rounded-lg border border-border bg-card px-2 text-right text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30",
                  !checkedMember && "opacity-40",
                )}
                placeholder="—"
                title="Share amount in this quota"
              />
            </div>
          );
        })}
      </div>

      {checked.length > 0 && total !== ekub.quotaAmount && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={autoFill}
        >
          {remainder > 0
            ? `Add ${formatMoney(remainder)} to fill the quota`
            : `Trim ${formatMoney(-remainder)} to match the quota`}
        </Button>
      )}

      <Button
        onClick={handleSave}
        className="w-full"
        loading={loading}
        disabled={checked.length === 0}
      >
        Save allocation
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Tick members and edit each share to control the exact quota total.
      </p>
    </div>
  );
}
