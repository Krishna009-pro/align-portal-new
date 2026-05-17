"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { AdminEmployeeSidebar } from "@/components/admin-employee-sidebar";
import { AdminEmployeeTopBar } from "@/components/admin-employee-topbar";
import { ADMIN_EMPLOYEE_HEADERS } from "@/lib/admin-employee-ui";
import { logoutUser } from "@/lib/logout";
import type { GoalRecord } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

interface GoalProgress {
  actual: string;
  percent: number;
  status: "Completed" | "In Progress" | "On Track" | "Delayed";
}

function getProgressTelemetry(goal: GoalRecord): GoalProgress {
  if (goal.title.includes("Revenue")) {
    return { actual: "₹3,80,000 / ₹5,00,000", percent: 76, status: "On Track" };
  }
  if (goal.title.includes("TAT")) {
    return { actual: "3.5 days / 3.0 days", percent: 85, status: "In Progress" };
  }
  if (goal.title.includes("Safety")) {
    return { actual: "0 / 0", percent: 100, status: "Completed" };
  }
  if (goal.title.includes("Training")) {
    return { actual: "80% completed", percent: 80, status: "On Track" };
  }
  if (goal.title.includes("Defect")) {
    return { actual: "1.8% / 2.0%", percent: 100, status: "Completed" };
  }
  return { actual: "60% completed", percent: 60, status: "In Progress" };
}

export default function ProgressPage() {
  const router = useRouter();
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);
  const [goals, setGoals] = useState<GoalRecord[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "PROGRESS">("ALL");

  const handleSignOut = async () => {
    await logoutUser();
    router.replace("/login");
  };

  useEffect(() => {
    const fetchGoals = async () => {
      if (!session?.userId) return;
      setIsFetching(true);
      try {
        const response = await fetch(`/api/goals?userId=${encodeURIComponent(session.userId)}`);
        if (response.ok) {
          const payload = (await response.json()) as { goals?: GoalRecord[] };
          setGoals(payload.goals ?? []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    void fetchGoals();
  }, [session?.userId]);

  const goalsWithTelemetry = useMemo(() => {
    return goals.map((g) => ({
      ...g,
      telemetry: getProgressTelemetry(g),
    }));
  }, [goals]);

  const filteredGoals = useMemo(() => {
    if (filter === "COMPLETED") {
      return goalsWithTelemetry.filter((g) => g.telemetry.percent === 100);
    }
    if (filter === "PROGRESS") {
      return goalsWithTelemetry.filter((g) => g.telemetry.percent < 100);
    }
    return goalsWithTelemetry;
  }, [goalsWithTelemetry, filter]);

  const averageCompletion = useMemo(() => {
    if (goalsWithTelemetry.length === 0) return 0;
    const total = goalsWithTelemetry.reduce((acc, g) => acc + g.telemetry.percent, 0);
    return Math.round(total / goalsWithTelemetry.length);
  }, [goalsWithTelemetry]);

  if (isLoading) {
    return <main className="p-6 text-on-surface">Loading...</main>;
  }

  return (
    <div className="flex min-h-screen text-on-surface bg-[#F8FAFC]">
      <AdminEmployeeSidebar active="progress" onSignOut={() => void handleSignOut()} session={session} />

      <div className="ml-64 flex flex-col min-h-screen w-full">
        <AdminEmployeeTopBar title={ADMIN_EMPLOYEE_HEADERS.progress} />

        <main className="p-page-padding space-y-section-gap max-w-[1200px] w-full mx-auto">
          {/* Header Dashboard Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Metric 1: Overall Progress Circle */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between col-span-1 md:col-span-2">
              <div>
                <h3 className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
                  Overall Completion
                </h3>
                <p className="text-body-sm text-secondary mt-1">
                  Average progress weighted across all goals in current sheet
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-4xl font-extrabold text-primary">{averageCompletion}%</span>
                  <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-200">
                    On track
                  </span>
                </div>
              </div>
              {/* Telemetry Radial Mock */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(#0066cc 0% ${averageCompletion}%, #e2e8f0 ${averageCompletion}% 100%)`,
                  }}
                ></div>
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-on-surface">{averageCompletion}%</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Completed Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <h3 className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
                Completed Goals
              </h3>
              <div className="flex items-baseline mt-4 gap-2">
                <span className="text-3xl font-extrabold text-on-surface">
                  {goalsWithTelemetry.filter((g) => g.telemetry.percent === 100).length}
                </span>
                <span className="text-secondary text-sm">/ {goals.length}</span>
              </div>
              <p className="text-body-sm text-secondary mt-2">100% target met</p>
            </div>

            {/* Metric 3: Active Reviews Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <h3 className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
                Review Status
              </h3>
              <div className="flex items-baseline mt-4 gap-2">
                <span className="text-3xl font-extrabold text-on-surface">
                  {goals.length > 0 ? "Active" : "None"}
                </span>
              </div>
              <p className="text-body-sm text-secondary mt-2">
                {goals.length > 0 ? "Goal Sheet submitted for Q1" : "No active goals in review"}
              </p>
            </div>
          </div>

          {/* Interactive Filters & Telemetry List */}
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold">Goal Progress Telemetry</h3>
                <p className="text-body-sm text-secondary mt-0.5">
                  Track actual values against key strategic thresholds
                </p>
              </div>
              {/* Styled Tabs */}
              <div className="flex bg-[#F1F5F9] p-1 rounded-lg border border-outline-variant">
                <button
                  onClick={() => setFilter("ALL")}
                  className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all ${
                    filter === "ALL" ? "bg-white text-primary shadow-sm font-semibold" : "text-secondary hover:text-on-surface"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("PROGRESS")}
                  className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all ${
                    filter === "PROGRESS" ? "bg-white text-primary shadow-sm font-semibold" : "text-secondary hover:text-on-surface"
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter("COMPLETED")}
                  className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-all ${
                    filter === "COMPLETED" ? "bg-white text-primary shadow-sm font-semibold" : "text-secondary hover:text-on-surface"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Telemetry Progress Bars */}
            <div className="p-6 space-y-6">
              {filteredGoals.length > 0 ? (
                filteredGoals.map((g, idx) => (
                  <div key={g.id} className="p-5 border border-outline-variant rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            g.uom === "MIN" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            g.uom === "MAX" ? "bg-red-100 text-red-700 border-red-200" :
                            g.uom === "ZERO" ? "bg-green-100 text-green-700 border-green-200" :
                            "bg-purple-100 text-purple-700 border-purple-200"
                          }`}>
                            {g.uom}
                          </span>
                          <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">
                            {g.thrustArea}
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
                          {g.title}
                        </h4>
                        <p className="text-body-sm text-secondary mt-0.5">{g.description}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-bold border ${
                          g.telemetry.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                          g.telemetry.status === "On Track" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {g.telemetry.status}
                        </span>
                        <div className="text-sm font-extrabold text-on-surface mt-2">
                          Actual: <span className="text-primary font-black">{g.telemetry.actual}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Slider Track */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-secondary">
                        <span>Planned Target: {g.target || "N/A"}</span>
                        <span>{g.telemetry.percent}% Complete</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            g.telemetry.percent === 100
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-primary to-blue-500"
                          }`}
                          style={{ width: `${g.telemetry.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-secondary">
                  {isFetching ? "Refreshing progress data..." : "No goals match selected filter."}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
