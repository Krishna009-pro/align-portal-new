"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { AdminEmployeeTopBar } from "@/components/admin-employee-topbar";
import {
  ADMIN_EMPLOYEE_HEADERS,
  ADMIN_EMPLOYEE_LABELS,
  ADMIN_EMPLOYEE_ROUTES,
} from "@/lib/admin-employee-ui";
import { logoutUser } from "@/lib/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const router = useRouter();
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);

  const handleSignOut = async () => {
    await logoutUser();
    router.replace("/login");
  };

  if (isLoading) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <div className="flex min-h-screen text-on-surface">
      <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-page-padding space-y-stack-gap">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_tree
            </span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              Align Enterprise
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-secondary font-bold">
              Global Strategy
            </p>
          </div>
        </div>

        <nav className="flex-grow px-3 space-y-1">
          <Link className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg" href={ADMIN_EMPLOYEE_ROUTES.dashboard}>
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.dashboard}</span>
          </Link>
          <Link className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg" href={ADMIN_EMPLOYEE_ROUTES.goals}>
            <span className="material-symbols-outlined mr-3">ads_click</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.goals}</span>
          </Link>
          <Link className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg" href={ADMIN_EMPLOYEE_ROUTES.checkIns}>
            <span className="material-symbols-outlined mr-3">event_available</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.checkIns}</span>
          </Link>
          <Link className="flex items-center px-4 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim rounded-r-lg font-bold" href={ADMIN_EMPLOYEE_ROUTES.progress}>
            <span className="material-symbols-outlined mr-3">trending_up</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.progress}</span>
          </Link>
        </nav>

        <div className="px-4 mt-auto pt-4 border-t border-outline-variant">
          <div className="flex items-center p-2 rounded-lg bg-surface-container-low mb-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
              {session?.name?.slice(0, 1).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="font-label-md text-label-md truncate">{session?.name}</p>
              <span className="inline-flex items-center rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-container uppercase">
                {session?.role}
              </span>
            </div>
          </div>
          <button
            onClick={() => void handleSignOut()}
            className="w-full p-2 text-error hover:bg-error-container hover:text-on-error-container rounded-full transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </aside>

      <div className="ml-64 flex flex-col min-h-screen w-full">
        <AdminEmployeeTopBar title={ADMIN_EMPLOYEE_HEADERS.progress} />

        <main className="p-page-padding space-y-section-gap">
          <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow">
            <h3 className="font-headline-md text-headline-md mb-2">Progress View</h3>
            <p className="text-secondary">
              Progress dashboard is now reachable from sidebar for admin and employee users.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
