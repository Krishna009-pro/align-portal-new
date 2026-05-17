"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { AdminEmployeeTopBar } from "@/components/admin-employee-topbar";
import {
  ADMIN_EMPLOYEE_HEADERS,
  ADMIN_EMPLOYEE_LABELS,
  ADMIN_EMPLOYEE_ROUTES,
} from "@/lib/admin-employee-ui";
import { logoutUser } from "@/lib/logout";
import type { GoalRecord } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function formatUomClass(uom: GoalRecord["uom"]) {
  if (uom === "MIN") return "bg-primary-fixed text-primary";
  if (uom === "MAX") return "bg-error-container text-error";
  if (uom === "ZERO") return "bg-green-100 text-green-700";
  return "bg-tertiary-fixed text-on-tertiary-fixed";
}

export default function EmployeeDashboardPage() {
  const router = useRouter();
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);
  const [goals, setGoals] = useState<GoalRecord[]>([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!session?.userId) {
        return;
      }

      setIsFetchingGoals(true);
      try {
        const response = await fetch(`/api/goals?userId=${encodeURIComponent(session.userId)}`);

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { goals?: GoalRecord[] };
        setGoals(payload.goals ?? []);
      } finally {
        setIsFetchingGoals(false);
      }
    };

    void fetchGoals();
  }, [session?.userId]);

  const totalWeightage = useMemo(
    () => goals.reduce((accumulator, goal) => accumulator + goal.weightage, 0),
    [goals],
  );

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
          <Link className="flex items-center px-4 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim rounded-r-lg font-bold" href={ADMIN_EMPLOYEE_ROUTES.goals}>
            <span className="material-symbols-outlined mr-3">ads_click</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.goals}</span>
          </Link>
          <Link className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg" href={ADMIN_EMPLOYEE_ROUTES.checkIns}>
            <span className="material-symbols-outlined mr-3">event_available</span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.checkIns}</span>
          </Link>
          <Link className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg" href={ADMIN_EMPLOYEE_ROUTES.progress}>
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
        <AdminEmployeeTopBar
          title={ADMIN_EMPLOYEE_HEADERS.goals}
          rightSlot={(
            <Link href="/goals/new" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add New Goal
            </Link>
          )}
        />

        <main className="p-page-padding space-y-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-page-padding">
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Goals Created</p>
              <h3 className="font-headline-lg text-headline-lg text-primary">{goals.length}</h3>
            </div>
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Total Weightage</p>
              <h3 className="font-headline-lg text-headline-lg text-primary">{totalWeightage}%</h3>
            </div>
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Status</p>
              <h3 className="font-headline-lg text-headline-lg text-primary">{goals.length ? "Submitted" : "Draft"}</h3>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant custom-shadow overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md font-bold">My Goal Sheet</h3>
              {isFetchingGoals ? <span className="text-sm text-secondary">Refreshing...</span> : null}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">#</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Thrust Area</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Goal Title</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">UoM</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Target</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Weightage</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {goals.length ? (
                    goals.map((goal, index) => (
                      <tr className="hover:bg-surface-container-low transition-colors" key={goal.id}>
                        <td className="px-6 py-4 font-body-md text-body-md">{index + 1}</td>
                        <td className="px-6 py-4 font-label-md text-label-md">{goal.thrustArea}</td>
                        <td className="px-6 py-4 font-body-md text-body-md font-medium">{goal.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${formatUomClass(goal.uom)}`}>
                            {goal.uom}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-body-md text-body-md">{goal.target}</td>
                        <td className="px-6 py-4 font-label-md text-label-md">{goal.weightage}%</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm capitalize">
                            {goal.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-8 text-secondary" colSpan={7}>
                        No goals yet. Click &quot;Add New Goal&quot; to create your first goal sheet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
