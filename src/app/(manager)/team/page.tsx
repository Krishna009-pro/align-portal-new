import Link from "next/link";

export default function ManagerTeamPage() {

  return (
    <div className="bg-[#F8FAFC] text-on-surface font-body-md min-h-screen">
      {/* Shared SideNavBar */}
      <aside className="fixed h-full w-64 left-0 top-0 bg-surface border-r border-outline-variant shadow-sm flex flex-col py-page-padding z-50">
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
        <nav className="flex-1 space-y-1">
          <Link
            className="flex items-center px-6 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim font-bold transition-all"
            href="/team"
          >
            <span className="material-symbols-outlined mr-3" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className="flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors"
            href="/team/review-goals"
          >
            <span className="material-symbols-outlined mr-3" data-icon="target">
              target
            </span>
            <span className="font-label-md text-label-md">My Team Goals</span>
          </Link>
          <Link
            className="flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors"
            href="/team/review-checkin"
          >
            <span
              className="material-symbols-outlined mr-3"
              data-icon="fact_check"
            >
              fact_check
            </span>
            <span className="font-label-md text-label-md">Check-in Reviews</span>
          </Link>
          <Link
            className="flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors"
            href="#"
          >
            <span
              className="material-symbols-outlined mr-3"
              data-icon="bar_chart"
            >
              bar_chart
            </span>
            <span className="font-label-md text-label-md">Reports</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 pt-6 border-t border-outline-variant">
          <div className="flex items-center p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
            <img
              alt="Priya Kapoor"
              className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaox2CuBlqADFRSL5nHKJaqHuhzMRUp_3Aja4QuTZxlWpeKd0JWFWUlI3sscptfMcKZpZlaTPUgBQBziVpAlKy_s5cnh2jzGSp9L-xnWYvVW02JgfC1c_VBAwazkASoNhv8XATF7RnHfq43oD8LwpCQ2Dcp_CU50rCeXSOFVqjjoC0gKyyiCI415NwVLlgnPaNoHwjDAT-L34y6DGeOLrJksXzH0fF_dHblz4_ex-D5Q-uVQamGmI038QyJxMNxS_4JJSmS-N8NY"
            />
            <div className="flex-1 overflow-hidden">
              <p className="font-label-md text-label-md truncate text-on-surface">
                Priya Kapoor
              </p>
              <p className="font-label-sm text-label-sm text-secondary truncate">
                Manager
              </p>
            </div>
            <span
              className="material-symbols-outlined text-secondary text-[20px]"
              data-icon="settings"
            >
              settings
            </span>
          </div>
        </div>
      </aside>

      {/* Shared TopAppBar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant z-40 flex justify-between items-center px-page-padding">
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Manager Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center px-3 py-1 bg-[#E8F5E9] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] mr-2"></span>
            <span className="font-label-sm text-label-sm text-[#2E7D32] font-semibold">
              Q1 Window Open
            </span>
          </div>
          <button className="relative hover:bg-surface-container rounded-full p-2 transition-all">
            <span
              className="material-symbols-outlined text-secondary"
              data-icon="notifications"
            >
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen p-page-padding">
        {/* Row 1: Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-section-gap">
          {/* Metric 1 */}
          <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-secondary-container text-on-secondary-container rounded-lg"
                data-icon="groups"
              >
                groups
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary">
              Total Reportees
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-on-surface">8</span>
            </div>
          </div>
          {/* Metric 2 */}
          <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-amber-50 text-amber-700 rounded-lg"
                data-icon="schedule"
              >
                schedule
              </span>
              <span className="font-label-sm text-label-sm bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                Action needed
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary">
              Awaiting Approval
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-on-surface">3</span>
            </div>
          </div>
          {/* Metric 3 */}
          <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-green-50 text-green-700 rounded-lg"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="font-label-sm text-label-sm bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                This cycle
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary">
              Goals Approved
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-on-surface">4</span>
            </div>
          </div>
          {/* Metric 4 */}
          <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-red-50 text-error rounded-lg"
                data-icon="warning"
              >
                warning
              </span>
              <span className="font-label-sm text-label-sm bg-red-50 text-error px-2 py-0.5 rounded-full border border-red-100">
                Q1 overdue
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary">
              Check-ins Pending
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-on-surface">5</span>
            </div>
          </div>
        </div>

        {/* Row 2: Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Team Goal Approval Status */}
          <div className="lg:w-[65%] bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="px-card-padding py-4 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Team Goal Approval Status
              </h3>
              <button className="text-primary font-label-md text-label-md flex items-center hover:underline">
                Export Report{" "}
                <span
                  className="material-symbols-outlined text-[16px] ml-1"
                  data-icon="download"
                >
                  download
                </span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                      Reportee
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                      Goals
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                      Completion
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                      Last Active
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant">
                      Status
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs mr-3">
                          RM
                        </div>
                        <span className="font-body-md text-on-surface">
                          Rahul Mehta
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      5 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">100%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      28 Apr
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                        Awaiting Approval
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:opacity-90 shadow-sm transition-all active:scale-95">
                        Review
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs mr-3">
                          SP
                        </div>
                        <span className="font-body-md text-on-surface">
                          Sneha Patil
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      4 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">100%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      27 Apr
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[11px] font-bold border border-green-200">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-white border border-outline-variant text-secondary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low shadow-sm transition-all">
                        View
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs mr-3">
                          AK
                        </div>
                        <span className="font-body-md text-on-surface">
                          Amit Kumar
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      3 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-error rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">85%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      26 Apr
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-red-50 text-error text-[11px] font-bold border border-red-200">
                        Incomplete
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:opacity-90 shadow-sm transition-all">
                        Review
                      </button>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center font-bold text-xs mr-3">
                          DN
                        </div>
                        <span className="font-body-md text-on-surface">
                          Deepa Nair
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      6 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">100%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      25 Apr
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[11px] font-bold border border-green-200">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-white border border-outline-variant text-secondary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low shadow-sm transition-all">
                        View
                      </button>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center font-bold text-xs mr-3">
                          VR
                        </div>
                        <span className="font-body-md text-on-surface">
                          Vikram Rao
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      0 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">0%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      —
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-surface-container-low text-secondary text-[11px] font-bold border border-outline-variant">
                        Not Submitted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-white border border-primary text-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-primary-fixed shadow-sm transition-all">
                        Remind
                      </button>
                    </td>
                  </tr>
                  {/* Row 6 */}
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xs mr-3">
                          PS
                        </div>
                        <span className="font-body-md text-on-surface">
                          Pooja Shah
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      5 goals
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span className="font-label-sm text-label-sm">100%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      29 Apr
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                        Awaiting Approval
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:opacity-90 shadow-sm transition-all">
                        Review
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto px-6 py-4 bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center">
              <p className="font-label-sm text-label-sm text-secondary">
                Showing 6 of 8 reportees
              </p>
              <div className="flex space-x-2">
                <button
                  className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50"
                  disabled
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="chevron_left"
                  >
                    chevron_left
                  </span>
                </button>
                <button className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Right: Quick Stats & Chart */}
          <div className="lg:w-[35%] flex flex-col gap-6">
            {/* Status Chart Card */}
            <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Quick Stats
                </h3>
                <p className="font-label-sm text-label-sm text-secondary">
                  Approval progress for current window
                </p>
              </div>
              {/* Donut Chart UI */}
              <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                {/* Simulated Donut Chart using Conic Gradient */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "conic-gradient(#16a34a 0% 50%, #d97706 50% 87.5%, #94a3b8 87.5% 100%)",
                  }}
                ></div>
                {/* Inner Circle for Donut Hole */}
                <div className="absolute inset-8 bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-extrabold text-on-surface">
                    87%
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Total Submit
                  </span>
                </div>
              </div>
              {/* Legend */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-600 mr-3"></span>
                    <span className="font-body-md text-secondary">Approved</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    50.0%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-amber-600 mr-3"></span>
                    <span className="font-body-md text-secondary">Pending</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    37.5%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-slate-400 mr-3"></span>
                    <span className="font-body-md text-secondary">
                      Not Submitted
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    12.5%
                  </span>
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant text-center">
                <p className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">
                  Upcoming Deadline
                </p>
                <p className="text-xl font-bold text-error">10 May 2025</p>
              </div>
            </div>
            {/* Secondary Card: Manager Toolkit */}
            <div className="bg-surface-container p-card-padding rounded-xl border border-outline-variant shadow-sm">
              <h4 className="font-label-md text-label-md font-bold text-primary mb-4">
                Manager Toolkit
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center text-on-surface hover:text-primary cursor-pointer group">
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="auto_awesome"
                  >
                    auto_awesome
                  </span>
                  <span className="font-body-sm text-body-sm">
                    AI Goal Assistant
                  </span>
                </li>
                <li className="flex items-center text-on-surface hover:text-primary cursor-pointer group">
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="library_books"
                  >
                    library_books
                  </span>
                  <span className="font-body-sm text-body-sm">
                    Guideline Documentation
                  </span>
                </li>
                <li className="flex items-center text-on-surface hover:text-primary cursor-pointer group">
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="history"
                  >
                    history
                  </span>
                  <span className="font-body-sm text-body-sm">
                    Past Review Cycles
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
