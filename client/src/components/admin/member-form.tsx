"use client";

import { Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Ekub } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

interface Row {
  key: number;
  name: string;
  address: string;
  phone: string;
  preferredAmount: string;
}

export function MemberForm({
  ekubId,
  quotaAmount,
  token,
  onUpdated,
}: {
  ekubId: number;
  quotaAmount: number;
  token: string;
  onUpdated: () => void;
}) {
  const [rows, setRows] = useState<Row[]>([
    { key: 1, name: "", address: "", phone: "", preferredAmount: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [quickAdd, setQuickAdd] = useState("");

  function addRow() {
    setRows((r) => [
      ...r,
      {
        key: Date.now(),
        name: "",
        address: "",
        phone: "",
        preferredAmount: "",
      },
    ]);
  }

  function updateRow(key: number, field: keyof Row, value: string) {
    setRows((r) =>
      r.map((row) => (row.key === key ? { ...row, [field]: value } : row)),
    );
  }

  function removeRow(key: number) {
    setRows((r) => (r.length > 1 ? r.filter((row) => row.key !== key) : r));
  }

  function quickAddMembers() {
    const names = quickAdd
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length === 0) return;
    setRows((r) => [
      ...r.filter((row) => row.name || row.address || row.preferredAmount),
      ...names.map((n, i) => ({
        key: Date.now() + i,
        name: n,
        address: "",
        phone: "",
        preferredAmount: "",
      })),
    ]);
    setQuickAdd("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const members = rows
      .map((r) => ({
        name: r.name.trim(),
        address: r.address.trim(),
        phone: r.phone.trim() || undefined,
        preferredAmount: parseInt(r.preferredAmount, 10),
      }))
      .filter((m) => m.name && m.preferredAmount > 0);

    if (members.length === 0) {
      toast.error("Add at least one member with a name and amount");
      return;
    }

    setLoading(true);
    try {
      await apiFetch<Ekub>(`/ekubs/${ekubId}/members/bulk`, {
        method: "POST",
        token,
        body: JSON.stringify({ members }),
      });
      toast.success(`${members.length} member(s) registered`);
      onUpdated();
      setRows([
        { key: Date.now(), name: "", address: "", phone: "", preferredAmount: "" },
      ]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  }

  const memberTotal = rows.reduce(
    (s, r) => s + (parseInt(r.preferredAmount, 10) || 0),
    0,
  );
  const slotTotal = quotaAmount;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
        <Label>Quick add names (one per line)</Label>
        <div className="flex gap-2">
          <Input
            placeholder={"Amanuel\nSara\nDawit"}
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
          />
          <Button type="button" variant="secondary" onClick={quickAddMembers}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[1fr_1fr_0.8fr_0.8fr_auto] items-center gap-2 rounded-xl border border-border/70 bg-card p-2.5"
          >
            <Input
              placeholder="Name"
              value={row.name}
              onChange={(e) => updateRow(row.key, "name", e.target.value)}
            />
            <Input
              placeholder="Address"
              value={row.address}
              onChange={(e) => updateRow(row.key, "address", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={row.phone}
              onChange={(e) => updateRow(row.key, "phone", e.target.value)}
            />
            <Input
              type="number"
              min={1}
              placeholder="Amount"
              value={row.preferredAmount}
              onChange={(e) =>
                updateRow(row.key, "preferredAmount", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeRow(row.key)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 text-sm">
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
        >
          <Plus className="h-4 w-4" /> Add member
        </button>
        <span className="text-muted-foreground">
          Registered total:{" "}
          <span className="font-bold text-foreground">{memberTotal}</span> /{" "}
          <span className="font-bold text-primary">{slotTotal}</span> per quota
        </span>
      </div>

      <Button type="submit" className="w-full" loading={loading}>
        <Users className="h-4 w-4" /> Register members
      </Button>
    </form>
  );
}
