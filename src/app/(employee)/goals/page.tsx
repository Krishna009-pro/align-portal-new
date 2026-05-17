import Link from "next/link";

export default function EmployeeDashboardPage() {

  return (
    <div className="flex flex-col min-h-screen text-on-surface">
      {/* Sidebar Wrapper */}
      <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-page-padding space-y-stack-gap">
        {/* Logo Section */}
        <div className="px-6 mb-8">
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
            Align
          </h1>
          <p className="font-label-sm text-label-sm text-secondary opacity-70">
            Enterprise Portal
          </p>
        </div>
        {/* Main Navigation */}
        <nav className="flex-grow px-3 space-y-1">
          <Link
            className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high transition-colors rounded-lg group"
            href="/"
          >
            <span
              className="material-symbols-outlined mr-3 group-hover:scale-110 transition-transform"
              data-icon="dashboard"
            >
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className="flex items-center px-4 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim rounded-r-lg font-bold"
            href="/goals"
          >
            <span
              className="material-symbols-outlined mr-3"
              data-icon="ads_click"
            >
              ads_click
            </span>
            <span className="font-label-md text-label-md">My Goals</span>
          </Link>
          <Link
            className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high transition-colors rounded-lg group"
            href="/check-in"
          >
            <span
              className="material-symbols-outlined mr-3 group-hover:scale-110 transition-transform"
              data-icon="event_available"
            >
              event_available
            </span>
            <span className="font-label-md text-label-md">Check-ins</span>
          </Link>
          <Link
            className="flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high transition-colors rounded-lg group"
            href="#"
          >
            <span
              className="material-symbols-outlined mr-3 group-hover:scale-110 transition-transform"
              data-icon="monitoring"
            >
              monitoring
            </span>
            <span className="font-label-md text-label-md">My Progress</span>
          </Link>
        </nav>
        {/* Sidebar Footer / Profile */}
        <div className="px-4 mt-auto pt-4 border-t border-outline-variant">
          <div className="flex items-center p-2 rounded-lg bg-surface-container-low mb-2">
            <img
              alt="Rahul Mehta"
              className="w-10 h-10 rounded-full border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC836jM6AllKZfYr8fjrObCwu6vt5CQF0l41b3nzots--9DCwhOJIMqxMinRZGnkyypblZF34q8r-zqVz6OQtnKRme1W6IjebLx0BFX8CQnyQO6XjVbHsaYObu0pULs0JDLXbSCV2Q-j7vnbsDAIwspiSFIjgKafZ_UqbGl1A3tF77gc9ByKxHC_KtQQGGHP7eCdsN0mTlOKYSalX3AsFNqkWnBvHsOr8TDT6kalbZkcHJU2FXQki59JjWvmPOFedHRN0p-7JJFTLQ"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-label-md text-label-md truncate">
                Rahul Mehta
              </p>
              <span className="inline-flex items-center rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-container">
                Employee
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-2">
            <button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all">
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
            </button>
            <Link href="/login" className="p-2 text-error hover:bg-error-container hover:text-on-error-container rounded-full transition-all">
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
            </Link>
          </div>
        </div>
      </aside>
      {/* Main Viewport Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-page-padding sticky top-0 z-30 custom-shadow">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              My Goals — FY 2025-26
            </h2>
          </div>
          <div className="flex items-center gap-stack-gap">
            <div className="flex items-center bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full mr-4">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">
                Goal Setting Window Open
              </span>
            </div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all relative">
              <span
                className="material-symbols-outlined"
                data-icon="notifications"
              >
                notifications
              </span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
              <span className="material-symbols-outlined" data-icon="help">
                help
              </span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
              <span className="material-symbols-outlined" data-icon="apps">
                apps
              </span>
            </button>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="p-page-padding space-y-section-gap">
          {/* Alert Banner */}
          <div className="flex items-center justify-between p-4 bg-[#FFF7ED] border border-amber-200 rounded-lg custom-shadow">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-amber-600"
                data-icon="warning"
              >
                warning
              </span>
              <p className="font-body-md text-body-md text-amber-900">
                Your goal sheet is not yet submitted.{" "}
                <span className="font-bold">Deadline: 31 May 2025</span>
              </p>
            </div>
            <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md transition-all shadow-md active:scale-95">
              Submit Now
            </button>
          </div>
          {/* Summary Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-page-padding">
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Goals Created
                </p>
                <h3 className="font-headline-lg text-headline-lg text-primary">
                  4
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  of 8 maximum
                </p>
              </div>
              <div className="p-3 bg-primary-fixed rounded-lg text-primary">
                <span
                  className="material-symbols-outlined"
                  data-icon="checklist"
                >
                  checklist
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Total Weightage
                </p>
                <h3 className="font-headline-lg text-headline-lg text-error">
                  85%
                </h3>
                <p className="font-body-sm text-body-sm text-error mt-1 font-medium italic">
                  15% remaining
                </p>
              </div>
              <div className="p-3 bg-error-container rounded-lg text-error">
                <span className="material-symbols-outlined" data-icon="balance">
                  balance
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant custom-shadow flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Status
                </p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-md font-label-md bg-secondary-fixed text-on-secondary-fixed">
                    Draft
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mt-2">
                  Not submitted yet
                </p>
              </div>
              <div className="p-3 bg-surface-container rounded-lg text-secondary">
                <span
                  className="material-symbols-outlined"
                  data-icon="edit_note"
                >
                  edit_note
                </span>
              </div>
            </div>
          </div>
          {/* Goals Table Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant custom-shadow overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md font-bold">
                My Goal Sheet
              </h3>
              <Link href="/goals/new" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 shadow-md">
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="add"
                >
                  add
                </span>
                Add New Goal
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      #
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Thrust Area
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Goal Title
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      UoM
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Target
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Weightage
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4 font-body-md text-body-md">1</td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      Sales
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md font-medium">
                      Achieve Revenue Target
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-primary border border-primary/20">
                        MIN
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md">
                      ₹50L
                    </td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      30%
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="hover:text-primary transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                        <button className="hover:text-error transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4 font-body-md text-body-md">2</td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      Operations
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md font-medium">
                      Reduce Customer TAT
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-error border border-error/20">
                        MAX
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md">
                      3 days
                    </td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      25%
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="hover:text-primary transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                        <button className="hover:text-error transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4 font-body-md text-body-md">3</td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      Compliance
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md font-medium">
                      Zero Safety Incidents
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                        ZERO
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md">0</td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      20%
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="hover:text-primary transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                        <button className="hover:text-error transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4 font-body-md text-body-md">4</td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      HR
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md font-medium">
                      Training Completion
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant border border-tertiary-container/20">
                        TIMELINE
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md">
                      30-Jun-25
                    </td>
                    <td className="px-6 py-4 font-label-md text-label-md">
                      10%
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="hover:text-primary transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                        <button className="hover:text-error transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Card Footer Summary */}
            <div className="px-6 py-4 bg-surface-container flex flex-col gap-4 border-t border-outline-variant">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="font-label-md text-label-md text-on-surface">
                    Total Weightage: <span className="text-error">85% / 100%</span>
                  </span>
                  <div className="flex items-center gap-1 text-error">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="info"
                    >
                      info
                    </span>
                    <span className="font-body-sm text-body-sm">
                      You need to add 15% more weightage to submit.
                    </span>
                  </div>
                </div>
              </div>
              {/* Progress Bar & Final Action */}
              <div className="flex items-center gap-8">
                <div className="flex-grow">
                  <div className="w-full bg-outline-variant rounded-full h-2">
                    <div
                      className="bg-error h-2 rounded-full transition-all duration-500"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="relative group">
                  <button
                    className="bg-outline text-surface-container-lowest px-6 py-2 rounded-lg font-label-md text-label-md cursor-not-allowed opacity-60"
                    disabled
                  >
                    Submit for Approval
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-inverse-surface text-inverse-on-surface text-label-sm font-label-sm rounded shadow-lg invisible group-hover:visible transition-all">
                    Total weightage must equal 100%
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-inverse-surface"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Empty State / Placeholder for additional content */}
          <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-secondary text-3xl"
                data-icon="lightbulb"
              >
                lightbulb
              </span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
              Need help with your goals?
            </h4>
            <p className="font-body-md text-body-md text-secondary max-w-md mx-auto mb-6">
              {"Review the organization's FY 2025-26 strategy guide to align your"}
              {" "}individual contributions with team objectives.
            </p>
            <button className="border border-primary text-primary hover:bg-primary/5 px-6 py-2 rounded-lg font-label-md text-label-md transition-all">
              View Strategy Guide
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
