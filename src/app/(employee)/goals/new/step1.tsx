import { useWizardStore } from '@/store/wizardStore';
import Link from 'next/link';


export default function GoalCreationStep1() {
  const { nextStep } = useWizardStore();
  return (
    <div className="flex flex-col min-h-screen text-on-background bg-background">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-outline-variant flex flex-col py-page-padding gap-stack-gap shadow-sm z-50">
        <div className="px-6 mb-8">
          <h1 className="font-headline-md text-headline-md font-black text-primary">
            Align
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
            Enterprise Portal
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg font-label-md text-label-md"
            href="/"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span>Dashboard</span>
          </Link>
          {/* Active State */}
          <Link
            className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary border-l-4 border-on-primary-fixed-variant rounded-r-lg font-label-md text-label-md shadow-sm"
            href="/goals"
          >
            <span
              className="material-symbols-outlined"
              data-icon="track_changes"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              track_changes
            </span>
            <span>My Goals</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg font-label-md text-label-md"
            href="/check-in"
          >
            <span className="material-symbols-outlined" data-icon="fact_check">
              fact_check
            </span>
            <span>Check-ins</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg font-label-md text-label-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="trending_up">
              trending_up
            </span>
            <span>My Progress</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto space-y-1 border-t border-outline-variant pt-4">
          <button className="w-full bg-primary-container text-white py-3 rounded-lg font-label-md text-label-md mb-4 flex items-center justify-center gap-2 active:scale-95 duration-100">
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            <span>Create Goal</span>
          </button>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-secondary hover:text-primary transition-colors font-label-md text-label-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
            <span>Help Center</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2 text-secondary hover:text-primary transition-colors font-label-md text-label-md"
            href="/login"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-page-padding h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
              <span
                className="material-symbols-outlined text-secondary"
                data-icon="arrow_back"
              >
                arrow_back
              </span>
            </button>
            <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
              Create New Goal
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors rounded-full">
              <span
                className="material-symbols-outlined"
                data-icon="notifications"
              >
                notifications
              </span>
            </button>
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-fixed overflow-hidden border border-outline-variant">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdwxvHamComuByciVYC6q25WyhHMK0u3ItzpTYqtmLXy0L3SbGPKizKb-6rbRdO1wYGfLJ4_D1P49CjiyfwKrJr2eOAJm4Ec0TwpBUbuuozBmYfcCQqvwL1Mr_yqqh96_lX4Sd1YBJcdNaj6z7_hibqkL4Y7i-5bwZ6a9YJ07BtFiGERJtq38WGhx5AcRb6KaViQ_LHlzSfryNRYEqlaZphieKuGpO8Hg0FuPQcoLibi-gVLKCjR3ZG8dD1PGWJaRtjfuHgSJ89AU"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-page-padding max-w-5xl mx-auto w-full space-y-section-gap">
          {/* Horizontal Stepper */}
          <div className="flex items-center justify-between px-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
                1
              </div>
              <span className="font-label-md text-label-md text-primary">
                Goal Details
              </span>
            </div>
            {/* Connector 1-2 */}
            <div className="flex-1 h-[2px] bg-primary mx-4 -mt-6"></div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center font-bold border border-outline-variant">
                2
              </div>
              <span className="font-label-md text-label-md text-secondary">
                Targets & Weightage
              </span>
            </div>
            {/* Connector 2-3 */}
            <div className="flex-1 h-[2px] bg-outline-variant mx-4 -mt-6"></div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center font-bold border border-outline-variant">
                3
              </div>
              <span className="font-label-md text-label-md text-secondary">
                Review & Submit
              </span>
            </div>
          </div>

          {/* Form Card */}
          <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-card-padding border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Step 1 — Add Goal Details
              </h3>
            </div>
            <div className="p-page-padding space-y-6">
              {/* Thrust Area & Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">
                    Thrust Area
                  </label>
                  <select
                    className="w-full border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none bg-surface-bright"
                    defaultValue="Select area"
                  >
                    <option disabled>Select area</option>
                    <option>Sales</option>
                    <option>Operations</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Quality</option>
                    <option>Compliance</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">
                    Goal Title
                  </label>
                  <input
                    className="w-full border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g. Achieve Monthly Sales Target"
                    type="text"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">
                  Description
                </label>
                <textarea
                  className="w-full border border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Briefly describe the goal and how it will be measured"
                  rows={3}
                ></textarea>
              </div>
              {/* Unit of Measurement (UoM) */}
              <div className="space-y-4">
                <label className="font-label-md text-label-md text-on-surface">
                  Unit of Measurement (UoM)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Card 1 Selected */}
                  <label className="relative cursor-pointer">
                    <input
                      defaultChecked
                      className="peer sr-only"
                      name="uom"
                      type="radio"
                    />
                    <div className="h-full p-4 border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-low transition-all">
                      <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm mb-2 uppercase">
                        MIN
                      </span>
                      <p className="font-label-md text-label-md text-on-surface mb-1">
                        Higher is better
                      </p>
                      <p className="text-body-sm text-secondary">
                        e.g. Revenue, Headcount
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 text-primary hidden peer-checked:block">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                  </label>
                  {/* Card 2 */}
                  <label className="relative cursor-pointer">
                    <input className="peer sr-only" name="uom" type="radio" />
                    <div className="h-full p-4 border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-low transition-all">
                      <span className="inline-block px-2 py-0.5 rounded bg-error/10 text-error font-label-sm text-label-sm mb-2 uppercase">
                        MAX
                      </span>
                      <p className="font-label-md text-label-md text-on-surface mb-1">
                        Lower is better
                      </p>
                      <p className="text-body-sm text-secondary">
                        e.g. TAT, Cost
                      </p>
                    </div>
                  </label>
                  {/* Card 3 */}
                  <label className="relative cursor-pointer">
                    <input className="peer sr-only" name="uom" type="radio" />
                    <div className="h-full p-4 border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-low transition-all">
                      <span className="inline-block px-2 py-0.5 rounded bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm mb-2 uppercase">
                        TIMELINE
                      </span>
                      <p className="font-label-md text-label-md text-on-surface mb-1">
                        Date-based completion
                      </p>
                      <p className="text-body-sm text-secondary">
                        e.g. Project deadline
                      </p>
                    </div>
                  </label>
                  {/* Card 4 */}
                  <label className="relative cursor-pointer">
                    <input className="peer sr-only" name="uom" type="radio" />
                    <div className="h-full p-4 border-2 border-outline-variant rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-low transition-all">
                      <span className="inline-block px-2 py-0.5 rounded bg-on-secondary-container/10 text-secondary font-label-sm text-label-sm mb-2 uppercase">
                        ZERO
                      </span>
                      <p className="font-label-md text-label-md text-on-surface mb-1">
                        Zero = success
                      </p>
                      <p className="text-body-sm text-secondary">
                        e.g. Safety incidents
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Actions & Info */}
          <div className="space-y-4">
            <button className="w-full py-6 border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center gap-3 text-secondary hover:bg-surface-container-low hover:border-primary/50 transition-all group">
              <span
                className="material-symbols-outlined text-secondary group-hover:text-primary"
                data-icon="add_circle"
              >
                add_circle
              </span>
              <span className="font-label-md text-label-md">
                Add Another Goal
              </span>
            </button>
            <div className="flex items-start gap-2 text-secondary">
              <span
                className="material-symbols-outlined text-[18px] mt-0.5"
                data-icon="info"
              >
                info
              </span>
              <p className="text-body-sm italic">
                You can add up to 8 goals. Each goal must have at least 10%
                weightage.
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <footer className="flex items-center justify-between pt-8 border-t border-outline-variant">
            <Link
              className="text-secondary font-label-md text-label-md hover:text-error transition-colors px-4 py-2"
              href="#"
            >
              Cancel
            </Link>
            <button onClick={nextStep} className="bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md shadow-md transition-all active:scale-95 flex items-center gap-2">
              <span>Next: Set Targets</span>
              <span
                className="material-symbols-outlined"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}
