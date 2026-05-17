import { useWizardStore } from '@/store/wizardStore';
import Link from 'next/link';
import {
  ADMIN_EMPLOYEE_HEADERS,
  ADMIN_EMPLOYEE_LABELS,
  ADMIN_EMPLOYEE_ROUTES,
} from "@/lib/admin-employee-ui";

export default function GoalCreationStep2() {
  const {
    goals,
    updateGoal,
    autoBalance,
    nextStep,
    prevStep,
  } = useWizardStore();

  const totalWeightage = goals.reduce((sum, g) => sum + (g.weightage || 0), 0);
  const allValid = goals.every((g) => (g.weightage || 0) >= 10);
  const canProceed = totalWeightage === 100 && allValid;

  const handleWeightageChange = (id: string, val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const num = cleanVal ? parseInt(cleanVal, 10) : 0;
    updateGoal(id, { weightage: Math.min(num, 100) });
  };

  const handleNext = () => {
    if (!canProceed) {
      alert("Please adjust weightages so they sum to exactly 100% and each goal has at least 10% weightage before moving forward.");
      return;
    }
    nextStep();
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1a1b23]">
      {/* SideNavBar */}
      <aside className="w-64 bg-surface dark:bg-surface-dim border-r border-outline-variant dark:border-outline h-screen fixed left-0 top-0 z-40 flex flex-col py-page-padding">
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
        <nav className="flex-1 px-3 space-y-1">
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-all group"
            href={ADMIN_EMPLOYEE_ROUTES.dashboard}
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.dashboard}</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container border-l-4 border-primary dark:border-primary-fixed transition-all"
            href={ADMIN_EMPLOYEE_ROUTES.goals}
          >
            <span
              className="material-symbols-outlined"
              data-icon="target"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              target
            </span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.goals}</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-all group"
            href={ADMIN_EMPLOYEE_ROUTES.checkIns}
          >
            <span className="material-symbols-outlined" data-icon="event_note">
              event_note
            </span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.checkIns}</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-all group"
            href={ADMIN_EMPLOYEE_ROUTES.progress}
          >
            <span className="material-symbols-outlined" data-icon="monitoring">
              monitoring
            </span>
            <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.progress}</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 border-t border-outline-variant pt-4 mx-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              className="w-10 h-10 rounded-full border border-outline-variant"
              alt="Rahul Mehta profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAswnJV1Cz3NMIU4JQFxo8tYueWlrPafqE32hjfeb1vHejsjkANgmbeNAU1Jbe7IiirbsXsc7SKtw4YR70Wz70Ls-AocRZ1JEqRxwf3Pz5-73b_em5725iCiK9lIsgasC987WrqULn75QAJ2mk2gSeWSZEgpuA5VjzsSYO-dHbS_553ctCEklOXmR8sGy6nl2nUp5miCzEyM4SEUiE8Jx3izumToOTXSne-IUgkIoA78XijCl0PiDeakItbEy9eytE57aSTZYltkrU"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Rahul Mehta
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container w-max">
                EMPLOYEE
              </span>
            </div>
          </div>
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container transition-colors"
            href="/login"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="font-label-md text-label-md">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* TopAppBar */}
        <header className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline h-16 flex justify-between items-center px-page-padding sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
              {ADMIN_EMPLOYEE_HEADERS.goals}
            </h1>
            <span className="badge-base bg-green-100 text-green-700 rounded-full px-3 py-1 flex items-center gap-1.5 font-bold uppercase text-[11px]">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Goal Setting Window Open
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-secondary hover:bg-surface-container rounded-full relative">
              <span
                className="material-symbols-outlined"
                data-icon="notifications"
              >
                notifications
              </span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button className="p-2 text-secondary hover:bg-surface-container rounded-full">
              <span
                className="material-symbols-outlined"
                data-icon="help_outline"
              >
                help_outline
              </span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-page-padding max-w-[1200px] mx-auto w-full flex-1">
          {/* Wizard Step Indicator */}
          <div className="flex items-center justify-center mb-section-gap">
            <div className="flex items-center w-full max-w-2xl">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-2">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="check"
                  >
                    check
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-green-700">
                  Goal Definition
                </span>
              </div>
              <div className="h-0.5 flex-1 bg-green-600 -mt-6"></div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2 ring-4 ring-primary-fixed">
                  <span className="font-label-md text-label-md">2</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  Targets & Weightage
                </span>
              </div>
              <div className="h-0.5 flex-1 bg-outline-variant -mt-6"></div>
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center mb-2">
                  <span className="font-label-md text-label-md">3</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary">
                  Review & Submit
                </span>
              </div>
            </div>
          </div>

          {/* Main Instruction Card */}
          <div className="bg-white border border-outline-variant rounded-lg shadow-sm p-card-padding mb-6">
            <h2 className="font-headline-md text-headline-md mb-1 font-bold">
              Step 2 — Set Targets & Weightage
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Define the target value and weightage for each goal. Total
              weightage must equal exactly 100%.
            </p>
          </div>

          {/* Goals Table */}
          <div className="bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-4 font-label-md text-label-md text-on-surface w-12 text-center font-bold">
                    #
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface font-bold">
                    Goal Title
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface font-bold">
                    UoM Type
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface font-bold">
                    Target
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface w-36 font-bold">
                    Weightage
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface w-40 font-bold">
                    Validation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {goals.map((goal, index) => (
                  <tr key={goal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-body-md text-body-md text-center">{index + 1}</td>
                    <td className="p-4 font-body-md text-body-md font-semibold text-on-surface">
                      <div>
                        <p className="text-secondary text-[10px] uppercase font-bold tracking-wider">{goal.thrustArea}</p>
                        <p>{goal.title}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${
                        goal.uom === "MIN" ? "bg-blue-100 text-blue-700" :
                        goal.uom === "MAX" ? "bg-red-100 text-red-700" :
                        goal.uom === "ZERO" ? "bg-green-100 text-green-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>
                        {goal.uom}
                      </span>
                    </td>
                    <td className="p-4">
                      {goal.uom === "ZERO" ? (
                        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded border border-outline-variant opacity-60">
                          <span className="font-body-md text-body-md">
                            0 (auto)
                          </span>
                          <span
                            className="material-symbols-outlined text-sm"
                            data-icon="lock"
                          >
                            lock
                          </span>
                        </div>
                      ) : (
                        <input
                          className="rounded-md border border-outline-variant px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary focus:outline-none"
                          type="text"
                          value={goal.target || ""}
                          onChange={(e) => updateGoal(goal.id, { target: e.target.value })}
                          placeholder={
                            goal.uom === "TIMELINE" ? "e.g. 30-Jun-2025" :
                            goal.uom === "MIN" ? "e.g. ₹50,00,000" : "e.g. 3 days"
                          }
                        />
                      )}
                    </td>
                    <td className="p-4">
                      <input
                        className="rounded-md border border-outline-variant px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary focus:outline-none"
                        type="text"
                        value={goal.weightage !== undefined ? `${goal.weightage}%` : "0%"}
                        onChange={(e) => handleWeightageChange(goal.id, e.target.value)}
                      />
                    </td>
                    <td className="p-4">
                      {(goal.weightage || 0) >= 10 ? (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <span
                            className="material-symbols-outlined text-green-600"
                            data-icon="check_circle"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span className="font-label-sm text-[10px] leading-none font-bold">
                            VALID
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1 text-tertiary">
                            <span
                              className="material-symbols-outlined text-[18px]"
                              data-icon="warning"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              warning
                            </span>
                            <span className="font-label-sm text-[10px] leading-none font-bold">
                              WARNING
                            </span>
                          </div>
                          <span className="font-label-sm text-[10px] text-tertiary whitespace-nowrap">
                            Min 10% required
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Weightage Summary Panel */}
          <div className="bg-white border border-outline-variant shadow-sm rounded-lg p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md flex items-center gap-2 font-bold">
                  Current total: {totalWeightage}%
                  {totalWeightage < 100 && (
                    <span className="text-tertiary font-medium text-body-md">
                      — {100 - totalWeightage}% still unallocated
                    </span>
                  )}
                  {totalWeightage > 100 && (
                    <span className="text-error font-medium text-body-md">
                      — {totalWeightage - 100}% over-allocated
                    </span>
                  )}
                  {totalWeightage === 100 && (
                    <span className="text-green-600 font-medium text-body-md">
                      — Perfect allocation! ✓
                    </span>
                  )}
                </span>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  Goal weightage must equal exactly 100% to proceed to the
                  review stage.
                </p>
              </div>
              <button
                onClick={autoBalance}
                className="px-4 py-2 border border-primary text-primary font-label-md rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2 active:scale-95"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="magic_button"
                >
                  magic_button
                </span>
                Auto-balance
              </button>
            </div>
            <div className="w-full bg-outline-variant h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${Math.min(totalWeightage, 100)}%` }}
              ></div>
              {totalWeightage < 100 && (
                <div
                  className="bg-tertiary-fixed h-full transition-all duration-500"
                  style={{ width: `${100 - totalWeightage}%` }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="mt-auto bg-surface border-t border-outline-variant p-6 flex flex-col items-end gap-2 sticky bottom-0">
          <div className="flex items-center gap-4">
            <button
              onClick={prevStep}
              className="px-6 py-2.5 border border-outline text-on-surface font-label-md rounded-lg hover:bg-surface-container transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 font-label-md rounded-lg flex items-center gap-2 active:scale-95 transition-all shadow-md ${
                canProceed
                  ? "bg-primary text-on-primary hover:bg-primary-container"
                  : "bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed"
              }`}
            >
              Next: Review
              <span
                className="material-symbols-outlined text-[18px]"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
          <p className={`font-label-sm ${canProceed ? "text-green-600" : "text-tertiary"}`}>
            {canProceed
              ? "Weightage allocated correctly (100% total)"
              : `Please allocate exactly 100% total weightage and ensure each goal is at least 10% (current: ${totalWeightage}%)`}
          </p>
        </footer>
      </main>
    </div>
  );
}
