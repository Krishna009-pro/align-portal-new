"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/logout";
import { ProfileModal } from "@/components/profile-modal";

const REPORTEES = [
  { id: "rahul", name: "Rahul Mehta", goals: 5, completion: 100 },
  { id: "sneha", name: "Sneha Patil", goals: 4, completion: 100 },
  { id: "amit", name: "Amit Kumar", goals: 3, completion: 85 },
  { id: "deepa", name: "Deepa Nair", goals: 6, completion: 100 },
  { id: "vikram", name: "Vikram Rao", goals: 0, completion: 0 },
  { id: "pooja", name: "Pooja Shah", goals: 5, completion: 100 },
];

export default function ReviewCheckinPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [managerDesignation, setManagerDesignation] = useState("Director of Global Strategy");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const [checkins, setCheckins] = useState([
    {
      id: "1",
      title: "Revenue Target",
      uom: "MIN",
      uomBg: "bg-secondary-container text-primary",
      target: "₹50L",
      actual: "₹42L",
      score: "84%",
      scoreColor: "bg-amber-100 text-[#D97706] border-amber-200",
      status: "On Track",
      statusColor: "bg-amber-100 text-[#D97706] border-amber-200",
      comment: "Good progress. Push harder in Q2."
    },
    {
      id: "2",
      title: "Customer TAT",
      uom: "MAX",
      uomBg: "bg-error-container text-error",
      target: "3 days",
      actual: "2.5 days",
      score: "100%",
      scoreColor: "bg-green-100 text-[#15803d] border-green-200",
      status: "Completed",
      statusColor: "bg-green-100 text-[#15803d] border-green-200",
      comment: ""
    },
    {
      id: "3",
      title: "Safety Incidents",
      uom: "ZERO",
      uomBg: "bg-green-100 text-[#15803d]",
      target: "0",
      actual: "0",
      score: "100%",
      scoreColor: "bg-green-100 text-[#15803d] border-green-200",
      status: "Completed",
      statusColor: "bg-green-100 text-[#15803d] border-green-200",
      comment: "Excellent. Zero incidents maintained."
    },
    {
      id: "4",
      title: "Training Completion",
      uom: "TIMELINE",
      uomBg: "bg-tertiary-fixed text-tertiary",
      target: "30-Jun",
      actual: "28-Jun",
      score: "100%",
      scoreColor: "bg-green-100 text-[#15803d] border-green-200",
      status: "Completed",
      statusColor: "bg-green-100 text-[#15803d] border-green-200",
      comment: ""
    },
    {
      id: "5",
      title: "Defect Rate",
      uom: "MAX",
      uomBg: "bg-error-container text-error",
      target: "2%",
      actual: "—",
      score: "0%",
      scoreColor: "bg-red-100 text-[#dc2626] border-red-200",
      status: "Not Started",
      statusColor: "bg-red-100 text-[#dc2626] border-red-200",
      comment: "Please update this ASAP."
    }
  ]);

  const filteredCheckins = useMemo(() => {
    return checkins.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.uom.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, checkins]);

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

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Generate and download a real CSV Report File
  const handleDownloadReport = () => {
    const headers = ["Reportee Name", "Goals Count", "Completion Average", "Workflow Status", "Audit Status"];
    const rows = REPORTEES.map(rep => {
      const status = statuses[rep.id] || "Awaiting Approval";
      const audit = status === "Approved" ? "VERIFIED ✓" : "PENDING REVIEW ⚠";
      return [
        rep.name,
        `${rep.goals} goals`,
        `${rep.completion}%`,
        status,
        audit
      ];
    });

    const csvContent = [
      ["Q1 Team Goal Telemetry & Compliance Report"],
      [`Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`],
      [],
      headers,
      ...rows
    ].map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Q1_Team_Goal_Telemetry_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Goal sheets report compiled and downloaded successfully!");
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
    <div className="bg-[#F8FAFC] text-on-surface min-h-screen flex">
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
            className="flex items-center px-6 py-3 text-secondary hover:bg-surface-container-high transition-colors"
            href="/team/review-goals"
          >
            <span className="material-symbols-outlined mr-3" data-icon="target">
              target
            </span>
            <span className="font-label-md text-label-md">My Team Goals</span>
          </Link>
          <Link
            className="flex items-center px-6 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim font-bold transition-all"
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
      <div className="flex-1 min-h-screen flex flex-col">
        {/* TopAppBar (Shared Component) */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface border-b border-outline-variant z-40 flex justify-between items-center px-page-padding shadow-sm">
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY658XNjl5W65BtukzLj8zvEQbGoe62xfBrb3_SdqgBTIfLDeN3eNSkf6fJM33KQbaB_LLbmiOHMV8Qjc1k_QK99VydUcLPYBfD-N-Lvm13yno_FBdgARVoP9TLZPkpbtqbBemqekb_tOsPl2b-yjodTZ-mdyeFQHA_49VTjvwzsbCdzC5BiuPw-qAzC_uy0ig6KHW41moU5lViwIhBCWtJlMAwvJAm4UZA1h-o22-Jb66RfUJ7iCXWHJtfAu7g5rstmh5xLL8rl0"
              />
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="ml-64 pt-[80px] p-page-padding min-h-screen">
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
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Q1 Check-in — Planned vs Actual
              </h3>
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search goals, UoM or status..."
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
                  {filteredCheckins.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-secondary bg-slate-50">
                        <span className="material-symbols-outlined text-4xl text-outline mb-2 animate-bounce">
                          search_off
                        </span>
                        <p className="font-title-sm text-title-sm font-bold text-on-surface-variant">
                          No matching check-ins found
                        </p>
                        <p className="font-body-sm text-body-sm text-outline mt-1">
                          Try searching for a different goal title or status.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredCheckins.map((c) => (
                      <tr key={c.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-body-md text-on-surface font-semibold">
                          {c.title}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded font-label-sm text-label-sm font-bold ${c.uomBg}`}>
                            {c.uom}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-body-md">{c.target}</td>
                        <td className="px-4 py-4 font-body-md">{c.actual}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold border ${c.scoreColor}`}>
                            {c.score}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold border ${c.statusColor}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <textarea
                              className="w-full text-body-sm border border-outline-variant rounded-lg p-2 focus:ring-primary focus:border-primary"
                              rows={2}
                              value={c.comment}
                              placeholder={c.comment ? "" : "Add your check-in comment..."}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCheckins(prev => prev.map(item => item.id === c.id ? { ...item, comment: val } : item));
                              }}
                            ></textarea>
                            <button
                              onClick={() => triggerToast(`Comment saved for ${c.title}!`)}
                              className="self-end bg-primary text-white font-label-sm text-label-sm px-3 py-1 rounded-md hover:bg-primary-container transition-all"
                            >
                              Save Comment
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
              <button
                onClick={handleDownloadReport}
                className="w-64 border border-outline text-on-surface py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Export Report CSV
              </button>
            </div>
          </section>
        </main>
      </div>

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
              {"Rahul Mehta's Q1 check-in review has been successfully marked as completed. The audit history has been updated."}
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
                              className={`px-2 py-0.5 rounded text-[11px] font-bold border ${status === "Approved"
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
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-all active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download CSV Report
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
