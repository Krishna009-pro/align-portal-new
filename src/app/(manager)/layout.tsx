"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useProtectedSession(["manager", "admin"]);

  if (isLoading) {
    return <main className="p-6">Loading...</main>;
  }

  return children;
}
