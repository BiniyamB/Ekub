"use client";

import { FileUp, Send, Trash2, UserCheck } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { API_URL, UPLOADS_URL } from "@/lib/api";
import type { MeMember, PaymentRound, PlanReceipt } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function PayerPaymentModal({
  open,
  onClose,
  round,
  member,
  token,
  editing,
  onSubmitted,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  round: PaymentRound;
  member: MeMember;
  token: string;
  editing: PlanReceipt | null;
  onSubmitted: () => void;
  onDelete: (receipt: PlanReceipt) => Promise<void>;
}) {
  const assigned = round.payers.find((p) => p.memberId === member.id);
  const isEdit = Boolean(editing);
  const [amount, setAmount] = useState(
    editing ? String(editing.amount ?? "") : assigned ? String(assigned.owed) : "",
  );
  const [note, setNote] = useState(editing?.note ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!assigned) {
      toast.error("The system has not assigned you a payee this round");
      return;
    }
    if (!file && !isEdit) {
      toast.error("Attach a photo of your receipt");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("amount", amount);
      if (note) form.append("note", note);
      if (file) form.append("receipt", file);

      const url = isEdit && editing
        ? `${API_URL}/me/receipts/${editing.id}`
        : `${API_URL}/me/receipts`;
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          (body && (body.message ?? res.statusText)) ||
            (isEdit ? "Update failed" : "Upload failed"),
        );
      }
      toast.success(
        isEdit
          ? "Receipt updated — waiting for the winner to confirm"
          : "Receipt submitted — waiting for the winner to confirm",
      );
      onSubmitted();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!editing) return;
    if (!window.confirm("Delete this receipt? It will be removed for this round.")) {
      return;
    }
    setDeleting(true);
    try {
      await onDelete(editing);
      toast.success("Receipt deleted");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  if (!assigned) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        isEdit
          ? `Edit receipt · round #${round.roundNumber}`
          : `Pay round #${round.roundNumber}`
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        key={editing?.id ?? "new"}
      >
        {/* Assigned payee — decided by the system, not the member */}
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <UserCheck className="h-4 w-4 text-primary" />
            Assigned payee (auto-calculated)
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-base font-bold">{assigned.paysToName}</span>
            <span className="text-sm font-extrabold text-primary">
              {formatMoney(assigned.owed)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            The system balances every winner&apos;s pot, so each member pays
            exactly one assigned winner. You cannot change who you pay.
          </p>
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
          <Label>{isEdit ? "Replace receipt photo (optional)" : "Receipt photo"}</Label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <FileUp className="h-6 w-6" />
            {file ? (
              <span className="font-semibold text-foreground">{file.name}</span>
            ) : isEdit && editing?.receiptUrl ? (
              <span className="flex flex-col items-center gap-1.5">
                <span className="overflow-hidden rounded-lg border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${UPLOADS_URL}${editing.receiptUrl}`}
                    alt="current receipt"
                    className="h-16 w-16 object-cover"
                  />
                </span>
                <span className="font-semibold text-foreground">
                  Keep this photo (click to replace)
                </span>
              </span>
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

        <div className="flex items-center gap-2">
          <Button type="submit" className="flex-1" loading={loading}>
            <Send className="h-4 w-4" />
            {isEdit ? "Save changes" : "Submit receipt"}
          </Button>
          {isEdit && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              loading={deleting}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
