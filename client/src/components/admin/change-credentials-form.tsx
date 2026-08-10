"use client";

import { KeyRound, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { AuthResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function ChangeCredentialsForm({
  token,
  onChanged,
  onClose,
}: {
  token: string;
  onChanged: (auth: AuthResponse) => void;
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Enter your current password to confirm the change");
      return;
    }
    if (password && password.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const auth = await apiFetch<AuthResponse>("/auth/credentials", {
        method: "PATCH",
        token,
        body: JSON.stringify({
          currentPassword,
          username: username || undefined,
          password: password || undefined,
        }),
      });
      toast.success("Credentials updated");
      onChanged(auth);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Current password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label>New username (optional)</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Leave empty to keep current"
          />
        </div>
      </div>
      <div>
        <Label>New password (optional)</Label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave empty to keep current"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Save changes
      </Button>
    </form>
  );
}
