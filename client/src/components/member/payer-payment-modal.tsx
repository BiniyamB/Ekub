"use client";

import { FileUp, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import type { MeMember, PaymentRound } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function PayerPaymentModal({
  open,
  onClose,
  round,
  member,
  token,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  round: PaymentRound;
  member: MeMember;
  token: string;
  onSubmitted: () => void;
}) {
  const assigned = round.payers.find((p) => p.memberId === member.id);
  const [recipientId, setRecipientId] = useState(
    String(assigned?.paysTo ?? round.winners[0]?.realId ?? ""),
  );
  const [amount, setAmount] = useState(
    assigned ? String(assigned.owed) : "",
  );
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipientId) {
      toast.error("Pick the winner you paid");
      return;
    }
    if (!file) {
      toast.error("Attach a photo of your receipt");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("quotaId", String(round.quotaId));
      form.append("recipientId", recipientId);
      form.append("amount", amount);
      if (note) form.append("note", note);
      form.append("receipt", file);

      const res = await fetch(`${API_URL}/me/receipts`, {
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
      toast.success("Receipt submitted — waiting for the winner to confirm");
      onSubmitted();
      onClose();
      setFile(null);
      setNote("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Pay round #${round.position}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Who received your payment (the winner)</Label>
          <Select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          >
            {round.winners.map((w) => (
              <option key={w.realId} value={w.realId}>
                {w.name} — {formatMoney(w.pot)}
              </option>
            ))}
          </Select>
          {assigned && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              The system assigned you to pay {assigned.paysToName} — pick them
              here if you haven&apos;t yet.
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
          <Label>Receipt photo</Label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <FileUp className="h-6 w-6" />
            {file ? (
              <span className="font-semibold text-foreground">{file.name}</span>
            ) : (
              <span>Click to attach a photo of your receipt</span>
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
          <Send className="h-4 w-4" /> Submit receipt
        </Button>
      </form>
    </Modal>
  );
}
