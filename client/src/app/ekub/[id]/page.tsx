import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EkubDetail } from "@/components/ekub-detail";
import { API_URL } from "@/lib/api";
import type { Ekub, PaymentPlan } from "@/lib/types";

export const metadata: Metadata = {
  title: "Ekub detail",
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

async function getPaymentPlan(id: string): Promise<PaymentPlan | null> {
  try {
    const res = await fetch(`${API_URL}/ekubs/${id}/payment-plan`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EkubPage({ params }: PageProps<"/ekub/[id]">) {
  const { id } = await params;
  const [ekub, plan] = await Promise.all([getEkub(id), getPaymentPlan(id)]);
  if (!ekub) notFound();
  return <EkubDetail ekub={ekub} initialPlan={plan} />;
}
