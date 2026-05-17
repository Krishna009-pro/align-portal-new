"use client";

import type { UserRole } from "@/lib/types";

const SESSION_KEY = "align_session";
const SESSION_EVENT = "align-session-change";

export interface AppSession {
  userId: string;
  role: UserRole;
  name: string;
  email?: string;
}

function hasWindow() {
  return typeof window !== "undefined";
}

export function getSession(): AppSession | null {
  if (!hasWindow()) {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AppSession;
  } catch {
    return null;
  }
}

export function setSession(session: AppSession) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSession() {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getSessionEventName() {
  return SESSION_EVENT;
}
