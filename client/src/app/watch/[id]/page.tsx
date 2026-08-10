import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchDraw } from "@/components/watch-draw";
import { API_URL } from "@/lib/api";
import type { Ekub } from "@/lib/types";

export const metadata: Metadata = {
  title: "Live draw — Ekub Hub",
};

async function getEkub(id: string): Promise<Ekub | null> {
  try {
    const res = await fetch(`${API_URL}/ekubs/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function WatchPage({ params }: PageProps<"/watch/[id]">) {
  const { id } = await params;
  const ekub = await getEkub(id);
  if (!ekub) notFound();
  return <WatchDraw ekub={ekub} />;
}
