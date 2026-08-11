export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

const API_ORIGIN = API_URL.endsWith("/api")
  ? API_URL.slice(0, -4)
  : API_URL;

export const UPLOADS_URL =
  process.env.NEXT_PUBLIC_UPLOADS_URL ?? API_ORIGIN;

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = Array.isArray(body.message)
        ? body.message.join(". ")
        : body.message ?? message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}
