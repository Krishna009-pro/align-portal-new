"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { useWizardStore } from "@/store/wizardStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function GoalCreationStep3() {
  const router = useRouter();
  const { goals, prevStep, resetWizard } = useWizardStore();
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalWeightage = useMemo(
    () => goals.reduce((sum, goal) => sum + (goal.weightage || 0), 0),
    [goals],
  );

  const submitGoals = async () => {
    if (!session?.userId) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const submittedGoals = goals.map((g) => ({
      ...g,
      status: "submitted",
    }));

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.userId,
          goals: submittedGoals,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string; message?: string };
        throw new Error(payload.message ?? payload.error ?? "Failed to submit goals");
      }

      resetWizard();
      router.push("/goals");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit goals");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <div className="bg-[#F8FAFC] font-body-md text-on-surface min-h-screen flex flex-col">
      <header className="h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-page-padding sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary">Align</h1>
          <p className="text-secondary font-bold">Review and Submit Goal Sheet</p>
        </div>
      </header>

      <main className="p-page-padding max-w-[1280px] mx-auto w-full space-y-section-gap">
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
          <h2 className="font-headline-lg text-headline-lg mb-2 font-bold">Step 3 - Review and Submit</h2>
          <p className="text-secondary">
            Validate all goals before submission. This will save your goal sheet to Firebase.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-bold">#</th>
                <th className="px-6 py-4 font-bold">Thrust Area</th>
                <th className="px-6 py-4 font-bold">Goal Title</th>
                <th className="px-6 py-4 font-bold">UoM</th>
                <th className="px-6 py-4 font-bold">Target</th>
                <th className="px-6 py-4 text-right font-bold">Weightage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {goals.map((goal, index) => (
                <tr key={goal.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-secondary text-sm">{goal.thrustArea}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{goal.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${goal.uom === "MIN" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        goal.uom === "MAX" ? "bg-red-100 text-red-700 border-red-200" :
                          goal.uom === "ZERO" ? "bg-green-100 text-green-700 border-green-200" :
                            "bg-purple-100 text-purple-700 border-purple-200"
                      }`}>
                      {goal.uom}
                    </span>
                  </td>
                  <td className="px-6 py-4">{goal.target}</td>
                  <td className="px-6 py-4 text-right font-bold">{goal.weightage}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-secondary-container text-on-secondary-container">
                <td className="px-6 py-4 text-right font-bold" colSpan={5}>
                  Total Weightage:
                </td>
                <td className="px-6 py-4 text-right font-extrabold">{totalWeightage}%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {submitError ? (
          <div className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-error">{submitError}</div>
        ) : null}

        <div className="flex items-center justify-between pt-6 border-t border-outline-variant">
          <button
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-primary text-primary rounded-lg font-bold hover:bg-primary-fixed active:scale-95 transition-all"
          >
            Back to Edit
          </button>
          <div className="flex items-center gap-3">
            <Link href="/goals" className="text-secondary hover:text-primary font-bold">
              Cancel
            </Link>
            <button
              onClick={() => void submitGoals()}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 disabled:opacity-60 font-bold active:scale-95 transition-all"
            >
              {submitting ? "Submitting..." : "Submit for Approval"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
