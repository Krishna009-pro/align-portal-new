"use client";

import type { AppSession } from "@/lib/session";
import type { UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { getSessionEventName } from "@/lib/session";

const emptySubscribe = () => () => {};

function subscribeToSessionStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const eventName = getSessionEventName();
  const handler = () => onStoreChange();

  window.addEventListener("storage", handler);
  window.addEventListener(eventName, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(eventName, handler);
  };
}

function getClientSessionSnapshot(): AppSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem("align_session");
  if (!raw) {
    return null;
  }

  if (raw === lastRawSnapshot) {
    return lastParsedSnapshot;
  }

  lastRawSnapshot = raw;

  try {
    lastParsedSnapshot = JSON.parse(raw) as AppSession;
  } catch {
    lastParsedSnapshot = null;
  }

  return lastParsedSnapshot;
}

function getServerSessionSnapshot(): AppSession | null {
  return null;
}

let lastRawSnapshot: string | null = null;
let lastParsedSnapshot: AppSession | null = null;

export function useProtectedSession(allowedRoles?: UserRole[]) {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeToSessionStore,
    getClientSessionSnapshot,
    getServerSessionSnapshot,
  );
  const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!session) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(session.role)) {
      router.replace(session.role === "manager" ? "/team" : "/goals");
      return;
    }
  }, [allowedRoles, hydrated, router, session]);

  const isAuthorizedRole = !allowedRoles || (session ? allowedRoles.includes(session.role) : false);
  const isLoading = !hydrated || !session || !isAuthorizedRole;

  return { session, isLoading };
}
