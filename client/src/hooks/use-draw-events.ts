"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api";

/** A quota slot in the compact form used by draw events. */
export interface DrawQuota {
  id: number;
  position: number;
  members: Array<{ name: string }>;
}

/** Payload pushed by the server's `/ekubs/:id/events` SSE stream. */
export interface DrawEventPayload {
  type: "draw" | "reverse" | "reset";
  ekubId: number;
  pending: DrawQuota[];
  winner: DrawQuota | null;
}

/**
 * Subscribes to the public SSE stream of an ekub. `onEvent` fires on every
 * draw/reverse/reset; `onOpen` fires whenever the connection (re)establishes
 * so callers can refetch and catch events missed while disconnected.
 */
export function useDrawEvents(
  ekubId: number,
  onEvent: (event: DrawEventPayload) => void,
  onOpen?: () => void,
  onError?: () => void,
) {
  useEffect(() => {
    const source = new EventSource(`${API_URL}/ekubs/${ekubId}/events`);
    source.onopen = () => onOpen?.();
    source.onerror = () => onError?.();
    source.addEventListener("ekub-event", (e) => {
      try {
        onEvent(JSON.parse((e as MessageEvent).data) as DrawEventPayload);
      } catch {
        /* ignore malformed events */
      }
    });
    return () => source.close();
  }, [ekubId, onEvent, onOpen, onError]);
}
