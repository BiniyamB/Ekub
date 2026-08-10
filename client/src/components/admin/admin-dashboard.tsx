"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins,
  KeyRound,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Admin, AuthResponse, Ekub } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { ChangeCredentialsForm } from "@/components/admin/change-credentials-form";
import { CreateEkubForm } from "@/components/admin/create-ekub-form";
import { EditEkubForm } from "@/components/admin/edit-ekub-form";
import { EkubManager } from "@/components/admin/ekub-manager";

export function AdminDashboard({
  token,
  admin,
  onLogout,
  onAuthChanged,
}: {
  token: string;
  admin: Admin;
  onLogout: () => void;
  onAuthChanged: (auth: AuthResponse) => void;
}) {
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [managing, setManaging] = useState<number | null>(null);
  const [editing, setEditing] = useState<Ekub | null>(null);
  const [resettingDraws, setResettingDraws] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);

  const { data: ekubs = [], isLoading } = useQuery({
    queryKey: ["ekubs"],
    queryFn: () => apiFetch<Ekub[]>("/ekubs", { token }),
  });

  async function resetAllDraws() {
    if (
      !confirm(
        "Reset ALL draws across every ekub? Winners are cleared and ekubs return to active.",
      )
    ) {
      return;
    }
    setResettingDraws(true);
    try {
      await apiFetch("/ekubs/reset-draws", { method: "POST", token });
      await qc.invalidateQueries({ queryKey: ["ekubs"] });
      toast.success("All draws removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setResettingDraws(false);
    }
  }

  async function removeEkub(id: number) {
    if (!confirm("Delete this ekub and all its data?")) return;
    try {
      await apiFetch(`/ekubs/${id}`, { method: "DELETE", token });
      await qc.invalidateQueries({ queryKey: ["ekubs"] });
      toast.success("Ekub deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (managing !== null) {
    return (
      <EkubManager
        ekubId={managing}
        token={token}
        onBack={() => setManaging(null)}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="hero-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Admin dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-semibold">{admin.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={resetAllDraws}
            loading={resettingDraws}
          >
            <RotateCcw className="h-4 w-4" /> Reset draws
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> New ekub
          </Button>
          <Link href="/docs">
            <Button variant="outline">
              <Pencil className="h-4 w-4" /> Docs
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setCredentialsOpen(true)}
            title="Change admin username and password"
          >
            <KeyRound className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="shimmer-line h-56 animate-shimmer rounded-3xl" />
          ))}
        </div>
      ) : ekubs.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl p-16 text-center">
          <div className="hero-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
            <Coins className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">No ekubs created yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Create your first ekub to start registering members and running
            draws.
          </p>
          <Button className="mt-2" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create first ekub
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {ekubs.map((ekub, i) => (
              <motion.div
                key={ekub.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute right-3 top-3 z-10 flex gap-1">
                  <button
                    onClick={() => setEditing(ekub)}
                    className="rounded-lg bg-muted/80 p-1.5 text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                    title="Edit ekub"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeEkub(ekub.id)}
                    className="rounded-lg bg-muted/80 p-1.5 text-muted-foreground transition-colors hover:bg-red-500/15 hover:text-red-500"
                    title="Delete ekub"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-2 pr-8">
                  <div>
                    <h3 className="truncate text-lg font-bold">{ekub.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {ekub.cycleLabel} · {ekub.totalQuotas} quotas
                    </p>
                  </div>
                  <Badge tone={ekub.status === "COMPLETED" ? "success" : ekub.status === "CANCELLED" ? "danger" : "primary"}>
                    {ekub.status}
                  </Badge>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Quota value</div>
                    <div className="text-xl font-extrabold gradient-text">
                      {formatMoney(ekub.quotaAmount)}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {ekub.drawnQuotas}/{ekub.totalQuotas} drawn
                  </span>
                </div>

                <ProgressBar value={ekub.progress} className="mt-3" />

                <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                  <span className="text-xs text-muted-foreground">
                    {ekub.totalMembers} members · {ekub.membersAssigned} assigned
                  </span>
                  <Button
                    size="sm"
                    variant={ekub.status === "ACTIVE" ? "primary" : "secondary"}
                    onClick={() => setManaging(ekub.id)}
                  >
                    Manage
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={() => setCreateOpen(true)}
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            <span className="hero-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg">
              <Plus className="h-6 w-6" />
            </span>
            <span className="text-sm font-semibold">Create a new ekub</span>
          </button>
        </div>
      )}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a new ekub"
      >
        <CreateEkubForm
          token={token}
          onCreated={() => {
            setCreateOpen(false);
            void qc.invalidateQueries({ queryKey: ["ekubs"] });
          }}
        />
      </Modal>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Edit ekub"
      >
        {editing && (
          <EditEkubForm
            key={editing.id}
            ekub={editing}
            token={token}
            onUpdated={(updated) => {
              setEditing(null);
              void qc.invalidateQueries({ queryKey: ["ekubs"] });
              void qc.setQueryData(["ekub", updated.id], updated);
            }}
          />
        )}
      </Modal>

      <Modal
        open={credentialsOpen}
        onClose={() => setCredentialsOpen(false)}
        title="Change admin credentials"
      >
        <ChangeCredentialsForm
          token={token}
          onChanged={onAuthChanged}
          onClose={() => setCredentialsOpen(false)}
        />
      </Modal>
    </div>
  );
}
