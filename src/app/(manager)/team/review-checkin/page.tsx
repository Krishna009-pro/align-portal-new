"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewCheckinPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* SideNavBar (Shared Component) */}
      <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container dark:bg-surface-dim border-r border-outline-variant dark:border-outline flex flex-col py-page-padding space-y-stack-gap">
        <div className="px-6 mb-8">
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
            Align
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold">
            Enterprise Portal
          </p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors rounded-lg group"
            href="/team"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors rounded-lg group"
            href="/team/review-goals"
          >
            <span className="material-symbols-outlined">ads_click</span>
            <span className="font-label-md text-label-md">My Team Goals</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container border-l-4 border-primary-fixed-dim rounded-r-lg font-bold"
            href="/team/review-checkin"
          >
            <span className="material-symbols-outlined">fact_check</span>
            <span className="font-label-md text-label-md">Check-in Reviews</span>
          </Link>
        </nav>
        <div className="mt-auto px-3 space-y-1 pt-4 border-t border-outline-variant">
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors rounded-lg group"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Support</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high transition-colors rounded-lg group"
            href="/login"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* TopAppBar (Shared Component) */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-30 h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline shadow-sm flex justify-between items-center px-page-padding">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-sm focus:ring-2 focus:ring-primary"
              placeholder="Search portal..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="hover:bg-surface-container-low dark:hover:bg-surface-variant rounded-full p-2 transition-opacity active:opacity-70">
              <span className="material-symbols-outlined text-on-surface-variant">
                notifications
              </span>
            </button>
            <button className="hover:bg-surface-container-low dark:hover:bg-surface-variant rounded-full p-2 transition-opacity active:opacity-70">
              <span className="material-symbols-outlined text-on-surface-variant">
                help
              </span>
            </button>
            <button className="hover:bg-surface-container-low dark:hover:bg-surface-variant rounded-full p-2 transition-opacity active:opacity-70">
              <span className="material-symbols-outlined text-on-surface-variant">
                apps
              </span>
            </button>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs overflow-hidden">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVHyRgdpusXmfb2wS_I-2pMurjC3C6LKgPdx-NDUsAqLkWMWVv1SGsLHwXiMWf95XR5NtomWBaxT26QQi7Ty_psHmGapZGx1c6NH_NdsDJWU0c2PuZ3JAai8SaqgtASJ1i6pgBh0CTmKgOa8AIHqTyeT7nIFGuvjx1jz5HXAjJ08Zt2frHvKrMmOMV4HLZFPqZcPZvT2wD-KP7VNvN5iWvCo7gVJkpAaulAXHqQm8bsxxxKnm3JK61fnpdtjiJyizoX-_zaMK3Es"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-16 p-page-padding min-h-screen">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-label-md font-label-md text-outline">
          <Link className="hover:text-primary transition-colors" href="/team">Dashboard</Link>
          <span className="material-symbols-outlined text-sm mx-2">
            chevron_right
          </span>
          <Link className="hover:text-primary transition-colors" href="/team/review-checkin">Check-in Reviews</Link>
          <span className="material-symbols-outlined text-sm mx-2">
            chevron_right
          </span>
          <span>Rahul Mehta</span>
          <span className="material-symbols-outlined text-sm mx-2 text-primary">
            chevron_right
          </span>
          <span className="text-primary font-bold">Q1 Review</span>
        </nav>

        {/* Employee Progress Header Card */}
        <section className="bg-white rounded-lg border border-outline-variant shadow-sm p-6 mb-section-gap grid grid-cols-12 items-center">
          <div className="col-span-4 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-secondary-container text-primary flex items-center justify-center text-headline-lg font-bold">
              RM
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Rahul Mehta
              </h2>
              <p className="font-body-md text-body-md text-outline">
                Sales Department
              </p>
            </div>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center border-x border-outline-variant px-8">
            <div className="relative flex items-center justify-center h-24 w-24">
              <svg className="h-24 w-24 -rotate-90 origin-center">
                <circle
                  className="text-surface-container-high"
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-[#D97706]"
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset="58"
                  strokeWidth="8"
                ></circle>
              </svg>
              <span className="absolute font-headline-lg text-headline-lg text-[#D97706]">
                76.8%
              </span>
            </div>
            <p className="font-label-md text-label-md text-outline mt-2">
              Overall Q1 Achievement
            </p>
          </div>
          <div className="col-span-4 pl-12 space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                calendar_today
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Q1 Window: <span className="font-semibold">Jul 2025</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                update
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Last Updated: <span className="font-semibold">15 Jul 2025</span>
              </span>
            </div>
          </div>
        </section>

        {/* Main Table Card */}
        <section className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden mb-section-gap">
          <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Q1 Check-in — Planned vs Actual
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest text-left text-label-md font-label-md text-outline border-b border-outline-variant">
                  <th className="px-6 py-4 font-bold">Goal Title</th>
                  <th className="px-4 py-4 font-bold">UoM</th>
                  <th className="px-4 py-4 font-bold">Target</th>
                  <th className="px-4 py-4 font-bold">Actual</th>
                  <th className="px-4 py-4 font-bold">Score</th>
                  <th className="px-4 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Manager Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                    Revenue Target
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-secondary-container text-primary font-label-sm text-label-sm">
                      MIN
                    </span>
                  </td>
                  <td className="px-4 py-4 font-body-md">₹50L</td>
                  <td className="px-4 py-4 font-body-md">₹42L</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-[#D97706] font-label-sm text-label-sm font-bold border border-amber-200">
                      84%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-[#D97706] font-label-sm text-label-sm font-bold border border-amber-200">
                      On Track
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary"
                        rows={2}
                        defaultValue="Good progress. Push harder in Q2."
                      ></textarea>
                      <button className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all">
                        Save Comment
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                    Customer TAT
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-error-container text-error font-label-sm text-label-sm">
                      MAX
                    </span>
                  </td>
                  <td className="px-4 py-4 font-body-md">3 days</td>
                  <td className="px-4 py-4 font-body-md">2.5 days</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      100%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary"
                        placeholder="Add your check-in comment..."
                        rows={2}
                      ></textarea>
                      <button className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all">
                        Save Comment
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                    Safety Incidents
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-green-100 text-[#15803d] font-label-sm text-label-sm">
                      ZERO
                    </span>
                  </td>
                  <td className="px-4 py-4 font-body-md">0</td>
                  <td className="px-4 py-4 font-body-md">0</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      100%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary"
                        rows={2}
                        defaultValue="Excellent. Zero incidents maintained."
                      ></textarea>
                      <button className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all">
                        Save Comment
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                    Training Completion
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-tertiary-fixed text-tertiary font-label-sm text-label-sm">
                      TIMELINE
                    </span>
                  </td>
                  <td className="px-4 py-4 font-body-md text-outline">
                    30-Jun
                  </td>
                  <td className="px-4 py-4 font-body-md">28-Jun</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      100%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-[#15803d] font-label-sm text-label-sm font-bold border border-green-200">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary"
                        placeholder="Add your check-in comment..."
                        rows={2}
                      ></textarea>
                      <button className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all">
                        Save Comment
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                    Defect Rate
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-error-container text-error font-label-sm text-label-sm">
                      MAX
                    </span>
                  </td>
                  <td className="px-4 py-4 font-body-md">2%</td>
                  <td className="px-4 py-4 font-body-md">—</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-[#dc2626] font-label-sm text-label-sm font-bold border border-red-200">
                      0%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-[#dc2626] font-label-sm text-label-sm font-bold border border-red-200">
                      Not Started
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary border-[#dc2626]/40"
                        rows={2}
                        defaultValue="Please update this ASAP."
                      ></textarea>
                      <button className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all">
                        Save Comment
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Card: Check-in Summary */}
        <section className="bg-white rounded-lg border border-outline-variant shadow-sm p-6 grid grid-cols-2 items-center">
          <div className="flex items-center gap-12 pl-6">
            <div className="relative h-32 w-32 flex items-center justify-center">
              {/* Donut Chart */}
              <svg className="h-32 w-32 -rotate-90 origin-center" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="40"
                  stroke="#e8e7f3"
                  strokeWidth="12"
                ></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="40"
                  stroke="#D97706"
                  strokeDasharray="251.2"
                  strokeDashoffset="58"
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-lg font-bold text-on-surface">
                  76.8%
                </span>
                <span className="text-[10px] text-outline font-bold uppercase tracking-tight">
                  Success
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-headline-md text-headline-md text-on-surface">
                Review Status
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#15803d]"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Completed: <span className="font-bold">3/5</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#D97706]"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    On Track: <span className="font-bold">1/5</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#dc2626]"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Not Started: <span className="font-bold">1/5</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 pr-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-64 bg-[#15803d] text-white py-3 rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">verified</span>
              Mark Check-in Complete
            </button>
            <button className="w-64 border border-outline text-on-surface py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Export as PDF
            </button>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-outline-variant transform scale-100 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-3xl text-green-600">
                verified
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Check-in Completed
              </h3>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-6">
              Rahul Mehta's Q1 check-in review has been successfully marked as completed. The audit history has been updated.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => router.push('/team')}
                className="px-6 py-2.5 rounded-lg font-label-md text-label-md text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
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
