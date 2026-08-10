"use client";

import { useState } from "react";
import { QueryProvider } from "@/components/query-provider";
import { MemberLoginForm } from "@/components/member/member-login-form";
import { MemberDashboard } from "@/components/member/member-dashboard";
import { useMounted } from "@/hooks/use-mounted";
import type { MemberAuth, MemberAuthResponse } from "@/lib/types";

const TOKEN_KEY = "ekub_member_token";
const MEMBER_KEY = "ekub_member";

function readStored(): { token: string | null; member: MemberAuth | null } {
  if (typeof window === "undefined") return { token: null, member: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const member = localStorage.getItem(MEMBER_KEY);
    return {
      token,
      member: member ? (JSON.parse(member) as MemberAuth) : null,
    };
  } catch {
    return { token: null, member: null };
  }
}

export default function Home() {
  const mounted = useMounted();
  const [{ token, member }, setAuth] = useState<{
    token: string | null;
    member: MemberAuth | null;
  }>(() => readStored());

  function handleLogin(auth: MemberAuthResponse) {
    localStorage.setItem(TOKEN_KEY, auth.access_token);
    localStorage.setItem(MEMBER_KEY, JSON.stringify(auth.member));
    setAuth({ token: auth.access_token, member: auth.member });
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(MEMBER_KEY);
    setAuth({ token: null, member: null });
  }

  if (!mounted) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
        <div className="shimmer-line h-64 w-full max-w-md animate-shimmer rounded-3xl" />
      </div>
    );
  }

  if (!token || !member) {
    return <MemberLoginForm onSuccess={handleLogin} />;
  }

  return (
    <QueryProvider>
      <MemberDashboard token={token} onLogout={handleLogout} />
    </QueryProvider>
  );
}
