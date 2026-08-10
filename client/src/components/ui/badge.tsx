import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Tone = "default" | "success" | "warning" | "info" | "danger" | "primary";

const tones: Record<Tone, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  info: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  danger: "bg-red-500/15 text-red-600 dark:text-red-400",
  primary: "bg-primary/15 text-primary",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
