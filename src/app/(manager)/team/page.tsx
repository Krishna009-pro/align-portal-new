"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { logoutUser } from "@/lib/logout";
import { ProfileModal } from "@/components/profile-modal";

interface Reportee {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  goals: number;
  completion: number;
  lastActive: string;
}

const REPORTEES: Reportee[] = [
  {
    id: "rahul",
    name: "Rahul Mehta",
    avatarText: "RM",
    avatarBg: "bg-primary-fixed text-primary",
    goals: 5,
    completion: 100,
    lastActive: "28 Apr",
  },
  {
    id: "sneha",
    name: "Sneha Patil",
    avatarText: "SP",
    avatarBg: "bg-secondary-container text-on-secondary-container",
    goals: 4,
    completion: 100,
    lastActive: "27 Apr",
  },
  {
    id: "amit",
    name: "Amit Kumar",
    avatarText: "AK",
    avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    goals: 3,
    completion: 85,
    lastActive: "26 Apr",
  },
  {
    id: "deepa",
    name: "Deepa Nair",
    avatarText: "DN",
    avatarBg: "bg-primary-fixed-dim text-on-primary-fixed",
    goals: 6,
    completion: 100,
    lastActive: "25 Apr",
  },
  {
    id: "vikram",
    name: "Vikram Rao",
    avatarText: "VR",
    avatarBg: "bg-surface-container-highest text-secondary",
    goals: 0,
    completion: 0,
    lastActive: "—",
  },
  {
    id: "pooja",
    name: "Pooja Shah",
    avatarText: "PS",
    avatarBg: "bg-secondary-fixed text-on-secondary-fixed",
    goals: 5,
    completion: 100,
    lastActive: "29 Apr",
  },
  {
    id: "rajesh",
    name: "Rajesh Sharma",
    avatarText: "RS",
    avatarBg: "bg-primary-fixed-dim text-on-primary-fixed",
    goals: 4,
    completion: 90,
    lastActive: "24 Apr",
  },
  {
    id: "neha",
    name: "Neha Gupta",
    avatarText: "NG",
    avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    goals: 5,
    completion: 100,
    lastActive: "29 Apr",
  },
];

const ITEMS_PER_PAGE = 4;

