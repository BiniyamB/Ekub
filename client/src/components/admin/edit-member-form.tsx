"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Ekub, Member } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

export function EditMemberForm({
  ekub,
  member,
  token,
  onUpdated,
}: {
  ekub: Ekub;
  member: Member;
  token: string;
  onUpdated: (ekub: Ekub) => void;
}) {
  const [name, setName] = useState(member.name);
  const [address, setAddress] = useState(member.address);
  const [phone, setPhone] = useState(member.phone ?? "");
  const [preferredAmount, setPreferredAmount] = useState(
    String(member.preferredAmount),
  );
  const [quotaId, setQuotaId] = useState(
    member.quotaId ? String(member.quotaId) : "0",
  );
  const [quotaAmount, setQuotaAmount] = useState(
    String(member.quotaAmount ?? member.preferredAmount),
  );
  const [username, setUsername] = useState(member.username ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await apiFetch<Ekub>(`/ekubs/${ekub.id}/members/${member.id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          name,
          address,
          phone: phone || null,
          preferredAmount: parseInt(preferredAmount, 10),
          username: username.trim() || undefined,
          password: password || undefined,
        }),
      });
      const final = await apiFetch<Ekub>(
        `/ekubs/${ekub.id}/members/${member.id}/quota`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({
            quotaId: parseInt(quotaId, 10) || null,
            amount: parseInt(quotaAmount, 10) || undefined,
          }),
        },
      );
      toast.success("Member updated");
      onUpdated(final ?? updated);
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
        <Label>Address</Label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <Label>Preferred amount (Br)</Label>
          <Input
            type="number"
            min={1}
            value={preferredAmount}
            onChange={(e) => setPreferredAmount(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quota slot</Label>
          <Select value={quotaId} onChange={(e) => setQuotaId(e.target.value)}>
            <option value="0">Unassigned</option>
            {ekub.quotas.map((q) => (
              <option key={q.id} value={q.id}>
                Quota #{q.position}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Share in slot (Br)</Label>
          <Input
            type="number"
            min={1}
            disabled={parseInt(quotaId, 10) === 0}
            value={quotaAmount}
            onChange={(e) => setQuotaAmount(e.target.value)}
            title="Exact amount this member contributes inside the selected quota"
          />
        </div>
      </div>
      <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
        <Label>Member login credentials</Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Username (e.g. amanuel)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="New password (leave blank to keep)"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          The member signs in with these at the home page. Username is required
          for a password to take effect.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Quota value is {ekub.quotaAmount} Br — the share defaults to the
        preferred amount but can be set manually per slot.
      </p>
      <Button type="submit" className="w-full" loading={loading}>
        Save member
      </Button>
    </form>
  );
}
