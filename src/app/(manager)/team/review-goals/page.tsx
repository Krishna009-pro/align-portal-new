"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { logoutUser } from "@/lib/logout";
import { ProfileModal } from "@/components/profile-modal";

// Structured mock data for multiple reportees
const EMPLOYEES_MOCK = {
  rahul: {
    name: "Rahul Mehta",
    initials: "RM",
    dept: "Sales Department",
    date: "28 Apr 2025",
    goals: [
      { id: 1, area: "Sales", title: "Achieve Revenue Target", uom: "MIN", target: "₹50,00,000", weight: "30%", color: "text-primary", uomColor: "bg-primary/10 text-primary" },
      { id: 2, area: "Operations", title: "Reduce Customer TAT", uom: "MAX", target: "3 days", weight: "25%", color: "text-tertiary", uomColor: "bg-error/10 text-error" },
      { id: 3, area: "Compliance", title: "Zero Safety Incidents", uom: "ZERO", target: "0", weight: "20%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
      { id: 4, area: "HR", title: "Training Completion", uom: "TIMELINE", target: "30-Jun-2025", weight: "15%", color: "text-purple-700", uomColor: "bg-purple-100 text-purple-700" },
      { id: 5, area: "Quality", title: "Reduce Defect Rate", uom: "MAX", target: "2%", weight: "10%", color: "text-red-700", uomColor: "bg-error/10 text-error" },
    ]
  },
  sneha: {
    name: "Sneha Patil",
    initials: "SP",
    dept: "Customer Operations",
    date: "27 Apr 2025",
    goals: [
      { id: 1, area: "Sales", title: "Expand Enterprise Accounts", uom: "MIN", target: "10 Accounts", weight: "40%", color: "text-primary", uomColor: "bg-primary/10 text-primary" },
      { id: 2, area: "Operations", title: "Reduce Platform Latency", uom: "MAX", target: "100ms", weight: "30%", color: "text-tertiary", uomColor: "bg-error/10 text-error" },
      { id: 3, area: "Compliance", title: "Security Standards Audit", uom: "ZERO", target: "0 failures", weight: "20%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
      { id: 4, area: "Quality", title: "Increase Test Coverage", uom: "MIN", target: "85%", weight: "10%", color: "text-red-700", uomColor: "bg-primary/10 text-primary" },
    ]
  },
  amit: {
    name: "Amit Kumar",
    initials: "AK",
    dept: "Compliance & Safety",
    date: "26 Apr 2025",
    goals: [
      { id: 1, area: "Compliance", title: "Ensure HSE Regulatory Audits", uom: "ZERO", target: "0 Warnings", weight: "40%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
      { id: 2, area: "Operations", title: "Audit Completion Time", uom: "MAX", target: "5 days", weight: "30%", color: "text-tertiary", uomColor: "bg-error/10 text-error" },
      { id: 3, area: "HR", title: "Health & Safety Training", uom: "TIMELINE", target: "15-Aug-2025", weight: "30%", color: "text-purple-700", uomColor: "bg-purple-100 text-purple-700" },
    ]
  },
  pooja: {
    name: "Pooja Shah",
    initials: "PS",
    dept: "Engineering",
    date: "29 Apr 2025",
    goals: [
      { id: 1, area: "Quality", title: "Zero High-Priority Security P1 Bugs", uom: "ZERO", target: "0", weight: "30%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
      { id: 2, area: "Operations", title: "Cloud Cost Optimization", uom: "MAX", target: "-15% YoY", weight: "25%", color: "text-tertiary", uomColor: "bg-error/10 text-error" },
      { id: 3, area: "Sales", title: "Support Pre-Sales Architectures", uom: "MIN", target: "₹20,0,000 assisted", weight: "20%", color: "text-primary", uomColor: "bg-primary/10 text-primary" },
      { id: 4, area: "HR", title: "Mentorship Sessions", uom: "MIN", target: "10 completed", weight: "15%", color: "text-purple-700", uomColor: "bg-primary/10 text-primary" },
      { id: 5, area: "Compliance", title: "Maintain ISO27001 Certification", uom: "ZERO", target: "0 non-conformities", weight: "10%", color: "text-green-700", uomColor: "bg-green-100 text-green-700" },
    ]
  }
};

const REPORTEES = [
  { id: "rahul", name: "Rahul Mehta", goals: 5, completion: 100 },
  { id: "sneha", name: "Sneha Patil", goals: 4, completion: 100 },
  { id: "amit", name: "Amit Kumar", goals: 3, completion: 85 },
  { id: "deepa", name: "Deepa Nair", goals: 6, completion: 100 },
  { id: "vikram", name: "Vikram Rao", goals: 0, completion: 0 },
  { id: "pooja", name: "Pooja Shah", goals: 5, completion: 100 },
];

type EmployeeKey = keyof typeof EMPLOYEES_MOCK;

function GoalRow({ goal }: { goal: typeof EMPLOYEES_MOCK.rahul.goals[0] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [target, setTarget] = useState(goal.target);
  const [weight, setWeight] = useState(goal.weight);

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-4 text-secondary">{goal.id}</td>
      <td className={`px-5 py-4 font-semibold ${goal.color}`}>{goal.area}</td>
      <td className="px-5 py-4 font-bold text-on-surface">{goal.title}</td>
      <td className="px-5 py-4">
        <span className={`${goal.uomColor} px-2 py-0.5 rounded font-label-md text-[10px] font-bold`}>
          {goal.uom}
        </span>
      </td>
      <td className="px-5 py-4 font-medium text-primary">
        {isEditing ? (
          <input
            autoFocus
            className="w-full bg-blue-50 border-primary border-2 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-0 text-on-surface font-semibold shadow-inner"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className="cursor-pointer border-b border-dashed border-primary/50 hover:bg-slate-100 px-1 py-0.5 rounded">{target}</span>
        )}
      </td>
      <td className="px-5 py-4 font-semibold">
        {isEditing ? (
          <input
            className="w-full border-outline-variant border rounded px-2 py-1.5 focus:border-primary focus:ring-0 text-on-surface"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className="cursor-pointer border-b border-dashed border-outline-variant hover:bg-slate-100 px-1 py-0.5 rounded">{weight}</span>
        )}
      </td>
      <td className="px-5 py-4 text-right">
        <button 
          className="text-secondary hover:text-primary p-2 rounded-full hover:bg-slate-100 active:scale-95 transition-all"
          onClick={() => setIsEditing(true)}
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </td>
    </tr>
  );
}

function ReviewGoalsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = (searchParams.get("userId") || "rahul") as EmployeeKey;
  
  const [showModal, setShowModal] = useState<"approve" | "rework" | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [managerDesignation, setManagerDesignation] = useState("Director of Global Strategy");
  const [managerNotes, setManagerNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setManagerDesignation(localStorage.getItem("profile_designation") || "Director of Global Strategy");
    }
    const handleProfileSync = () => {
      setManagerDesignation(localStorage.getItem("profile_designation") || "Director of Global Strategy");
    };
    window.addEventListener("profileUpdate", handleProfileSync);
    return () => window.removeEventListener("profileUpdate", handleProfileSync);
  }, []);
  const [statuses, setStatuses] = useState<Record<string, string>>({
    rahul: "Awaiting Approval",
    sneha: "Approved",
    amit: "Incomplete",
    deepa: "Approved",
    vikram: "Not Submitted",
    pooja: "Awaiting Approval",
  });

  useEffect(() => {
    setStatuses({
      rahul: localStorage.getItem("status_rahul") || "Awaiting Approval",
      sneha: localStorage.getItem("status_sneha") || "Approved",
      amit: localStorage.getItem("status_amit") || "Incomplete",
      deepa: localStorage.getItem("status_deepa") || "Approved",
      vikram: localStorage.getItem("status_vikram") || "Not Submitted",
      pooja: localStorage.getItem("status_pooja") || "Awaiting Approval",
    });
  }, [showModal]);

  const employee = useMemo(() => {
    return EMPLOYEES_MOCK[userId] || EMPLOYEES_MOCK.rahul;
  }, [userId]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredGoals = useMemo(() => {
    if (!employee || !employee.goals) return [];
    return employee.goals.filter(goal =>
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.uom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.target.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, employee]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (type: "approve" | "rework") => {
    if (type === "approve") {
      localStorage.setItem(`status_${userId}`, "Approved");
      setShowModal("approve");
    } else {
      localStorage.setItem(`status_${userId}`, "Returned for Rework");
      if (managerNotes.trim()) {
        localStorage.setItem(`notes_${userId}`, managerNotes);
      }
      setShowModal("rework");
    }
  };

  const awaitingCount = useMemo(() => {
    return Object.values(statuses).filter(
      (s) => s === "Awaiting Approval" || s === "Returned for Rework"
    ).length;
  }, [statuses]);

  const approvedCount = useMemo(() => {
    return Object.values(statuses).filter((s) => s === "Approved").length;
  }, [statuses]);

  const submissionPercentage = useMemo(() => {
    const total = Object.keys(statuses).length;
    const submitted = Object.values(statuses).filter((s) => s !== "Not Submitted").length;
    return Math.round((submitted / total) * 100);
  }, [statuses]);

  return (
    <div className="text-on-background antialiased overflow-hidden min-h-screen bg-slate-50 flex">
      {/* Unified SideNavBar */}
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
            className="flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors"
            href="/team"
          >
            <span className="material-symbols-outlined mr-3" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className="flex items-center px-6 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim font-bold transition-all"
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
          <button
            onClick={() => setShowReportModal(true)}
            className="w-full flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors text-left"
          >
            <span
              className="material-symbols-outlined mr-3"
              data-icon="bar_chart"
            >
              bar_chart
            </span>
            <span className="font-label-md text-label-md font-semibold">Reports</span>
          </button>
        </nav>
        <div className="mt-auto px-4 pt-6 border-t border-outline-variant relative">
          {showProfileMenu && (
            <>
              {/* Overlay transparent backdrop to dismiss */}
              <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={() => setShowProfileMenu(false)}
              />
              {/* Premium Floating Profile Menu */}
              <div className="absolute bottom-16 left-4 right-4 bg-white border border-outline-variant rounded-xl shadow-lg p-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 flex flex-col gap-2">
                <div className="px-2 py-1 border-b border-outline-variant pb-2">
                  <p className="font-label-md text-label-md text-on-surface font-bold">Priya Kapoor</p>
                  <p className="font-label-sm text-label-sm text-secondary">priya.kapoor@enterprise.com</p>
                  <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                    Enterprise Manager
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-left text-body-sm font-semibold text-secondary hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>My Profile</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-left text-body-sm font-semibold text-secondary hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>Settings</span>
                </button>

                <button
                  onClick={async () => {
                    setShowProfileMenu(false);
                    await logoutUser();
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-left text-body-sm font-semibold text-red-600 hover:text-red-700 transition-colors border-t border-outline-variant/60 pt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}

          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer ${showProfileMenu ? 'bg-surface-container' : ''}`}
          >
            <img
              alt="Priya Kapoor"
              className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaox2CuBlqADFRSL5nHKJaqHuhzMRUp_3Aja4QuTZxlWpeKd0JWFWUlI3sscptfMcKZpZlaTPUgBQBziVpAlKy_s5cnh2jzGSp9L-xnWYvVW02JgfC1c_VBAwazkASoNhv8XATF7RnHfq43oD8LwpCQ2Dcp_CU50rCeXSOFVqjjoC0gKyyiCI415NwVLlgnPaNoHwjDAT-L34y6DGeOLrJksXzH0fF_dHblz4_ex-D5Q-uVQamGmI038QyJxMNxS_4JJSmS-N8NY"
            />
            <div className="flex-1 overflow-hidden">
              <p className="font-label-md text-label-md truncate text-on-surface font-semibold">
                Priya Kapoor
              </p>
              <p className="font-label-sm text-label-sm text-secondary truncate">
                {managerDesignation}
              </p>
            </div>
            <span
              className={`material-symbols-outlined text-secondary text-[20px] transition-transform duration-200 ${showProfileMenu ? 'rotate-45 text-primary' : ''}`}
              data-icon="settings"
            >
              settings
            </span>
          </div>
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
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img
                alt="Manager profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaox2CuBlqADFRSL5nHKJaqHuhzMRUp_3Aja4QuTZxlWpeKd0JWFWUlI3sscptfMcKZpZlaTPUgBQBziVpAlKy_s5cnh2jzGSp9L-xnWYvVW02JgfC1c_VBAwazkASoNhv8XATF7RnHfq43oD8LwpCQ2Dcp_CU50rCeXSOFVqjjoC0gKyyiCI415NwVLlgnPaNoHwjDAT-L34y6DGeOLrJksXzH0fF_dHblz4_ex-D5Q-uVQamGmI038QyJxMNxS_4JJSmS-N8NY"
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
            <span className="text-secondary font-bold">
              {employee.name}
            </span>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-on-surface font-semibold">
              Goal Sheet Review
            </span>
          </nav>

          {/* Employee Info Card */}
          <section className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-headline-md shadow-inner">
                {employee.initials}
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {employee.name}
                </h3>
                <p className="font-body-md text-body-md text-secondary">
                  {employee.dept} · Reports to:{" "}
                  <span className="font-bold text-on-surface">Priya Kapoor</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-secondary">
                  Submitted: {employee.date}
                </span>
                <span className="bg-primary-container text-white px-3 py-1 rounded-full font-label-md text-label-md font-bold">
                  FY 2025-26 — Goal Setting
                </span>
              </div>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-label-md text-label-md font-bold border border-green-200">
                {employee.goals.length} Goals · 100% Weightage
              </span>
            </div>
          </section>

          {/* Main Content Card */}
          <section className="bg-white rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-white">
              <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                Goal Sheet Review —{" "}
                <span className="text-primary font-bold">
                  Inline Editing Enabled
                </span>
              </h4>
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search goals, thrust areas, UoM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-secondary hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>
            <div className="p-5 bg-amber-50 border-b border-amber-100 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600">
                info
              </span>
              <p className="font-body-md text-body-md text-amber-800">
                You can edit Target and Weightage directly in the table by clicking on them. All
                edits are logged to the audit trail for compliance.
              </p>
            </div>

            {/* Editable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-secondary border-b border-outline-variant font-bold">
                    <th className="px-5 py-3 w-12">#</th>
                    <th className="px-5 py-3">Thrust Area</th>
                    <th className="px-5 py-3 w-1/3">Goal Title</th>
                    <th className="px-5 py-3">UoM</th>
                    <th className="px-5 py-3">Target (Click to Edit)</th>
                    <th className="px-5 py-3 w-28">Weightage</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
                  {filteredGoals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-16 text-center text-secondary bg-slate-50">
                        <span className="material-symbols-outlined text-4xl text-outline mb-2 animate-bounce">
                          search_off
                        </span>
                        <p className="font-title-sm text-title-sm font-bold text-on-surface-variant">
                          No matching goals found
                        </p>
                        <p className="font-body-sm text-body-sm text-outline mt-1">
                          Try searching for a different keyword.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredGoals.map((goal) => (
                      <GoalRow key={goal.id} goal={goal} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-outline-variant flex justify-end items-center">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-secondary font-bold">
                  Total Weightage:
                </span>
                <span className="font-headline-md text-headline-md text-green-700 font-extrabold">
                  100% ✓
                </span>
              </div>
            </div>
          </section>

          {/* Manager Notes Section */}
          <section className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-3">
            <label
              className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold"
              htmlFor="manager-notes"
            >
              Rejection Reason / Notes
            </label>
            <textarea
              className="w-full border-outline-variant border rounded-lg p-4 focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
              id="manager-notes"
              value={managerNotes}
              onChange={(e) => setManagerNotes(e.target.value)}
              placeholder="Add feedback for the employee here. This will be visible if goals are returned for rework."
              rows={4}
            ></textarea>
          </section>
        </div>

        {/* Bottom Action Bar */}
        <footer className="fixed bottom-0 left-64 right-0 h-20 bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-page-padding flex items-center justify-between z-40">
          <div className="flex-1">
            <Link
              className="flex items-center gap-1.5 text-primary hover:underline font-label-md text-label-md font-bold"
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
              onClick={() => handleAction("rework")}
              className="px-6 py-2.5 border border-error text-error font-bold text-label-md rounded-lg hover:bg-error/5 transition-all active:scale-95"
            >
              Return for Rework
            </button>
          </div>
          <div className="flex-1 flex flex-col items-end gap-1">
            <button
              onClick={() => handleAction("approve")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-headline-md text-headline-md flex items-center gap-2 shadow-lg shadow-green-200 transition-all active:scale-95 font-bold"
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
                ? `${employee.name}'s goal sheet has been approved and locked. The employee has been notified.` 
                : `${employee.name}'s goal sheet has been returned for rework with your feedback.`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => router.push('/team')}
                className={`px-6 py-2.5 rounded-lg font-label-md text-label-md text-white transition-all font-bold ${
                  showModal === 'approve' ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200' : 'bg-error hover:bg-error-container text-on-error hover:text-on-error-container'
                }`}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Compliance Telemetry Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl border border-outline-variant flex flex-col max-h-[90vh] overflow-hidden transform scale-100 transition-transform">
            <div className="flex justify-between items-start mb-6 border-b border-outline-variant pb-4">
              <div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-black flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-3xl">bar_chart</span>
                  Q1 Team Goal Telemetry & Compliance Report
                </h3>
                <p className="text-secondary text-sm mt-1 font-semibold">
                  Compiled on Q1 Cycle · Authorized Access Only
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-secondary text-2xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-secondary uppercase">Submission Rate</span>
                  <p className="text-2xl font-black text-primary mt-1">{submissionPercentage}%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-secondary uppercase">Approved Goal Sheets</span>
                  <p className="text-2xl font-black text-green-600 mt-1">{approvedCount} / 6</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-secondary uppercase">Awaiting Action</span>
                  <p className="text-2xl font-black text-amber-600 mt-1">{awaitingCount}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-secondary uppercase">Compliance Level</span>
                  <p className="text-2xl font-black text-green-600 mt-1">High (96%)</p>
                </div>
              </div>

              {/* Tabular Telemetry Details */}
              <div className="border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-secondary border-b border-outline-variant font-bold text-xs uppercase">
                      <th className="px-5 py-3">Reportee</th>
                      <th className="px-5 py-3">Goals Count</th>
                      <th className="px-5 py-3">Completion Avg</th>
                      <th className="px-5 py-3">Workflow Status</th>
                      <th className="px-5 py-3 text-right">Audit Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-sm font-medium">
                    {REPORTEES.map((rep) => {
                      const status = statuses[rep.id] || "Awaiting Approval";
                      return (
                        <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-on-surface">{rep.name}</td>
                          <td className="px-5 py-3.5">{rep.goals} goals</td>
                          <td className="px-5 py-3.5 text-primary font-bold">{rep.completion}%</td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                                status === "Approved"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : status === "Awaiting Approval"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : status === "Returned for Rework"
                                  ? "bg-red-50 text-error border-red-200"
                                  : status === "Incomplete"
                                  ? "bg-red-50 text-error border-red-200"
                                  : "bg-slate-50 text-secondary border-slate-200"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right font-extrabold">
                            {status === "Approved" ? (
                              <span className="text-green-600 flex items-center justify-end gap-1">
                                <span className="material-symbols-outlined text-[16px]">
                                  verified
                                </span>
                                VERIFIED ✓
                              </span>
                            ) : status === "Not Submitted" ? (
                              <span className="text-slate-400">ESCALATION PENDING ⚠</span>
                            ) : (
                              <span className="text-amber-600">PENDING REVIEW ⚠</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 border-t border-outline-variant pt-4 flex justify-between items-center">
              <button
                onClick={() => triggerToast("PDF report compiled and downloaded successfully!")}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-all active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                Download PDF
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-6 py-2.5 bg-white border border-outline text-secondary font-bold rounded-lg hover:bg-slate-50 transition-all active:scale-95 text-sm"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Alert Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-[100] transition-all transform duration-300 translate-y-0 opacity-100">
          <span className="material-symbols-outlined text-green-400">
            check_circle
          </span>
          <span className="font-label-md text-label-md font-bold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Stateful Interactive Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        triggerToast={triggerToast}
      />
    </div>
  );
}

export default function ReviewGoalsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-on-surface bg-background font-bold text-center">Loading review portal...</div>}>
      <ReviewGoalsContent />
    </Suspense>
  );
}
