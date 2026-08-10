"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Cycle, Ekub } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export function CreateEkubForm({
  token,
  onCreated,
}: {
  token: string;
  onCreated: (ekub: Ekub) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quotaAmount, setQuotaAmount] = useState("");
  const [totalQuotas, setTotalQuotas] = useState("");
  const [cycle, setCycle] = useState<Cycle>("MONTHLY");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const ekub = await apiFetch<Ekub>("/ekubs", {
        method: "POST",
        token,
        body: JSON.stringify({
          name,
          description: description || undefined,
          quotaAmount: parseInt(quotaAmount, 10),
          totalQuotas: parseInt(totalQuotas, 10),
          cycle,
        }),
      });
      onCreated(ekub);
      toast.success(`Ekub "${ekub.name}" created`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create ekub");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Ekub name</Label>
        <Input
          placeholder="e.g. Neighbourhood Savings"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Description (optional)</Label>
        <Textarea
          rows={2}
          placeholder="Short note about the circle"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quota amount (Br)</Label>
          <Input
            type="number"
            min={1}
            placeholder="50000"
            value={quotaAmount}
            onChange={(e) => setQuotaAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Total quotas</Label>
          <Input
            type="number"
            min={1}
            placeholder="6"
            value={totalQuotas}
            onChange={(e) => setTotalQuotas(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label>Cycle</Label>
        <Select
          value={cycle}
          onChange={(e) => setCycle(e.target.value as Cycle)}
        >
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="ANNUALLY">Annually</option>
        </Select>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {totalQuotas} quotas × {cycle.toLowerCase()} = every{" "}
          {parseInt(totalQuotas || "0", 10) *
            (cycle === "WEEKLY" ? 1 : cycle === "MONTHLY" ? 1 : 1)}{" "}
          {cycle === "WEEKLY"
            ? "week(s)"
            : cycle === "MONTHLY"
              ? "month(s)"
              : "year(s)"}
        </p>
      </div>
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Create ekub
      </Button>
    </form>
  );
}
