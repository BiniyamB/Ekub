"use client";

import { Coins } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="hero-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg shadow-fuchsia-500/30 transition-transform group-hover:rotate-6">
            <Coins className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Ekub</span>
            <span className="text-muted-foreground"> Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href={isAdmin ? "/" : "/admin"}
            className={`hero-gradient rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 ${
              isAdmin ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
