"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Cycle, Ekub } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export function EditEkubForm({
  ekub,
  token,
  onUpdated,
}: {
  ekub: Ekub;
  token: string;
  onUpdated: (ekub: Ekub) => void;
}) {
  const [name, setName] = useState(ekub.name);
  const [description, setDescription] = useState(ekub.description ?? "");
  const [cycle, setCycle] = useState<Cycle>(ekub.cycle);
  const [startDate, setStartDate] = useState(
    ekub.startDate.slice(0, 10) ?? "",
  );
  const [quotaAmount, setQuotaAmount] = useState(String(ekub.quotaAmount));
  const [totalQuotas, setTotalQuotas] = useState(String(ekub.totalQuotas));
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await apiFetch<Ekub>(`/ekubs/${ekub.id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          name,
          description: description || null,
          cycle,
          startDate: startDate ? new Date(startDate).toISOString() : undefined,
          quotaAmount: parseInt(quotaAmount, 10),
          totalQuotas: parseInt(totalQuotas, 10),
        }),
      });
      toast.success("Ekub settings updated");
      onUpdated(updated);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Cycle</Label>
          <Select value={cycle} onChange={(e) => setCycle(e.target.value as Cycle)}>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="ANNUALLY">Annually</option>
          </Select>
        </div>
        <div>
          <Label>Start date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quota value (Br)</Label>
          <Input
            type="number"
            min={1}
            value={quotaAmount}
            onChange={(e) => setQuotaAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Total slots</Label>
          <Input
            type="number"
            min={1}
            value={totalQuotas}
            onChange={(e) => setTotalQuotas(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
        Changing the quota value or slot count updates the plan. Already-created
        quota slots keep their current members — use auto-combine after editing.
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Save changes
      </Button>
    </form>
  );
}