export default function ManagerTeamPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [managerDesignation, setManagerDesignation] = useState("Director of Global Strategy");
  const [currentPage, setCurrentPage] = useState(1);
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
  const [statuses, setStatuses] = useState<Record<string, string>>({
    rahul: "Awaiting Approval",
    sneha: "Approved",
    amit: "Incomplete",
    deepa: "Approved",
    vikram: "Not Submitted",
    pooja: "Awaiting Approval",
    rajesh: "Approved",
    neha: "Awaiting Approval",
  });

  useEffect(() => {
    // Hydrate state from localStorage safely on component mount
    setStatuses({
      rahul: localStorage.getItem("status_rahul") || "Awaiting Approval",
      sneha: localStorage.getItem("status_sneha") || "Approved",
      amit: localStorage.getItem("status_amit") || "Incomplete",
      deepa: localStorage.getItem("status_deepa") || "Approved",
      vikram: localStorage.getItem("status_vikram") || "Not Submitted",
      pooja: localStorage.getItem("status_pooja") || "Awaiting Approval",
      rajesh: localStorage.getItem("status_rajesh") || "Approved",
      neha: localStorage.getItem("status_neha") || "Awaiting Approval",
    });
  }, []);

  // Show a sleek UI toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemind = (name: string) => {
    triggerToast(`Goal sheet reminder sent successfully to ${name}!`);
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

  // Derived dashboard metrics
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

  // Filtered Reportees based on Search Query
  const filteredReportees = useMemo(() => {
    return REPORTEES.filter(rep => {
      const status = statuses[rep.id] || "Awaiting Approval";
      return (
        rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, statuses]);

  // Dynamic Pagination variables
  const totalPages = Math.max(1, Math.ceil(filteredReportees.length / ITEMS_PER_PAGE));
  const paginatedReportees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReportees.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredReportees]);

  // Derived Donut Chart Percentages
  const totalCount = Object.keys(statuses).length;
  const approvedPercent = Math.round(
    (Object.values(statuses).filter((s) => s === "Approved").length / totalCount) * 100
  );
  const pendingPercent = Math.round(
    (Object.values(statuses).filter(
      (s) => s === "Awaiting Approval" || s === "Returned for Rework"
    ).length /
      totalCount) *
    100
  );
  const notSubmittedPercent = 100 - approvedPercent - pendingPercent;

  const donutGradient = useMemo(() => {
    return `conic-gradient(#16a34a 0% ${approvedPercent}%, #d97706 ${approvedPercent}% ${approvedPercent + pendingPercent
      }%, #94a3b8 ${approvedPercent + pendingPercent}% 100%)`;
  }, [approvedPercent, pendingPercent]);

  return (
    <div className="bg-[#F8FAFC] text-on-surface font-body-md min-h-screen">
      {/* Sidebar navigation */}
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

      {/* Shared TopAppBar */}
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYaox2CuBlqADFRSL5nHKJaqHuhzMRUp_3Aja4QuTZxlWpeKd0JWFWUlI3sscptfMcKZpZlaTPUgBQBziVpAlKy_s5cnh2jzGSp9L-xnWYvVW02JgfC1c_VBAwazkASoNhv8XATF7RnHfq43oD8LwpCQ2Dcp_CU50rCeXSOFVqjjoC0gKyyiCI415NwVLlgnPaNoHwjDAT-L34y6DGeOLrJksXzH0fF_dHblz4_ex-D5Q-uVQamGmI038QyJxMNxS_4JJSmS-N8NY"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-[80px] min-h-screen p-page-padding">
        {/* Metric Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-section-gap">
          {/* Card 1: Total Reportees */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-secondary-container text-on-secondary-container rounded-lg"
                data-icon="groups"
              >
                groups
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary font-bold">
              Total Reportees
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-extrabold text-on-surface">{REPORTEES.length}</span>
            </div>
          </div>

          {/* Card 2: Awaiting Approval */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-amber-50 text-amber-700 rounded-lg"
                data-icon="schedule"
              >
                schedule
              </span>
              {awaitingCount > 0 && (
                <span className="font-label-sm text-label-sm bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100 font-bold">
                  Action needed
                </span>
              )}
            </div>
            <h3 className="font-label-md text-label-md text-secondary font-bold">
              Awaiting Approval
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-extrabold text-on-surface">{awaitingCount}</span>
            </div>
          </div>

          {/* Card 3: Approved */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-green-50 text-green-700 rounded-lg"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="font-label-sm text-label-sm bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 font-bold">
                This cycle
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary font-bold">
              Goals Approved
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-extrabold text-on-surface">{approvedCount}</span>
            </div>
          </div>

          {/* Card 4: Pending Check-ins */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span
                className="material-symbols-outlined p-2 bg-red-50 text-error rounded-lg"
                data-icon="warning"
              >
                warning
              </span>
              <span className="font-label-sm text-label-sm bg-red-50 text-error px-2 py-0.5 rounded-full border border-red-100 font-bold">
                Q1 overdue
              </span>
            </div>
            <h3 className="font-label-md text-label-md text-secondary font-bold">
              Check-ins Pending
            </h3>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-extrabold text-on-surface">5</span>
            </div>
          </div>
        </div>

        {/* Row 2: Status Table & Pie Chart */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Team Goal Approval Status Table */}
          <div className="lg:w-[65%] bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
                <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold whitespace-nowrap">
                  Team Goal Approval Status
                </h3>
                {/* Real-time Search Box */}
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search reportees or status..."
                    className="w-full bg-slate-50 border border-outline-variant rounded-lg pl-10 pr-10 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center w-5 h-5 rounded-full hover:bg-slate-200"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={handleDownloadReport}
                className="text-primary font-label-md text-label-md flex items-center hover:underline font-bold self-end md:self-auto shrink-0"
              >
                Export Report
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
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant font-bold">
                      Reportee
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant font-bold">
                      Goals
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant font-bold">
                      Completion
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant font-bold">
                      Last Active
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant font-bold">
                      Status
                    </th>
                    <th className="px-6 py-3 font-label-md text-label-md text-secondary border-b border-outline-variant text-right font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {paginatedReportees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-secondary bg-slate-50">
                        <span className="material-symbols-outlined text-4xl text-outline mb-2 animate-bounce">
                          search_off
                        </span>
                        <p className="font-title-sm text-title-sm font-bold text-on-surface-variant">
                          No matching reportees found
                        </p>
                        <p className="font-body-sm text-body-sm text-outline mt-1">
                          Try searching for a different name or status.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedReportees.map((rep) => {
                      const status = statuses[rep.id] || "Awaiting Approval";
                      return (
                        <tr
                          key={rep.id}
                          className="hover:bg-slate-50 transition-colors animate-fade-in"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full ${rep.avatarBg} flex items-center justify-center font-bold text-xs mr-3`}
                              >
                                {rep.avatarText}
                              </div>
                              <span className="font-title-sm text-title-sm font-bold text-on-surface">
                                {rep.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-body-md text-secondary">
                            {rep.goals}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${rep.completion === 100
                                      ? "bg-green-600"
                                      : rep.completion > 50
                                        ? "bg-primary"
                                        : "bg-error"
                                    }`}
                                  style={{ width: `${rep.completion}%` }}
                                ></div>
                              </div>
                              <span className="font-label-sm text-label-sm">
                                {rep.completion}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-body-md text-secondary">
                            {rep.lastActive}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold border ${status === "Approved"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : status === "Awaiting Approval"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : status === "Returned for Rework"
                                      ? "bg-red-50 text-error border-red-200 animate-pulse"
                                      : status === "Incomplete"
                                        ? "bg-red-50 text-error border-red-200"
                                        : "bg-surface-container-low text-secondary border-outline-variant"
                                }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {status === "Not Submitted" ? (
                              <button
                                onClick={() => handleRemind(rep.name)}
                                className="bg-white border border-primary text-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-primary-fixed shadow-sm transition-all active:scale-95 font-bold"
                              >
                                Remind
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  router.push(`/team/review-goals?userId=${rep.id}`)
                                }
                                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm shadow-sm transition-all active:scale-95 font-bold ${status === "Approved"
                                    ? "bg-white border border-outline-variant text-secondary hover:bg-slate-50"
                                    : "bg-primary text-on-primary hover:opacity-90"
                                  }`}
                              >
                                {status === "Approved" ? "View" : "Review"}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-auto px-6 py-4 bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center">
              <p className="font-label-sm text-label-sm text-secondary font-bold">
                Showing {filteredReportees.length === 0 ? 0 : Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredReportees.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredReportees.length)} of {filteredReportees.length} reportees
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Quick Stats, Live Donut Chart & Toolkit */}
          <div className="lg:w-[35%] flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Quick Stats
                </h3>
                <p className="font-label-sm text-label-sm text-secondary font-medium">
                  Approval progress for current window
                </p>
              </div>

              {/* Dynamic Donut Chart UI */}
              <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full transition-all duration-700"
                  style={{
                    background: donutGradient,
                  }}
                ></div>
                <div className="absolute inset-8 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-on-surface">
                    {submissionPercentage}%
                  </span>
                  <span className="font-label-sm text-[10px] uppercase text-secondary font-bold">
                    Submitted
                  </span>
                </div>
              </div>

              {/* Legend with Dynamic Values */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-600 mr-3"></span>
                    <span className="font-body-md text-secondary">Approved</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {approvedPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-amber-600 mr-3"></span>
                    <span className="font-body-md text-secondary">Pending</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {pendingPercent.toFixed(1)}%
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
                    {notSubmittedPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant text-center">
                <p className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-1 font-bold">
                  Upcoming Deadline
                </p>
                <p className="text-xl font-black text-error animate-pulse">
                  10 May 2025
                </p>
              </div>
            </div>

            {/* Secondary Card: Manager Toolkit */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
              <h4 className="font-label-md text-label-md font-extrabold text-primary mb-4 uppercase tracking-wider">
                Manager Toolkit
              </h4>
              <ul className="space-y-3">
                <li
                  onClick={() => triggerToast("AI Goal Assistant is analyzing goal sheets...")}
                  className="flex items-center text-on-surface hover:text-primary cursor-pointer group"
                >
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="auto_awesome"
                  >
                    auto_awesome
                  </span>
                  <span className="font-body-sm text-body-sm font-semibold">
                    AI Goal Assistant
                  </span>
                </li>
                <li
                  onClick={() => triggerToast("Opening Guideline Documentation...")}
                  className="flex items-center text-on-surface hover:text-primary cursor-pointer group"
                >
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="library_books"
                  >
                    library_books
                  </span>
                  <span className="font-body-sm text-body-sm font-semibold">
                    Guideline Documentation
                  </span>
                </li>
                <li
                  onClick={() => triggerToast("Opening Review Archives...")}
                  className="flex items-center text-on-surface hover:text-primary cursor-pointer group"
                >
                  <span
                    className="material-symbols-outlined text-[20px] mr-3 text-secondary group-hover:text-primary"
                    data-icon="history"
                  >
                    history
                  </span>
                  <span className="font-body-sm text-body-sm font-semibold">
                    Past Review Cycles
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

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
                  <p className="text-2xl font-black text-green-600 mt-1">{approvedCount} / {REPORTEES.length}</p>
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
