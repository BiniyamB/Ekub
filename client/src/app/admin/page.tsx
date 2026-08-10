"use client";

import { useState } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { QueryProvider } from "@/components/query-provider";
import { useMounted } from "@/hooks/use-mounted";
import type { Admin, AuthResponse } from "@/lib/types";

const TOKEN_KEY = "ekub_token";
const ADMIN_KEY = "ekub_admin";

function readStored(): { token: string | null; admin: Admin | null } {
  if (typeof window === "undefined") return { token: null, admin: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const admin = localStorage.getItem(ADMIN_KEY);
    return {
      token,
      admin: admin ? (JSON.parse(admin) as Admin) : null,
    };
  } catch {
    return { token: null, admin: null };
  }
}

export default function AdminPage() {
  const mounted = useMounted();
  const [{ token, admin }, setAuth] = useState<{
    token: string | null;
    admin: Admin | null;
  }>(() => readStored());

  function handleLogin(auth: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, auth.access_token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(auth.admin));
    setAuth({ token: auth.access_token, admin: auth.admin });
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setAuth({ token: null, admin: null });
  }

  if (!mounted) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
        <div className="shimmer-line h-64 w-full max-w-md animate-shimmer rounded-3xl" />
      </div>
    );
  }

  if (!token || !admin) {
    return <LoginForm onSuccess={handleLogin} />;
  }

  return (
    <QueryProvider>
      <AdminDashboard
        token={token}
        admin={admin}
        onLogout={handleLogout}
        onAuthChanged={handleLogin}
      />
    </QueryProvider>
  );
}
