import { useWizardStore } from '@/store/wizardStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function GoalCreationStep3() {
  const router = useRouter();
  const { nextStep, prevStep } = useWizardStore();

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center w-full px-page-padding h-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-element-gap">
            <span className="font-headline-lg text-headline-lg font-bold text-primary">
              Align
            </span>
            <div className="h-6 w-px bg-outline-variant mx-2"></div>
            <h1 className="font-headline-md text-headline-md text-on-surface">
              My Goals — FY 2025-26
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-label-md font-label-md">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              Goal Setting Window Open
            </div>
            <div className="flex items-center gap-stack-gap text-secondary">
              <span
                className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors"
                data-icon="notifications"
              >
                notifications
              </span>
              <span
                className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors"
                data-icon="help_outline"
              >
                help_outline
              </span>
            </div>
            <img
              alt="User profile"
              className="w-8 h-8 rounded-full border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoCkgEvN2uRMxuMfHaS2V3hT7OgBvULuwOhr4Kt9I4FFHwmIP3cuDsS765myxWlUG4kSls95FHVKCDs6H46osYBV7WVgCWOVngzxKwwc6FDAz40dBWFpPaQVlkFHj2PqXFzXlvTM9I4ZO92iWCxr9B84RmZ2_eGiH-vkHqHDaHvOPvi5h6RP7Anx7ItfyV83tHOQEw9b3mc-mLPwJ2iafvGQE30dZL65XdDuQsEaXepZQv-1DD7dA9yPSzCsTznvou7zJJLG-OlCA"
            />
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-outline-variant z-40 pt-20 pb-page-padding flex flex-col justify-between">
        <nav className="flex flex-col px-4">
          <div className="mb-section-gap px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined" data-icon="hub">
                  hub
                </span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md font-bold text-on-surface">
                  Enterprise Portal
                </p>
                <p className="text-[10px] text-secondary uppercase tracking-wider font-semibold">
                  Strategic Alignment
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="target">
                target
              </span>
              <span className="font-label-md text-label-md">Goals</span>
            </Link>
            {/* Active Item */}
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-on-primary border-l-4 border-primary shadow-md"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="hub">
                hub
              </span>
              <span className="font-label-md text-label-md">Strategic Map</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="groups">
                groups
              </span>
              <span className="font-label-md text-label-md">Team Performance</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="menu_book">
                menu_book
              </span>
              <span className="font-label-md text-label-md">Resources</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="archive">
                archive
              </span>
              <span className="font-label-md text-label-md">Archived</span>
            </Link>
          </div>
          <div className="mt-section-gap">
            <button className="w-full py-3 bg-primary text-white rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined" data-icon="add">
                add
              </span>
              New Goal
            </button>
          </div>
        </nav>
        <div className="px-4 space-y-1">
          <Link
            className="flex items-center gap-3 px-4 py-2 text-secondary hover:bg-surface-container transition-all rounded-lg"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="support_agent"
            >
              support_agent
            </span>
            <span className="font-label-md text-label-md">Support</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-secondary hover:bg-surface-container transition-all rounded-lg"
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
      <main className="ml-64 pt-24 pb-page-padding px-page-padding max-w-[1280px] w-full mx-auto">
        {/* Step Progress Indicator */}
        <div className="mb-section-gap flex items-center justify-center max-w-2xl mx-auto">
          <div className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mb-2">
                <span className="material-symbols-outlined" data-icon="check">
                  check
                </span>
              </div>
              <span className="font-label-md text-label-md text-green-700">
                Goal Details
              </span>
            </div>
            <div className="flex-1 h-1 bg-primary mx-4 -mt-6"></div>
          </div>
          <div className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mb-2">
                <span className="material-symbols-outlined" data-icon="check">
                  check
                </span>
              </div>
              <span className="font-label-md text-label-md text-green-700">
                Targets & Weightage
              </span>
            </div>
            <div className="flex-1 h-1 bg-primary mx-4 -mt-6"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2 border-4 border-primary-container">
              <span className="font-bold">3</span>
            </div>
            <span className="font-label-md text-label-md text-primary">
              Review & Submit
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-section-gap">
          {/* Left Side: Summary & Content */}
          <div className="col-span-12 space-y-page-padding">
            {/* Main Header Card */}
            <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-page-padding">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                Step 3 — Review & Submit
              </h2>
              <p className="text-secondary font-body-md text-body-md max-w-3xl">
                Review your goals carefully. Once submitted, your manager will
                review and approve. You cannot edit after submission.
              </p>
            </div>

            {/* Read-only Summary Table Card */}
            <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary">
                        #
                      </th>
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary">
                        Thrust Area
                      </th>
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary">
                        Goal Title
                      </th>
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary text-center">
                        UoM
                      </th>
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary">
                        Target
                      </th>
                      <th className="px-6 py-4 font-label-md text-label-md text-secondary text-right">
                        Weightage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-on-surface">1</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-label-sm font-label-sm">
                          Sales
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Achieve Revenue Target
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-primary bg-primary/10 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          MIN
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono">₹50,00,000</td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        30%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-on-surface">2</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-label-sm font-label-sm">
                          Operations
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Reduce Customer TAT
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-error bg-error/10 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          MAX
                        </span>
                      </td>
                      <td className="px-6 py-4">3 days</td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        25%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-on-surface">3</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-label-sm font-label-sm">
                          Compliance
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Zero Safety Incidents
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          ZERO
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        20%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-on-surface">4</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-label-sm font-label-sm">
                          HR
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Training Completion
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          TIMELINE
                        </span>
                      </td>
                      <td className="px-6 py-4">30 Jun 2025</td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        15%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-on-surface">5</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-label-sm font-label-sm">
                          Quality
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Reduce Defect Rate
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-error bg-error/10 px-2 py-1 rounded text-[10px] font-bold uppercase">
                          MAX
                        </span>
                      </td>
                      <td className="px-6 py-4">2%</td>
                      <td className="px-6 py-4 text-right font-bold text-on-surface">
                        10%
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-secondary-container text-on-secondary-container">
                      <td className="px-6 py-4 text-right font-bold" colSpan={5}>
                        Total Weightage:
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-extrabold text-lg">100%</span>
                          <span
                            className="material-symbols-outlined text-green-600"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="bg-green-50 px-6 py-3 border-t border-outline-variant flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-green-600 text-sm"
                  data-icon="verified"
                >
                  verified
                </span>
                <span className="text-green-800 font-label-md text-label-md">
                  All goals valid and parameters meet organizational requirements.
                </span>
              </div>
            </div>

            {/* Confirmation Checklist */}
            <div className="bg-white rounded-xl border-l-4 border-l-green-600 border border-y-outline-variant border-r-outline-variant shadow-sm p-6">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                Submission Readiness Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-green-600"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Total weightage equals 100%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-green-600"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    All goals have minimum 10% weightage
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-green-600"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Maximum 5 of 8 goals used
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-green-600"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    All required fields are filled
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-green-600"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Goal Setting window is currently open
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-col gap-6 pt-6 border-t border-outline-variant">
              <p className="text-secondary text-body-sm text-body-sm italic text-center">
                By submitting, you confirm that these goals are aligned with your
                department objectives for FY 2025-26.
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all"
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="arrow_back"
                  >
                    arrow_back
                  </span>
                  Back to Edit
                </button>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => router.push("/goals")}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-headline-md text-headline-md rounded-lg shadow-lg hover:bg-green-700 active:scale-[0.98] transition-all"
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="send"
                    >
                      send
                    </span>
                    Submit for Approval
                  </button>
                  <span className="text-secondary text-[11px] font-medium">
                    Your manager will be notified immediately
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
