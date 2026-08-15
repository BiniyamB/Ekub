"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  LayoutGrid,
  Percent,
  Pencil,
  RefreshCw,
  Trash2,
  Trophy,
  Undo2,
  Upload,
  Users,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch, receiptImageUrl } from "@/lib/api";
import type { Ekub, EkubStatus, Member, Payment, PaymentPlan } from "@/lib/types";
import { cn, formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { DrawModal } from "@/components/admin/draw-modal";
import { AllocateQuotaForm } from "@/components/admin/allocate-quota-form";
import { EditEkubForm } from "@/components/admin/edit-ekub-form";
import { EditMemberForm } from "@/components/admin/edit-member-form";
import { EditPaymentForm } from "@/components/admin/edit-payment-form";
import { MemberForm } from "@/components/admin/member-form";
import { PaymentPlanPanel } from "@/components/admin/payment-plan";
import { ReceiptForm } from "@/components/admin/receipt-form";

type Tab = "quotas" | "members" | "payments";

export function EkubManager({
  ekubId,
  token,
  onBack,
}: {
  ekubId: number;
  token: string;
  onBack: () => void;
}) {
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("quotas");
  const [drawOpen, setDrawOpen] = useState(false);
  const [receiptFor, setReceiptFor] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [rebalancing, setRebalancing] = useState(false);
  const [editSettingsOpen, setEditSettingsOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [allocateFor, setAllocateFor] = useState<number | null>(null);

  const { data: ekub, isLoading } = useQuery({
    queryKey: ["ekub", ekubId],
    queryFn: () => apiFetch<Ekub>(`/ekubs/${ekubId}`, { token }),
  });

  const { data: plan } = useQuery({
    queryKey: ["payment-plan", ekubId],
    queryFn: () =>
      apiFetch<PaymentPlan>(`/ekubs/${ekubId}/payment-plan`, { token }),
  });

  async function refresh() {
    await qc.invalidateQueries({ queryKey: ["ekub", ekubId] });
    await qc.invalidateQueries({ queryKey: ["ekubs"] });
  }

  async function generateQuotas() {
    setGenerating(true);
    try {
      const res = await apiFetch<{ ekub: Ekub; warnings: string[] }>(
        `/ekubs/${ekubId}/generate`,
        { method: "POST", token },
      );
      await refresh();
      if (res.warnings.length > 0) {
        res.warnings.forEach((w) => toast.warning(w));
      } else {
        toast.success("Members assigned into quota slots");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setGenerating(false);
    }
  }

  async function setStatus(status: EkubStatus) {
    try {
      await apiFetch<Ekub>(`/ekubs/${ekubId}/status`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ status }),
      });
      await refresh();
      toast.success(`Status set to ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function rebalanceQuotas() {
    setRebalancing(true);
    try {
      const res = await apiFetch<{ ekub: Ekub; warnings: string[] }>(
        `/ekubs/${ekubId}/rebalance`,
        { method: "POST", token },
      );
      await refresh();
      if (res.warnings.length > 0) {
        res.warnings.forEach((w) => toast.warning(w));
      } else {
        toast.success("Quotas rebalanced");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Rebalance failed");
    } finally {
      setRebalancing(false);
    }
  }

  async function deleteMember(memberId: number) {
    try {
      await apiFetch<Ekub>(`/ekubs/${ekubId}/members/${memberId}`, {
        method: "DELETE",
        token,
      });
      await refresh();
      toast.success("Member removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function deletePayment(paymentId: number) {
    try {
      await apiFetch(`/payments/${paymentId}`, { method: "DELETE", token });
      await refresh();
      toast.success("Receipt removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function reverseDraw(quotaId: number) {
    if (!confirm("Reverse this draw? The quota returns to pending.")) return;
    try {
      await apiFetch<Ekub>(`/ekubs/${ekubId}/quotas/${quotaId}/reverse`, {
        method: "POST",
        token,
      });
      await refresh();
      toast.success("Draw reversed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reverse failed");
    }
  }

  if (isLoading || !ekub) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="shimmer-line h-64 animate-shimmer rounded-3xl" />
      </div>
    );
  }

  const unassigned = ekub.members.filter(
    (m) => !m.quotaId || (m.quotaAmount ?? 0) < m.preferredAmount,
  );
  const pendingQuotas = ekub.quotas.filter((q) => q.status === "PENDING");
  const winners = ekub.quotas.filter((q) => q.status === "SELECTED");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All ekubs
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditSettingsOpen(true)}
          >
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStatus("COMPLETED")}
            disabled={ekub.status === "COMPLETED"}
          >
            Complete
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setStatus("CANCELLED")}
            disabled={ekub.status === "CANCELLED"}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setDrawOpen(true)}
            disabled={ekub.status !== "ACTIVE" || pendingQuotas.length === 0}
          >
            <Trophy className="h-4 w-4" /> Draw winner
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="glass mb-6 rounded-3xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={ekub.status === "COMPLETED" ? "success" : ekub.status === "CANCELLED" ? "danger" : "primary"}>
                {ekub.status}
              </Badge>
              <Badge tone="info">{ekub.cycleLabel}</Badge>
              <Badge>{formatDate(ekub.startDate)}</Badge>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold">{ekub.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Quota {formatMoney(ekub.quotaAmount)} × {ekub.totalQuotas} slots
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Progress</div>
              <div className="mt-1 flex items-center gap-2">
                <ProgressBar value={ekub.progress} className="w-36" />
                <span className="text-sm font-bold">{ekub.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          <Button
            size="sm"
            onClick={generateQuotas}
            loading={generating}
            disabled={ekub.members.length === 0}
            title="Assigns all unassigned members into empty or partially-filled quotas"
          >
            <Wand2 className="h-4 w-4" /> Auto-assign
            {unassigned.length > 0 && ` ${unassigned.length} member(s)`}
          </Button>
          {winners.length === 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={rebalanceQuotas}
              loading={rebalancing}
              title="Clears all assignments and redistributes so every quota is as equal as possible"
            >
              <RefreshCw className="h-4 w-4" /> Rebalance quotas
            </Button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {unassigned.length} unassigned ·{" "}
            {ekub.totalUnallocated > 0 &&
              `${formatMoney(ekub.totalUnallocated)} unallocated · `}
            {winners.length} winners · {pendingQuotas.length} pending
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 rounded-2xl bg-muted/60 p-1">
        {(
          [
            { id: "quotas", label: "Quotas", icon: LayoutGrid },
            { id: "members", label: "Members", icon: Users },
            { id: "payments", label: "Payments", icon: Percent },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
              tab === t.id
                ? "hero-gradient text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            <span
              className={cn(
                "rounded-full px-1.5 text-[10px]",
                tab === t.id ? "bg-white/25" : "bg-muted",
              )}
            >
              {t.id === "quotas" ? ekub.quotas.length : ekub.members.length}
            </span>
          </button>
        ))}
      </div>

      {/* QUOTAS TAB */}
      {tab === "quotas" && (
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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card p-5",
                  isWinner
                    ? "border-amber-400/60 shadow-lg shadow-amber-500/10"
                    : "border-border",
                )}
              >
                {isWinner && <div className="hero-gradient absolute inset-x-0 top-0 h-1" />}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold",
                        isWinner ? "hero-gradient text-white" : "bg-muted text-muted-foreground",
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
                          ? `Winner ${formatDate(quota.winnerAt)}`
                          : "Pending draw"}
                      </div>
                    </div>
                  </div>
                  {isWinner && (
                    <Badge tone="warning">
                      <Trophy className="h-3 w-3" /> Won
                    </Badge>
                  )}
                </div>

                <div className="mt-3 space-y-1.5">
                  {quota.members.length === 0 && (
                    <p className="rounded-xl bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                      Empty slot — use Rebalance or Allocate to fill it.
                    </p>
                  )}
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

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Total{" "}
                    <span className={cn("font-bold", total === ekub.quotaAmount ? "text-emerald-500" : total > ekub.quotaAmount ? "text-red-500" : "text-amber-500")}>
                      {formatMoney(total)}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {!isWinner && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setAllocateFor(quota.id)}
                        title="Manually pick which members are in this quota"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Allocate
                      </Button>
                    )}
                    {isWinner && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => reverseDraw(quota.id)}
                        title="Undo this draw and return the quota to pending"
                      >
                        <Undo2 className="h-3.5 w-3.5" /> Reverse
                      </Button>
                    )}
                    {isWinner && quota.members.length > 0 && (
                      <Button size="sm" variant="outline" onClick={() => setReceiptFor(quota.id)}>
                        <Upload className="h-3.5 w-3.5" /> Add receipt
                      </Button>
                    )}
                  </div>
                </div>

                {quota.payments.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-border/70 pt-3">
                    {quota.payments.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 rounded-xl bg-muted/40 p-2"
                      >
                        {p.receiptUrl ? (
                          <a
                            href={receiptImageUrl(p.receiptUrl)}
                            target="_blank"
                            rel="noreferrer"
                            title="Open full receipt image"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={receiptImageUrl(p.receiptUrl)}
                              alt="receipt"
                              className="h-10 w-10 rounded-lg object-cover transition-transform hover:scale-105"
                            />
                          </a>
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-[9px] text-muted-foreground">
                            no file
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-bold">
                            {p.member?.name ?? "Member"} →{" "}
                            {p.recipient?.name ?? "?"} ·{" "}
                            {formatMoney(p.amount)}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {formatDate(p.paidAt)}
                          </div>
                        </div>
                        <button
                          onClick={() => setEditPayment(p)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                          title="Edit payment"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePayment(p.id)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* MEMBERS TAB */}
      {tab === "members" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <Users className="h-4 w-4 text-primary" /> Register members
              </h3>
              <MemberForm
                ekubId={ekub.id}
                quotaAmount={ekub.quotaAmount}
                token={token}
                onUpdated={refresh}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold">
                <Users className="h-4 w-4 text-primary" /> Member list
              </h3>
              <span className="text-xs text-muted-foreground">
                {ekub.membersAssigned}/{ekub.totalMembers} assigned
              </span>
            </div>
            <div className="space-y-2">
              {ekub.members.length === 0 && (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No members yet — register them here, then auto-combine into
                  quotas.
                </p>
              )}
              <AnimatePresence>
                {ekub.members.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <div className="hero-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold">{m.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {m.address} · {formatMoney(m.preferredAmount)}
                      </div>
                    </div>
                    <Badge tone={m.quotaId ? "success" : "warning"}>
                      {m.quotaId ? "assigned" : "unassigned"}
                    </Badge>
                    <button
                      onClick={() => setEditMember(m)}
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      title="Edit member"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENTS TAB */}
      {tab === "payments" && (
        <PaymentPlanPanel
          ekub={ekub}
          token={token}
        />
      )}

      {/* Draw modal */}
      <DrawModal
        key={drawOpen ? "open" : "closed"}
        ekub={ekub}
        token={token}
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        onDrawn={(updated) => {
          qc.setQueryData(["ekub", ekubId], updated);
          void refresh();
        }}
      />

      {/* Receipt modal */}
      <Modal
        open={receiptFor !== null}
        onClose={() => setReceiptFor(null)}
        title="Attach a receipt"
      >
        {receiptFor &&
          (() => {
            const roundWinners =
              plan?.rounds.find((r) => r.quotaId === receiptFor)?.winners ??
              [];
            return (
              <ReceiptForm
                quotaId={receiptFor}
                winners={roundWinners}
                defaultPayeeId={roundWinners[0]?.realId}
                token={token}
                onUploaded={refresh}
              />
            );
          })()}
      </Modal>

      {/* Allocate quota modal */}
      <Modal
        open={allocateFor !== null}
        onClose={() => setAllocateFor(null)}
        title={
          allocateFor
            ? `Allocate members — quota #${ekub.quotas.find((q) => q.id === allocateFor)?.position ?? ""}`
            : "Allocate members"
        }
      >
        {allocateFor && (
          <AllocateQuotaForm
            key={allocateFor}
            ekub={ekub}
            quota={ekub.quotas.find((q) => q.id === allocateFor)!}
            token={token}
            onUpdated={(updated) => {
              setAllocateFor(null);
              qc.setQueryData(["ekub", ekubId], updated);
              void refresh();
            }}
          />
        )}
      </Modal>

      {/* Edit settings modal */}
      <Modal
        open={editSettingsOpen}
        onClose={() => setEditSettingsOpen(false)}
        title="Edit ekub settings"
      >
        <EditEkubForm
          ekub={ekub}
          token={token}
          onUpdated={(updated) => {
            setEditSettingsOpen(false);
            qc.setQueryData(["ekub", ekubId], updated);
            void refresh();
          }}
        />
      </Modal>

      {/* Edit member modal */}
      <Modal
        open={editMember !== null}
        onClose={() => setEditMember(null)}
        title="Edit member"
      >
        {editMember && (
          <EditMemberForm
            key={editMember.id}
            ekub={ekub}
            member={editMember}
            token={token}
            onUpdated={(updated) => {
              setEditMember(null);
              qc.setQueryData(["ekub", ekubId], updated);
              void refresh();
            }}
          />
        )}
      </Modal>

      {/* Edit payment modal */}
      <Modal
        open={editPayment !== null}
        onClose={() => setEditPayment(null)}
        title="Edit payment"
      >
        {editPayment && (
          <EditPaymentForm
            key={editPayment.id}
            payment={editPayment}
            winners={
              plan?.rounds.find((r) => r.quotaId === editPayment.quotaId)
                ?.winners ?? []
            }
            token={token}
            onUpdated={() => {
              setEditPayment(null);
              void refresh();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
