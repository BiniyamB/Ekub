"use client";

import { FileUp, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import type { PlanWinner } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

export function ReceiptForm({
  quotaId,
  winners,
  defaultPayeeId,
  token,
  onUploaded,
}: {
  quotaId: number;
  winners: PlanWinner[];
  defaultPayeeId?: number;
  token: string;
  onUploaded: () => void;
}) {
  const [recipientId, setRecipientId] = useState<number>(
    defaultPayeeId ?? winners[0]?.realId ?? 0,
  );
  const payee = winners.find((w) => w.realId === recipientId);
  const assigned = payee?.assigned ?? [];
  const [memberId, setMemberId] = useState<number>(assigned[0]?.memberId ?? 0);
  const [amount, setAmount] = useState(
    assigned[0] ? String(assigned[0].amount) : "",
  );
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function selectPayee(next: number) {
    setRecipientId(next);
    const w = winners.find((x) => x.realId === next);
    const first = w?.assigned[0];
    setMemberId(first?.memberId ?? 0);
    setAmount(first ? String(first.amount) : "");
  }

  function selectPayer(next: number) {
    setMemberId(next);
    const a = assigned.find((x) => x.memberId === next);
    if (a) setAmount(String(a.amount));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!memberId || !recipientId || !amount) {
      toast.error("Choose who paid, who received and the paid amount");
      return;
    }
    if (memberId === recipientId) {
      toast.error("The payer and the payee cannot be the same person");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("quotaId", String(quotaId));
      form.append("memberId", String(memberId));
      form.append("recipientId", String(recipientId));
      form.append("amount", amount);
      if (note) form.append("note", note);
      if (file) form.append("receipt", file);

      const res = await fetch(`${API_URL}/payments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          (body && (body.message ?? res.statusText)) || "Upload failed",
        );
      }
      toast.success("Receipt attached");
      onUploaded();
      setAmount("");
      setNote("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Who received it (payee)</Label>
        <Select
          value={recipientId}
          onChange={(e) => selectPayee(parseInt(e.target.value, 10))}
        >
          {winners.map((w) => (
            <option key={w.realId} value={w.realId}>
              {w.name} — {formatMoney(w.pot)}
            </option>
          ))}
        </Select>
        <p className="mt-1 text-[11px] text-muted-foreground">
          The system assigned each payer below to this winner.
        </p>
      </div>
      <div>
        <Label>Who paid (payer)</Label>
        <Select
          value={memberId}
          onChange={(e) => selectPayer(parseInt(e.target.value, 10))}
        >
          {assigned.map((a) => (
            <option key={a.memberId} value={a.memberId}>
              {a.name} — {formatMoney(a.amount)}
            </option>
          ))}
        </Select>
        {assigned.length === 0 && (
          <p className="mt-1 text-[11px] text-muted-foreground">
            No payers are assigned to this winner yet.
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Paid amount (Br)</Label>
          <Input
            type="number"
            min={1}
            placeholder="25000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Note (optional)</Label>
          <Input
            placeholder="e.g. round 3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label>Receipt image</Label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <FileUp className="h-6 w-6" />
          {file ? (
            <span className="font-semibold text-foreground">{file.name}</span>
          ) : (
            <span>Click to choose a receipt image</span>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        <Upload className="h-4 w-4" /> Attach receipt
      </Button>
    </form>
  );
}
