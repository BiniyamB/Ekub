import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Documentation | Ekub Hub",
  description: "Full documentation for Ekub Hub.",
};

function loadDocs(): string {
  try {
    const p = path.join(process.cwd(), "..", "DOCUMENTATION.md");
    return readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

export default function DocsPage() {
  const content = loadDocs();
  if (!content) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
          Project Documentation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          File-by-file reference, business logic, database schema, API surface and
          deployment notes for Ekub Hub.
        </p>
      </div>
      <article className="glass overflow-hidden rounded-2xl">
        <pre className="overflow-x-auto whitespace-pre-wrap p-6 text-[13px] leading-relaxed text-foreground">
          {content}
        </pre>
      </article>
    </main>
  );
}
