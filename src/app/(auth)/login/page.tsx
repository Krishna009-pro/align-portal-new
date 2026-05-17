"use client";

import { firebaseClientAuth } from "@/lib/firebase/client";
import { clearSession, setSession } from "@/lib/session";
import type { UserRole } from "@/lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DEMO_USERS: Record<UserRole, { userId: string; name: string; route: string }> = {
  employee: { userId: "demo-employee", name: "Rahul Mehta", route: "/goals" },
  manager: { userId: "demo-manager", name: "Priya Kapoor", route: "/team" },
  admin: { userId: "demo-admin", name: "Admin User", route: "/dashboard" },
};

function inferRoleFromEmail(email: string): UserRole {
  if (email.includes("manager") || email.includes("lead")) {
    return "manager";
  }

  if (email.includes("admin")) {
    return "admin";
  }

  return "employee";
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    clearSession();
  }, []);

  const routeForRole = (role: UserRole) => {
    if (role === "manager") {
      return "/team";
    }

    if (role === "admin") {
      return "/dashboard";
    }

    return "/goals";
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!firebaseClientAuth) {
        throw new Error("Firebase client is not initialized. Check .env.local");
      }

      const result = await signInWithEmailAndPassword(firebaseClientAuth, email, password);
      const role = inferRoleFromEmail(email.toLowerCase());

      setSession({
        userId: result.user.uid,
        role,
        name: result.user.displayName ?? email.split("@")[0],
        email,
      });

      router.push(routeForRole(role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (role: UserRole) => {
    const demoUser = DEMO_USERS[role];
    setSession({
      userId: demoUser.userId,
      role,
      name: demoUser.name,
    });

    router.push(demoUser.route);
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      <section className="relative flex w-full flex-col justify-between bg-primary-container p-page-padding md:w-1/2 md:p-16">
        <div className="z-10 flex flex-col space-y-8">
          <div className="space-y-2">
            <h1 className="text-[48px] font-black leading-tight tracking-tighter text-on-primary">Align</h1>
            <p className="font-headline-md text-headline-md text-on-primary/90">
              Align every goal. Track every outcome.
            </p>
          </div>
          <ul className="space-y-6 pt-8">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-1 text-on-primary" data-icon="check_circle">
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">Set and track goals with full transparency</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-1 text-on-primary" data-icon="check_circle">
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">Manager approvals with one click</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-1 text-on-primary" data-icon="check_circle">
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">Real-time quarterly check-ins</span>
            </li>
          </ul>
        </div>
        <div className="z-10 mt-auto pt-12">
          <p className="font-label-md text-label-md text-on-primary/50 uppercase tracking-widest">AtomQuest Hackathon 1.0</p>
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-center bg-surface p-page-padding md:w-1/2">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-[24px] font-bold tracking-tight text-on-surface">Welcome back</h2>
            <p className="font-body-md text-body-md text-secondary mt-1">Sign in to your Align account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">
                  Work Email
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  id="email"
                  placeholder="you@company.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <Link className="font-label-md text-label-md text-primary hover:underline" href="#">
                    Forgot password?
                  </Link>
                </div>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-lg border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">{error}</div>
            ) : null}

            <button
              className="w-full rounded-lg bg-primary-container py-3.5 font-label-md text-on-primary transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="mx-4 flex-shrink font-label-sm text-label-sm text-outline uppercase tracking-wider">or continue as</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              onClick={() => handleDemo("employee")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Employee Demo
            </button>
            <button
              onClick={() => handleDemo("manager")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Manager Demo
            </button>
            <button
              onClick={() => handleDemo("admin")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <footer className="mt-20 md:mt-32">
          <p className="font-label-sm text-label-sm text-outline">Powered by Align Portal v1.0</p>
        </footer>
      </section>
    </main>
  );
}
