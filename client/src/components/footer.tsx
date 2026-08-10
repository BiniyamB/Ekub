import Link from "next/link";
import { Coins } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Coins className="h-4 w-4 text-primary" />
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">Ekub Hub</span> —
            trust through transparency.
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/admin"
            className="transition-colors hover:text-foreground"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
