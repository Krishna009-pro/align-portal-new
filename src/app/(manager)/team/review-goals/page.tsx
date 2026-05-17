"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const mockGoals = [
  { id: 1, area: "Sales", title: "Achieve Revenue Target", uom: "MIN", target: "₹50,00,000", weight: "30%", color: "text-primary", uomColor: "bg-primary/10 text-primary" },
  { id: 2, area: "Operations", title: "Reduce Customer TAT", uom: "MAX", target: "3 days", weight: "25%", color: "text-tertiary", uomColor: "bg-error/10 text-error" },
  { id: 3, area: "Compliance", title: "Zero Safety Incidents", uom: "ZERO", target: "0", weight: "20%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
  { id: 4, area: "HR", title: "Training Completion", uom: "TIMELINE", target: "30-Jun-2025", weight: "15%", color: "text-purple-700", uomColor: "bg-purple-100 text-purple-700" },
  { id: 5, area: "Quality", title: "Reduce Defect Rate", uom: "MAX", target: "2%", weight: "10%", color: "text-red-700", uomColor: "bg-error/10 text-error" },
];

function GoalRow({ goal }: { goal: typeof mockGoals[0] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [target, setTarget] = useState(goal.target);
  const [weight, setWeight] = useState(goal.weight);

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-4 text-secondary">{goal.id}</td>
      <td className={`px-5 py-4 font-medium ${goal.color}`}>{goal.area}</td>
      <td className="px-5 py-4">{goal.title}</td>
      <td className="px-5 py-4">
        <span className={`${goal.uomColor} px-2 py-0.5 rounded font-label-md text-[10px] font-bold`}>
          {goal.uom}
        </span>
      </td>
      <td className="px-5 py-4">
        {isEditing ? (
          <input
            autoFocus
            className="w-full bg-blue-50 border-primary border-2 rounded px-2 py-1.5 focus:outline-none focus:ring-0 text-on-surface font-semibold shadow-inner"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span>{target}</span>
        )}
      </td>
      <td className="px-5 py-4">
        {isEditing ? (
          <input
            className="w-full border-outline-variant border rounded px-2 py-1.5 focus:border-primary focus:ring-0 text-on-surface"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span>{weight}</span>
        )}
      </td>
      <td className="px-5 py-4 text-right">
        <button 
          className="text-secondary hover:text-primary"
          onClick={() => setIsEditing(true)}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>
    </tr>
  );
}

