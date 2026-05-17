"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { AdminEmployeeSidebar } from "@/components/admin-employee-sidebar";
import { AdminEmployeeTopBar } from "@/components/admin-employee-topbar";
import {
  ADMIN_EMPLOYEE_HEADERS,
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
      <AdminEmployeeSidebar active="goals" onSignOut={() => void handleSignOut()} session={session} />

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
