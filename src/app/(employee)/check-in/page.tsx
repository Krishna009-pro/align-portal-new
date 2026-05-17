"use client";
import { useState } from "react";
import Link from "next/link";

export default function Q1CheckInPage() {
  const [activeQuarter, setActiveQuarter] = useState("Q1");
  return (
    <div className="bg-[#F8FAFC] text-on-background min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant flex flex-col py-6 z-50">
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
        <nav className="flex-1 space-y-1 px-3">
          <Link
            className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all font-label-md text-label-md"
            href="/"
          >
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all font-label-md text-label-md"
            href="/goals"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              ads_click
            </span>{" "}
            My Goals
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2 bg-primary text-on-primary border-l-4 border-primary-fixed rounded-r-lg shadow-sm font-label-md text-label-md"
            href="/check-in"
          >
            <span className="material-symbols-outlined">fact_check</span>{" "}
            Check-ins
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all font-label-md text-label-md"
            href="#"
          >
            <span className="material-symbols-outlined">trending_up</span>{" "}
            My Progress
          </Link>
        </nav>
        <div className="px-6 mt-auto">
          <div className="space-y-1 border-t border-outline-variant pt-4">
            <Link
              className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">help</span> Support
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg font-label-md text-label-md"
              href="/login"
            >
              <span className="material-symbols-outlined">logout</span> Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* TopNavBar */}
        <header className="h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-page-padding sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-[20px]">
                search
              </span>
              <input
                className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64"
                placeholder="Search..."
                type="text"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                className="font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                href="/"
              >
                Dashboard
              </Link>
              <Link
                className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1"
                href="#"
              >
                Strategy
              </Link>
              <Link
                className="font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                href="#"
              >
                Performance
              </Link>
              <Link
                className="font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                href="#"
              >
                Teams
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
              New Goal
            </button>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB000gs4VhIpYc10l8WpFjPX0ktdb_6I0WFtWWGG-_PaU4oQk_VeOzW84A10t6cdBBgQ7jo-G0z0Udx_7BjQgOhv3cKPk_9uuqx6v4sk-woZiWFZUOialmOGKOXQ9ttq9xjTbD-fvG1z3I1pRn74wlgteEtcWGwk6SDYms7OUnZgSXM5JvwvccCCpplW2PySKvgCxPoEyabnzdS1QQAWUUUy5GFr2SlO5Mrkw4eUux8c4NlNuZ8byV0JDMMpFBxykBi0pHAwcROms"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-page-padding max-w-[1280px] mx-auto w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Q1 Check-in — July 2025
              </h2>
              <div className="flex items-center gap-2">
                {["Q1", "Q2", "Q3", "Q4"].map((q) => {
                  const isActive = activeQuarter === q;
                  const isLocked = q !== "Q1";
                  return (
                    <button
                      key={q}
                      onClick={() => setActiveQuarter(q)}
                      className={`px-5 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all ${
                        isActive
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-high text-secondary hover:bg-surface-container-highest"
                      }`}
                    >
                      {q} {isLocked ? "— Locked" : "— Active"}
                      {isLocked && (
                        <span className="material-symbols-outlined text-[16px]">
                          lock
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {activeQuarter === "Q1" ? (
            <>

          {/* Info Banner */}
          <div className="bg-secondary-container/30 border border-secondary-container p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="font-body-md text-body-md text-on-secondary-container">
              Q1 check-in window is open:{" "}
              <span className="font-semibold">1 Jul – 31 Jul 2025</span>. Log
              your actual achievements against planned targets.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            {/* Main Goals Card */}
            <div className="xl:col-span-3 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  My Goals — Q1 Progress Update
                </h3>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    history
                  </span>{" "}
                  View History
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                        Goal Title
                      </th>
                      <th className="px-3 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                        UoM
                      </th>
                      <th className="px-4 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                        Planned Target
                      </th>
                      <th className="px-4 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                        Actual Achievement
                      </th>
                      <th className="px-4 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                        Status
                      </th>
                      <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant text-right">
                        Progress Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {/* Row 1 */}
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-body-md text-body-md font-medium text-on-surface">
                          Achieve Revenue Target
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">
                          MIN
                        </span>
                      </td>
                      <td className="px-4 py-4 font-body-sm text-body-sm text-secondary">
                        ₹50L
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          type="text"
                          defaultValue="42,00,000"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                          defaultValue="On Track"
                        >
                          <option>On Track</option>
                          <option>At Risk</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                          84%
                        </span>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-body-md text-body-md font-medium text-on-surface">
                          Reduce Customer TAT
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-0.5 rounded bg-error-container/40 text-error text-[10px] font-bold uppercase">
                          MAX
                        </span>
                      </td>
                      <td className="px-4 py-4 font-body-sm text-body-sm text-secondary">
                        3 days
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          type="text"
                          defaultValue="2.5"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                          defaultValue="On Track"
                        >
                          <option>On Track</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold">
                          100%
                        </span>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-body-md text-body-md font-medium text-on-surface">
                          Zero Safety Incidents
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                          ZERO
                        </span>
                      </td>
                      <td className="px-4 py-4 font-body-sm text-body-sm text-secondary">
                        0
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          type="text"
                          defaultValue="0"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                          defaultValue="Completed"
                        >
                          <option>Completed</option>
                          <option>On Track</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold">
                          100%
                        </span>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-body-md text-body-md font-medium text-on-surface">
                          Training Completion
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">
                          TIMELINE
                        </span>
                      </td>
                      <td className="px-4 py-4 font-body-sm text-body-sm text-secondary">
                        30-Jun-2025
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <input
                            className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none pr-8"
                            type="text"
                            defaultValue="28-Jun-2025"
                          />
                          <span className="material-symbols-outlined absolute right-2 top-1.5 text-[18px] text-secondary">
                            calendar_today
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                          defaultValue="Completed"
                        >
                          <option>Completed</option>
                          <option>On Track</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold">
                          100%
                        </span>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-body-md text-body-md font-medium text-on-surface">
                          Reduce Defect Rate
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-0.5 rounded bg-error-container/40 text-error text-[10px] font-bold uppercase">
                          MAX
                        </span>
                      </td>
                      <td className="px-4 py-4 font-body-sm text-body-sm text-secondary">
                        2%
                      </td>
                      <td className="px-4 py-4">
                        <input
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          placeholder="Enter actual..."
                          type="text"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                          defaultValue="Not Started"
                        >
                          <option>Not Started</option>
                          <option>On Track</option>
                          <option>At Risk</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-bold">
                          0%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weighted Score Card */}
            <div className="bg-secondary-container/20 border-2 border-secondary-container rounded-xl p-6 space-y-6 flex flex-col items-center text-center">
              <div className="space-y-1">
                <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">
                  Overall Q1 Progress Score
                </p>
                <h4 className="text-[48px] font-black text-amber-600 leading-none">
                  76.8%
                </h4>
              </div>
              <div className="w-full space-y-2">
                <div className="w-full h-3 bg-outline-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: "76.8%" }}
                  ></div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-secondary">
                  <span>0%</span>
                  <span>Target: 100%</span>
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-secondary-container/30">
                <p className="font-body-sm text-body-sm text-secondary italic">
                  &quot;Score is for tracking only and does not affect your rating&quot;
                </p>
              </div>
              <div className="w-full pt-4 border-t border-secondary-container/30 text-left space-y-3">
                <h5 className="font-label-md text-label-md text-on-surface">
                  Quick Insights
                </h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-body-sm text-secondary">
                    <span className="material-symbols-outlined text-[16px] text-green-600 mt-0.5">
                      check_circle
                    </span>
                    3/5 goals completed
                  </li>
                  <li className="flex items-start gap-2 text-body-sm text-secondary">
                    <span className="material-symbols-outlined text-[16px] text-amber-600 mt-0.5">
                      warning
                    </span>
                    1 goal pending input
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <footer className="bg-white border border-outline-variant rounded-xl p-4 flex justify-between items-center shadow-sm">
            <button className="px-6 py-2 border border-primary text-primary bg-white rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
              Save Draft
            </button>
            <div className="flex items-center gap-4">
              <p className="font-body-sm text-body-sm text-secondary hidden md:block">
                Last saved at 10:42 AM Today
              </p>
              <button className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-label-md text-label-md hover:bg-green-700 active:scale-[0.98] transition-all flex items-center gap-2">
                Submit Q1 Check-in{" "}
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </button>
            </div>
          </footer>
          </>
          ) : (
            <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-secondary text-3xl"
                  data-icon="lock"
                >
                  lock
                </span>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                {activeQuarter} Check-in is Locked
              </h4>
              <p className="font-body-md text-body-md text-secondary max-w-md mx-auto mb-6">
                {"This quarter's check-in window is not yet open. You will be notified when it is time to submit your updates."}
              </p>
            </div>
          )}

          {/* Empty Space at bottom */}
          <div className="h-8"></div>
        </div>
      </main>
    </div>
  );
}
