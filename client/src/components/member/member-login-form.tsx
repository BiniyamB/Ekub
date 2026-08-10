"use client";

import { motion } from "framer-motion";
import { Coins, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { MemberAuthResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function MemberLoginForm({
  onSuccess,
}: {
  onSuccess: (auth: MemberAuthResponse) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = await apiFetch<MemberAuthResponse>("/auth/member/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onSuccess(auth);
      toast.success(`Welcome back, ${auth.member.name}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="hero-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Coins className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold">Member sign in</h1>
          <p className="text-sm text-muted-foreground">
            Your ekub circle, your rounds and your receipts — in one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full" size="lg" loading={loading}>
            Sign in
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Don&apos;t have an account? Your admin registers members and creates
          your sign-in details.
        </p>
      </motion.div>
    </div>
  );
}
