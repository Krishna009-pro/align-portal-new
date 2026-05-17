"use client";

import { firebaseClientAuth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { clearSession } from "./session";

export async function logoutUser() {
  clearSession();

  if (firebaseClientAuth) {
    try {
      await signOut(firebaseClientAuth);
    } catch {
      // ignore sign-out failures for demo sessions
    }
  }
}
