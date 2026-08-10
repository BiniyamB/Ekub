"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Payment, PlanWinner } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

export function EditPaymentForm({
  payment,
  winners,
  token,
  onUpdated,
}: {
  payment: Payment;
  winners: PlanWinner[];
  token: string;
  onUpdated: () => void;
}) {
  const [amount, setAmount] = useState(String(payment.amount));
  const [recipientId, setRecipientId] = useState<number>(
    payment.recipientId ?? winners[0]?.realId ?? 0,
  );
  const [note, setNote] = useState(payment.note ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/payments/${payment.id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          amount: parseInt(amount, 10),
          note: note || null,
          recipientId: recipientId || null,
        }),
      });
      toast.success("Payment updated");
      onUpdated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Payer</Label>
        <div className="rounded-xl bg-muted/50 px-3.5 py-2.5 text-sm font-semibold">
          {payment.member?.name ?? `Member #${payment.memberId}`}
        </div>
      </div>
      <div>
        <Label>Who received it (payee)</Label>
        <Select
          value={recipientId}
          onChange={(e) => setRecipientId(parseInt(e.target.value, 10))}
        >
          {winners.map((w) => (
            <option key={w.realId} value={w.realId}>
              {w.name} — {formatMoney(w.pot)}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Paid amount (Br)</Label>
        <Input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Note</Label>
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Save payment
      </Button>
    </form>
  );
}
