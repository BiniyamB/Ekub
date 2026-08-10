"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Ekub, Quota } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function DrawModal({
  ekub,
  token,
  onDrawn,
  open,
  onClose,
}: {
  ekub: Ekub;
  token: string;
  onDrawn: (ekub: Ekub) => void;
  open: boolean;
  onClose: () => void;
}) {
  const pending = ekub.quotas.filter((q) => q.status === "PENDING");
  const [phase, setPhase] = useState<"idle" | "spinning" | "revealed">("idle");
  const [winner, setWinner] = useState<Quota | null>(null);
  const [shown, setShown] = useState<Quota | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  async function handleDraw() {
    if (pending.length === 0) return;
    setPhase("spinning");
    try {
      const updated = await apiFetch<Ekub>(`/ekubs/${ekub.id}/draw`, {
        method: "POST",
        token,
      });
      const won = updated.quotas.find((q) => q.status === "SELECTED" && !q.winnerAt) ??
        updated.quotas.find((q) => q.status === "SELECTED");
      const actual = won ?? updated.quotas.find((q) => q.status === "SELECTED");

      // spin animation
      let spinCount = 0;
      const spin = setInterval(() => {
        spinCount += 1;
        setShown(pending[Math.floor(Math.random() * pending.length)]);
        if (spinCount > 14) {
          clearInterval(spin);
          setShown(actual ?? null);
          setWinner(actual ?? null);
          setPhase("revealed");
          toast.success("Winner drawn!");
          onDrawn(updated);
        }
      }, 120);
      timers.current.push(spin as unknown as ReturnType<typeof setTimeout>);
    } catch (err) {
      setPhase("idle");
      toast.error(err instanceof Error ? err.message : "Draw failed");
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Draw the winner">
      <div className="flex flex-col items-center gap-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {pending.length}
          </span>{" "}
          quota slot{pending.length === 1 ? "" : "s"} still waiting. One is
          chosen completely at random.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={shown?.id ?? "empty"}
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0, rotate: 8 }}
            transition={{ type: "spring", damping: 16, stiffness: 260 }}
            className="glass flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-3xl shadow-xl"
          >
            {phase === "revealed" && winner ? (
              <>
                <div className="hero-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-amber-500/40">
                  <Trophy className="h-7 w-7" />
                </div>
                <div className="text-2xl font-extrabold">
                  Quota #{winner.position}
                </div>
                <div className="text-xs text-muted-foreground">
                  {winner.members.map((m) => m.name).join(", ")}
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl font-extrabold gradient-text">
                  #{shown?.position ?? "?"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {shown?.members.map((m) => m.name).join(", ") ?? "shuffling…"}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {phase === "revealed" && winner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-amber-500/10 px-5 py-3 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400">
              <PartyPopper className="h-4 w-4" />
              Congratulate the winner!
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Pot value {formatMoney(ekub.quotaAmount)} — members can now attach
              their receipts.
            </div>
          </motion.div>
        )}

        {phase !== "revealed" ? (
          <Button
            size="lg"
            className="w-full"
            onClick={handleDraw}
            disabled={phase === "spinning" || pending.length === 0}
            loading={phase === "spinning"}
          >
            {phase === "spinning" ? "Drawing…" : "Draw winner"}
          </Button>
        ) : (
          <Button variant="secondary" size="lg" className="w-full" onClick={onClose}>
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
}