export default function ReviewGoalsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<"approve" | "rework" | null>(null);

  return (
    <div className="text-on-background antialiased overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-surface dark:bg-surface-dim border-r border-outline-variant dark:border-outline flex flex-col py-6 z-50">
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
              <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
                Align Enterprise
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-secondary font-bold">
                Global Strategy
              </p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3">
            <Link
              className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-all"
              href="/team"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container border-l-4 border-primary-fixed rounded-r-lg font-label-md text-label-md transition-all"
              href="/team/review-goals"
            >
              <span className="material-symbols-outlined">ads_click</span>
              <span>My Team Goals</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md transition-all"
              href="/team/review-checkin"
            >
              <span className="material-symbols-outlined">fact_check</span>
              <span>Check-in Reviews</span>
            </Link>
          </nav>
          <div className="px-3 pt-6 border-t border-outline-variant space-y-1">
            <Link
              className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">help</span>
              <span>Support</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md"
              href="/login"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-slate-50">
          {/* Top App Bar */}
          <header className="bg-surface border-b border-outline-variant h-16 flex items-center justify-between px-page-padding shrink-0 z-40">
            <div className="flex items-center gap-4">
              <h2 className="font-headline-lg text-headline-lg font-extrabold text-primary">
                Manager Dashboard
              </h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Q1 Window Open
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                <img
                  alt="Manager profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY658XNjl5W65BtukzLj8zvEQbGoe62xfBrb3_SdqgBTIfLDeN3eNSkf6fJM33KQbaB_LLbmiOHMV8Qjc1k_QK99VydUcLPYBfD-N-Lvm13yno_FBdgARVoP9TLZPkpbtqbBemqekb_tOsPl2b-yjodTZ-mdyeFQHA_49VTjvwzsbCdzC5BiuPw-qAzC_uy0ig6KHW41moU5lViwIhBCWtJlMAwvJAm4UZA1h-o22-Jb66RfUJ7iCXWHJtfAu7g5rstmh5xLL8rl0"
                />
              </div>
            </div>
          </header>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-page-padding space-y-6 pb-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-secondary font-label-md text-label-md">
              <Link className="hover:text-primary" href="/team">
                Dashboard
              </Link>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <Link className="hover:text-primary" href="/team">
                My Team
              </Link>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <Link className="hover:text-primary" href="#">
                Rahul Mehta
              </Link>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="text-on-surface font-semibold">
                Goal Sheet Review
              </span>
            </nav>

            {/* Employee Info Card */}
            <section className="bg-white rounded-lg border border-outline-variant shadow-sm p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-headline-md shadow-inner">
                  RM
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Rahul Mehta
                  </h3>
                  <p className="font-body-md text-body-md text-secondary">
                    Sales Department · Reports to:{" "}
                    <span className="font-medium">Priya Kapoor</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-label-md text-label-md text-secondary">
                    Submitted: 28 Apr 2025
                  </span>
                  <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-label-md text-label-md">
                    FY 2025-26 — Goal Setting
                  </span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-label-md text-label-md font-bold">
                  5 Goals · 100% Weightage
                </span>
              </div>
            </section>

            {/* Main Content Card */}
            <section className="bg-white rounded-lg border border-outline-variant shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-white">
                <h4 className="font-headline-md text-headline-md text-on-surface">
                  Goal Sheet Review —{" "}
                  <span className="text-primary font-medium">
                    Inline Editing Enabled
                  </span>
                </h4>
              </div>
              <div className="p-5 bg-amber-50 border-b border-amber-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600">
                  info
                </span>
                <p className="font-body-md text-body-md text-amber-800">
                  You can edit Target and Weightage directly in the table. All
                  edits are logged to the audit trail for compliance and tracking.
                </p>
              </div>

              {/* Editable Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-secondary font-label-md text-label-md border-b border-outline-variant">
                      <th className="px-5 py-3 w-12">#</th>
                      <th className="px-5 py-3">Thrust Area</th>
                      <th className="px-5 py-3 w-1/3">Goal Title</th>
                      <th className="px-5 py-3">UoM</th>
                      <th className="px-5 py-3">Target</th>
                      <th className="px-5 py-3 w-28">Weightage</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
                    {mockGoals.map(goal => <GoalRow key={goal.id} goal={goal} />)}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-outline-variant flex justify-end items-center">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-secondary">
                    Total Weightage:
                  </span>
                  <span className="font-headline-md text-headline-md text-green-700">
                    100% ✓
                  </span>
                </div>
              </div>
            </section>

            {/* Manager Notes Section */}
            <section className="bg-white rounded-lg border border-outline-variant shadow-sm p-5 space-y-3">
              <label
                className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
                htmlFor="manager-notes"
              >
                Rejection Reason / Notes
              </label>
              <textarea
                className="w-full border-outline-variant border rounded-lg p-4 focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                id="manager-notes"
                placeholder="Add feedback for the employee here. This will be visible if goals are returned for rework."
                rows={4}
              ></textarea>
            </section>
          </div>

          {/* Bottom Action Bar */}
          <footer className="fixed bottom-0 left-64 right-0 h-20 bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-page-padding flex items-center justify-between z-40">
            <div className="flex-1">
              <Link
                className="flex items-center gap-1.5 text-primary hover:underline font-label-md text-label-md"
                href="/team"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Back to Team
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => setShowModal("rework")}
                className="px-6 py-2.5 border border-error text-error font-label-md text-label-md rounded-lg hover:bg-error/5 transition-colors"
              >
                Return for Rework
              </button>
            </div>
            <div className="flex-1 flex flex-col items-end gap-1">
              <button
                onClick={() => setShowModal("approve")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-headline-md text-headline-md flex items-center gap-2 shadow-lg shadow-green-200 transition-all active:scale-95"
              >
                Approve Goal Sheet
                <span className="material-symbols-outlined">check_circle</span>
              </button>
              <p className="font-label-sm text-label-sm text-secondary">
                Goals will be locked and employee notified
              </p>
            </div>
          </footer>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-outline-variant transform scale-100 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <span className={`material-symbols-outlined text-3xl ${showModal === 'approve' ? 'text-green-600' : 'text-error'}`}>
                {showModal === 'approve' ? 'check_circle' : 'assignment_return'}
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {showModal === 'approve' ? 'Goals Approved Successfully' : 'Returned for Rework'}
              </h3>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-6">
              {showModal === 'approve' 
                ? "Rahul Mehta's goal sheet has been approved and locked. The employee has been notified." 
                : "The goal sheet has been returned for rework with your feedback. The employee has been notified."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => router.push('/team')}
                className={`px-6 py-2.5 rounded-lg font-label-md text-label-md text-white transition-all ${
                  showModal === 'approve' ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200' : 'bg-error hover:bg-error-container text-on-error hover:text-on-error-container'
                }`}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
