"use client";

import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch, receiptImageUrl } from "@/lib/api";
import type { PlanReceipt } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ReceiptDetailModal({
  open,
  onClose,
  receipt,
  token,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  receipt: PlanReceipt | null;
  token: string;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function confirm() {
    if (!receipt) return;
    setLoading(true);
    try {
      await apiFetch(`/me/receipts/${receipt.id}/confirm`, {
        method: "POST",
        token,
      });
      toast.success(`Payment from ${receipt.payerName} confirmed`);
      onConfirm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Confirmation failed");
    } finally {
      setLoading(false);
    }
  }

  const confirmed = receipt?.status === "PAID";

  return (
    <Modal open={open} onClose={onClose} title="Review receipt" wide>
      {receipt && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/30">
            {receipt.receiptUrl ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={receiptImageUrl(receipt.receiptUrl)}
                  alt="payment receipt"
                  className="mx-auto h-auto w-auto max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-2xl text-sm text-muted-foreground">
                No receipt image attached
              </div>
            )}
          </div>
          {receipt.receiptUrl && (
            <a
              href={receiptImageUrl(receipt.receiptUrl)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Open full image <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{receipt.payerName}</span>
              <span className="text-lg font-extrabold gradient-text">
                {formatMoney(receipt.amount)}
              </span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Submitted {formatDate(receipt.paidAt)} · Paid to {receipt.payeeName}
            </div>
            {confirmed && (
              <div className="mt-2">
                <Badge tone="success">
                  <CheckCircle2 className="h-3 w-3" /> Confirmed by winner
                  {receipt.confirmedByWinnerAt
                    ? ` · ${formatDate(receipt.confirmedByWinnerAt)}`
                    : ""}
                </Badge>
              </div>
            )}
          </div>

          {confirmed ? (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              This receipt is confirmed. The money counts as paid.
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-amber-500/10 px-4 py-3">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                View the receipt closely, then confirm once the payment is real.
              </p>
              <Button onClick={confirm} loading={loading}>
                <CheckCircle2 className="h-4 w-4" /> Confirm payment
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
