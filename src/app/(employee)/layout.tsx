"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useProtectedSession(["employee", "admin"]);

  if (isLoading) {
    return <main className="p-6">Loading...</main>;
  }

  return children;
}
