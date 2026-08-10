import { ArrowDown, Coins, Eye, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { Metadata } from "next";
import { EkubCard } from "@/components/ekub-card";
import { Reveal } from "@/components/reveal";
import { API_URL } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import type { Ekub } from "@/lib/types";

export const metadata: Metadata = {
  title: "Ekub Hub — Modern Rotating Savings",
};

async function getEkubs(): Promise<Ekub[]> {
  try {
    const res = await fetch(`${API_URL}/ekubs`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const ekubs = await getEkubs();

  const totalSaved = ekubs.reduce((s, e) => s + e.totalCollected, 0);
  const totalMembers = ekubs.reduce((s, e) => s + e.totalMembers, 0);
  const winners = ekubs.reduce((s, e) => s + e.drawnQuotas, 0);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 animate-blob rounded-full bg-violet-500/25 blur-3xl" />
          <div className="absolute -right-24 top-10 h-96 w-96 animate-blob rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 animate-blob rounded-full bg-amber-500/15 blur-3xl [animation-delay:4s]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Traditional ekub, reimagined for the digital age
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Save together.{" "}
              <span className="gradient-text">Win fairly.</span>
              <br />
              Trust transparently.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Create an ekub circle, combine members into quota slots, run a
              provably random draw every round, and attach receipts — all in one
              elegant dashboard.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#ekubs"
                className="hero-gradient inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-base font-semibold text-white shadow-xl shadow-fuchsia-500/30 transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                Explore ekubs <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="glass inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-base font-semibold transition-all hover:scale-105 active:scale-95"
              >
                How it works
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.4} className="mt-16 w-full">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { icon: Coins, label: "Active ekubs", value: String(ekubs.length) },
                { icon: Users, label: "Total members", value: String(totalMembers) },
                { icon: Eye, label: "Winners drawn", value: String(winners) },
                {
                  icon: ShieldCheck,
                  label: "Collected",
                  value: formatMoney(totalSaved),
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass flex flex-col items-center gap-1 rounded-2xl p-4"
                >
                  <s.icon className="h-5 w-5 text-primary" />
                  <div className="text-xl font-extrabold sm:text-2xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EKUBS */}
      <section id="ekubs" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Live ekub circles
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Every quota, winner and receipt is visible to everyone.
              </p>
            </div>
            <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground sm:block">
              {ekubs.length} total
            </span>
          </div>
        </Reveal>

        {ekubs.length === 0 ? (
          <div className="glass flex flex-col items-center gap-3 rounded-3xl p-14 text-center">
            <div className="hero-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl shadow-fuchsia-500/30">
              <Coins className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">No ekubs yet</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              The admin can create the first ekub circle from the admin panel.
            </p>
            <a
              href="/admin"
              className="hero-gradient mt-2 inline-flex h-10 items-center rounded-xl px-5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Go to admin
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ekubs.map((ekub, i) => (
              <EkubCard key={ekub.id} ekub={ekub} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative overflow-hidden border-y border-border/60 bg-muted/30"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                How an ekub works here
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                From creating a circle to collecting the pot — four simple steps.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Create the circle",
                desc: "Set the quota value (e.g. 50,000 Br), pick weekly, monthly or yearly, and choose how many quotas to run.",
              },
              {
                n: "02",
                title: "Register members",
                desc: "Add each member with their address and preferred amount. The system automatically combines people to fill each quota.",
              },
              {
                n: "03",
                title: "Draw the winner",
                desc: "A random selector picks one quota per round — fairly, with no favorites.",
              },
              {
                n: "04",
                title: "Track receipts",
                desc: "Each member of the winning quota uploads their receipt so every payment is public and verifiable.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="hero-gradient absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl transition-opacity group-hover:opacity-30" />
                  <div className="text-4xl font-extrabold text-primary/25 transition-colors group-hover:text-primary/50">
                    {step.n}
                  </div>
                  <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="hero-gradient relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-2xl shadow-fuchsia-500/30 sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-amber-300/40 blur-3xl" />
            </div>
            <h2 className="relative text-2xl font-extrabold sm:text-3xl">
              Ready to run a transparent savings circle?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-white/85">
              Open the admin panel to create your first ekub and invite members
              to start saving together.
            </p>
            <a
              href="/admin"
              className="relative mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-8 text-base font-bold text-fuchsia-700 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Open admin panel <ArrowDown className="h-4 w-4 rotate-180" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
