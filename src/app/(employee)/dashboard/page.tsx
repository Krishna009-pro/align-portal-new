"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminEmployeeSidebar } from "@/components/admin-employee-sidebar";
import { AdminEmployeeTopBar } from "@/components/admin-employee-topbar";
import { logoutUser } from "@/lib/logout";
import { useProtectedSession } from "@/hooks/useProtectedSession";

export default function DashboardPage() {
  const router = useRouter();
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);

  // Toast and Alerts Dropdown State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Sync activeTab from URL search parameters statefully
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const syncTab = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        setActiveTab(params.get("tab") || "dashboard");
      }
    };
    syncTab();
    window.addEventListener("popstate", syncTab);
    return () => window.removeEventListener("popstate", syncTab);
  }, []);

  // Sync tab on router queries
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(params.get("tab") || "dashboard");
    }
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSignOut = async () => {
    await logoutUser();
    router.replace("/login");
  };

  // State 1: Active Employees
  const [employees, setEmployees] = useState([
    { id: "rahul", name: "Rahul Mehta", dept: "Sales", manager: "Priya Kapoor", goalStatus: "Submitted", checkinStatus: "Completed", email: "rahul.mehta@enterprise.com", phone: "+91 98765 43210" },
    { id: "sneha", name: "Sneha Patil", dept: "HR", manager: "Priya Kapoor", goalStatus: "Submitted", checkinStatus: "Pending", email: "sneha.patil@enterprise.com", phone: "+91 98765 43211" },
    { id: "amit", name: "Amit Kumar", dept: "Operations", manager: "Raj Malhotra", goalStatus: "Incomplete", checkinStatus: "Not Started", email: "amit.kumar@enterprise.com", phone: "+91 98765 43212" },
    { id: "deepa", name: "Deepa Nair", dept: "Finance", manager: "Suresh Prasad", goalStatus: "Submitted", checkinStatus: "Completed", email: "deepa.nair@enterprise.com", phone: "+91 98765 43213" },
    { id: "vikram", name: "Vikram Rao", dept: "IT", manager: "Priya Kapoor", goalStatus: "Not Submitted", checkinStatus: "Not Started", email: "vikram.rao@enterprise.com", phone: "+91 98765 43214" },
    { id: "pooja", name: "Pooja Shah", dept: "Sales", manager: "Raj Malhotra", goalStatus: "Submitted", checkinStatus: "Pending", email: "pooja.shah@enterprise.com", phone: "+91 98765 43215" },
    { id: "karan", name: "Karan Johar", dept: "IT", manager: "Raj Malhotra", goalStatus: "Submitted", checkinStatus: "Completed", email: "karan.johar@enterprise.com", phone: "+91 98765 43216" },
    { id: "neha", name: "Neha Sharma", dept: "HR", manager: "Suresh Prasad", goalStatus: "Not Submitted", checkinStatus: "Not Started", email: "neha.sharma@enterprise.com", phone: "+91 98765 43217" },
  ]);

  // State 2: Cycles
  const [cycles, setCycles] = useState([
    { id: "cycle-q1", name: "Q1 Goal Cycle — FY 2025-26", startDate: "2025-04-01", endDate: "2025-06-30", status: "Active", scope: "All Employees", completionRate: 74 },
    { id: "cycle-q2", name: "Q2 Goal Cycle — FY 2025-26", startDate: "2025-07-01", endDate: "2025-09-30", status: "Draft", scope: "All Employees", completionRate: 0 },
    { id: "cycle-q4-past", name: "Q4 Alignment Cycle — FY 2024-25", startDate: "2025-01-01", endDate: "2025-03-31", status: "Archived", scope: "All Employees", completionRate: 98 },
  ]);

  // State 3: Shared Goals
  const [sharedGoals, setSharedGoals] = useState([
    { id: "shared-1", title: "Safety Excellence", thrust: "Compliance", description: "Zero safety incidents across all departments", target: "0 incidents", pushedTo: "48 employees (Sales/HR/IT/Finance)", accepted: "44 accepted", progress: 91.6, type: "ZERO", creator: "Raj Sharma", date: "1 May 2025" },
    { id: "shared-2", title: "Annual Training Completion", thrust: "HR", description: "100% completion of mandatory security compliance courses", target: "30-Jun-2025", pushedTo: "12 employees (HR/IT)", accepted: "12 accepted", progress: 100, type: "TIMELINE", creator: "Raj Sharma", date: "5 May 2025" },
    { id: "shared-3", title: "Customer Satisfaction Score", thrust: "Sales", description: "Maintain a high net promoter and customer score", target: "4.2/5 rating", pushedTo: "8 employees (Sales)", accepted: "5 accepted", progress: 62.5, type: "MIN", creator: "Raj Sharma", date: "12 May 2025" },
  ]);

  // State 4: Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: "log-1", user: "Raj Sharma (Admin)", action: "Pushed Shared Goal", detail: "Added 'Safety Excellence' to 48 employees", ip: "192.168.1.45", timestamp: "2026-05-17 11:34:02", type: "Goal Operation" },
    { id: "log-2", user: "Rahul Mehta", action: "Submitted Goal Sheet", detail: "Q1 goal sheet submitted for approval", ip: "192.168.1.102", timestamp: "2026-05-17 10:15:40", type: "Employee Action" },
    { id: "log-3", user: "Priya Kapoor (Manager)", action: "Approved Goal Sheet", detail: "Approved Sneha Patil's Q1 weightages", ip: "192.168.1.88", timestamp: "2026-05-17 09:22:11", type: "Manager Approval" },
    { id: "log-4", user: "Raj Sharma (Admin)", action: "Settings Update", detail: "Updated session timeout to 120 minutes", ip: "192.168.1.45", timestamp: "2026-05-16 16:45:00", type: "Security Config" },
    { id: "log-5", user: "Vikram Rao", action: "Goal Draft Saved", detail: "Saved progress on Q1 core metrics sheet", ip: "192.168.1.144", timestamp: "2026-05-16 14:10:33", type: "Employee Action" },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: "n-1", message: "Vikram Rao has not yet started Q1 goals", urgency: "High", read: false },
    { id: "n-2", message: "Amit Kumar submitted incomplete weightages", urgency: "Medium", read: false },
    { id: "n-3", message: "Security configurations successfully synchronized", urgency: "Low", read: true },
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Reminders / Escalations
  const [pendingReminders, setPendingReminders] = useState<string[]>([]);
  const [escalatedUsers, setEscalatedUsers] = useState<string[]>([]);

  // Search & Filters state
  const [adminSearch, setAdminSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [adminPage, setAdminPage] = useState(1);

  // Form states - Add/Edit Employee Modal
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empDept, setEmpDept] = useState("Sales");
  const [empManager, setEmpManager] = useState("Priya Kapoor");
  const [empGoalStatus, setEmpGoalStatus] = useState("Submitted");
  const [empCheckinStatus, setEmpCheckinStatus] = useState("Pending");

  // Form states - Goal Cycle inline
  const [newCycleName, setNewCycleName] = useState("");
  const [newCycleStart, setNewCycleStart] = useState("2025-10-01");
  const [newCycleEnd, setNewCycleEnd] = useState("2025-12-31");
  const [newCycleScope, setNewCycleScope] = useState("All Employees");

  // Form states - Shared Goal inline
  const [newGoalThrust, setNewGoalThrust] = useState("Sales");
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDesc, setNewGoalDesc] = useState("");
  const [newGoalUom, setNewGoalUom] = useState("MIN");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [pushSales, setPushSales] = useState(true);
  const [pushHr, setPushHr] = useState(false);
  const [pushIt, setPushIt] = useState(false);
  const [pushFinance, setPushFinance] = useState(false);

  // Employee Page state
  const [submitted, setSubmitted] = useState(false);

  // Quick Action triggers
  const handleSendReminder = (name: string) => {
    if (pendingReminders.includes(name)) return;
    setPendingReminders((prev) => [...prev, name]);
    triggerToast(`Reminder email broadcasted to ${name}!`);
  };

  const handleEscalate = (name: string) => {
    if (escalatedUsers.includes(name)) return;
    setEscalatedUsers((prev) => [...prev, name]);
    triggerToast(`Escalation ticket flagged to ${name}'s direct supervisor!`);
  };

  // Add/Edit Employee logic
  const handleOpenAddEmployee = () => {
    setEditingEmployee(null);
    setEmpName("");
    setEmpEmail("");
    setEmpDept("Sales");
    setEmpManager("Priya Kapoor");
    setEmpGoalStatus("Not Submitted");
    setEmpCheckinStatus("Not Started");
    setIsEmployeeModalOpen(true);
  };

  const handleOpenEditEmployee = (emp: any) => {
    setEditingEmployee(emp);
    setEmpName(emp.name);
    setEmpEmail(emp.email || `${emp.id}@enterprise.com`);
    setEmpDept(emp.dept);
    setEmpManager(emp.manager);
    setEmpGoalStatus(emp.goalStatus);
    setEmpCheckinStatus(emp.checkinStatus);
    setIsEmployeeModalOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !empEmail) {
      triggerToast("Please enter employee name and email address.");
      return;
    }

    if (editingEmployee) {
      // Edit
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name: empName,
                email: empEmail,
                dept: empDept,
                manager: empManager,
                goalStatus: empGoalStatus,
                checkinStatus: empCheckinStatus,
              }
            : emp
        )
      );

      const log = {
        id: `log-${Date.now()}`,
        user: "Raj Sharma (Admin)",
        action: "Employee Modified",
        detail: `Updated strategic alignment parameters for ${empName}`,
        ip: "192.168.1.45",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        type: "Employee Action",
      };
      setAuditLogs((prev) => [log, ...prev]);
      triggerToast(`Successfully modified details for ${empName}!`);
    } else {
      // Add
      const newId = empName.toLowerCase().replace(/\s+/g, "-");
      const newEmp = {
        id: newId,
        name: empName,
        email: empEmail,
        dept: empDept,
        manager: empManager,
        goalStatus: empGoalStatus,
        checkinStatus: empCheckinStatus,
        phone: "+91 98765 00000",
      };
      setEmployees((prev) => [...prev, newEmp]);

      const log = {
        id: `log-${Date.now()}`,
        user: "Raj Sharma (Admin)",
        action: "Employee Registered",
        detail: `Registered and aligned ${empName} under ${empManager}`,
        ip: "192.168.1.45",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        type: "Employee Action",
      };
      setAuditLogs((prev) => [log, ...prev]);
      triggerToast(`Successfully onboarded and aligned ${empName}!`);
    }

    setIsEmployeeModalOpen(false);
  };

  const handleDeleteEmployee = (id: string, name: string) => {
    if (confirm(`Confirm deletion: Remove ${name} from corporate alignment blueprints?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));

      const log = {
        id: `log-${Date.now()}`,
        user: "Raj Sharma (Admin)",
        action: "Employee Removed",
        detail: `Expelled ${name} from corporate performance directory`,
        ip: "192.168.1.45",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        type: "Employee Action",
      };
      setAuditLogs((prev) => [log, ...prev]);
      triggerToast(`Removed employee ${name} from system database.`);
    }
  };

  // Create Cycle logic
  const handleCreateCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCycleName) {
      triggerToast("Please enter a clear goal-setting cycle name.");
      return;
    }

    const newCycle = {
      id: `cycle-${Date.now()}`,
      name: newCycleName,
      startDate: newCycleStart,
      endDate: newCycleEnd,
      status: "Draft",
      scope: newCycleScope,
      completionRate: 0,
    };

    setCycles((prev) => [newCycle, ...prev]);

    const log = {
      id: `log-${Date.now()}`,
      user: "Raj Sharma (Admin)",
      action: "Cycle Launched",
      detail: `Initialized new strategic boundary '${newCycleName}'`,
      ip: "192.168.1.45",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "Cycle Boundary",
    };
    setAuditLogs((prev) => [log, ...prev]);

    triggerToast(`Boundary cycle '${newCycleName}' launched in Draft mode.`);
    setNewCycleName("");
  };

  const toggleCycleStatus = (id: string, name: string, current: string) => {
    const nextStatus = current === "Draft" ? "Active" : current === "Active" ? "Archived" : "Draft";
    setCycles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );

    const log = {
      id: `log-${Date.now()}`,
      user: "Raj Sharma (Admin)",
      action: "Cycle State Transition",
      detail: `Shifted '${name}' status from ${current} to ${nextStatus}`,
      ip: "192.168.1.45",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "Cycle Boundary",
    };
    setAuditLogs((prev) => [log, ...prev]);
    triggerToast(`Goal cycle '${name}' status updated to ${nextStatus}!`);
  };

  // Push Shared Goal Logic
  const handlePushSharedGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalTarget) {
      triggerToast("Please provide a title and objective target value.");
      return;
    }

    const depts = [];
    if (pushSales) depts.push("Sales");
    if (pushHr) depts.push("HR");
    if (pushIt) depts.push("IT");
    if (pushFinance) depts.push("Finance");

    const pushedCount = depts.length * 12 || 8;
    const newGoal = {
      id: `shared-${Date.now()}`,
      title: newGoalTitle,
      thrust: newGoalThrust,
      description: newGoalDesc,
      target: newGoalTarget,
      pushedTo: `${pushedCount} employees (${depts.join("/") || "Compliance"})`,
      accepted: `${pushedCount} accepted`,
      progress: 100,
      type: newGoalUom,
      creator: "Raj Sharma",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };

    setSharedGoals((prev) => [newGoal, ...prev]);

    const log = {
      id: `log-${Date.now()}`,
      user: "Raj Sharma (Admin)",
      action: "Shared Goal Pushed",
      detail: `Pushed strategic metric '${newGoalTitle}' to ${pushedCount} employees`,
      ip: "192.168.1.45",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type: "Goal Operation",
    };
    setAuditLogs((prev) => [log, ...prev]);

    triggerToast(`Corporate Shared Goal '${newGoalTitle}' broadcasted successfully!`);

    // Reset Form
    setNewGoalTitle("");
    setNewGoalDesc("");
    setNewGoalTarget("");
  };

  // PDF Export Simulation
  const handleExportPDF = () => {
    if (exporting) return;
    setExporting(true);
    triggerToast("Compiling performance matrices and generating official executive PDF...");
    setTimeout(() => {
      setExporting(false);
      triggerToast("Align_Executive_Completion_Report_Q1_2025.pdf downloaded successfully!");
    }, 2000);
  };

  // CSV Audit Log Export Simulation
  const handleExportCSV = () => {
    triggerToast("Generating audit compliance matrix CSV dump...");
    setTimeout(() => {
      triggerToast("System_Audit_Compliance_Log_FY26.csv downloaded!");
    }, 1200);
  };

  // Filters for Employee Directory Table
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
        emp.manager.toLowerCase().includes(adminSearch.toLowerCase()) ||
        emp.email.toLowerCase().includes(adminSearch.toLowerCase());
      const matchesDept = selectedDept === "All Departments" || emp.dept === selectedDept;
      const matchesStatus =
        selectedStatus === "All Statuses" ||
        (selectedStatus === "Completed" && emp.checkinStatus === "Completed") ||
        (selectedStatus === "Pending" && emp.checkinStatus === "Pending") ||
        (selectedStatus === "Not Started" && emp.checkinStatus === "Not Started");

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, adminSearch, selectedDept, selectedStatus]);

  // Pagination for Employee Directory
  const paginatedEmployees = useMemo(() => {
    const start = (adminPage - 1) * 6;
    return filteredEmployees.slice(start, start + 6);
  }, [filteredEmployees, adminPage]);

  const totalPages = Math.ceil(filteredEmployees.length / 6) || 1;

  useEffect(() => {
    setAdminPage(1);
  }, [adminSearch, selectedDept, selectedStatus]);

  // Loading state fallback
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="font-label-md text-label-md text-secondary">Synchronizing security clearance...</p>
        </div>
      </div>
    );
  }

  const isAdmin = session?.role === "admin";

  // Dynamic Page Headers
  const getHeaderTitle = () => {
    if (!isAdmin) return "My Dashboard — Align Enterprise";
    switch (activeTab) {
      case "employees":
        return "Resource Directory — Strategic Employees";
      case "cycles":
        return "Performance Boundaries & Cycles";
      case "audit":
        return "Enterprise Security & Compliance Logs";
      case "shared":
        return "Shared Goals & Corporate KPIs Feed";
      default:
        return "Completion Dashboard — Q1 Check-in";
    }
  };

  return (
    <div className="flex min-h-screen text-on-surface bg-[#F8FAFC]">
      {/* Dynamic Shared Sidebar */}
      <AdminEmployeeSidebar active={activeTab as any} onSignOut={() => void handleSignOut()} session={session} />

      {/* Main Canvas Viewport */}
      <div className="ml-64 flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Dynamic Top Header Bar */}
        <AdminEmployeeTopBar
          title={getHeaderTitle()}
          rightSlot={
            <div className="flex items-center gap-4 relative">
              <span className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-3.5 py-1.5 rounded-full border border-outline-variant text-xs font-bold shadow-sm">
                FY 2025-26
              </span>
              {isAdmin && (
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="flex items-center px-4 py-2 border border-primary text-primary font-bold font-label-md text-label-md rounded-lg hover:bg-primary/5 active:scale-95 transition-all shadow-sm text-sm disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">download</span>
                  {exporting ? "Generating..." : "Export PDF"}
                </button>
              )}
              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative border border-outline-variant/60 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-background animate-pulse"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-outline-variant rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex justify-between items-center border-b border-outline-variant pb-2.5 mb-3">
                      <h4 className="font-bold text-sm text-on-surface">Urgent System Alerts</h4>
                      <button
                        onClick={() => {
                          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                          triggerToast("Marked all alerts as processed.");
                        }}
                        className="text-xs text-primary hover:underline font-bold"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border text-xs flex gap-2 ${
                            !n.read
                              ? "bg-slate-50 border-primary/20 font-bold"
                              : "bg-white border-outline-variant/50 text-secondary"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 ${
                              n.urgency === "High" ? "bg-red-500 animate-ping" : n.urgency === "Medium" ? "bg-amber-500" : "bg-blue-500"
                            }`}
                          ></span>
                          <div className="flex-1">
                            <p className="text-slate-800 leading-tight">{n.message}</p>
                            <span className="text-[10px] text-secondary font-semibold uppercase tracking-tighter">
                              Urgency: {n.urgency}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />

        {/* Main Dashboard Space */}
        <main className="p-page-padding space-y-section-gap flex-grow">
          {isAdmin ? (
            /* ==============================================================
               ADMIN DASHBOARD CONTAINER
               ============================================================== */
            <div className="space-y-6">
              {/* Tab 1: dashboard */}
              {activeTab === "dashboard" && (
                <>
                  {/* Row 1: High level Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <span className="text-secondary font-label-md text-label-md flex items-center gap-1.5 font-bold mb-1">
                          <span className="material-symbols-outlined text-[18px] text-primary">analytics</span> Goal Submission Rate
                        </span>
                        <h3 className="font-headline-lg text-3xl font-extrabold text-on-surface mt-2 flex items-baseline gap-2">
                          87%
                          <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded">
                            <span className="material-symbols-outlined text-xs">arrow_upward</span> +5%
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-3 font-semibold">vs last review window</p>
                    </div>

                    <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <span className="text-secondary font-label-md text-label-md flex items-center gap-1.5 font-bold mb-1">
                          <span className="material-symbols-outlined text-[18px] text-amber-500">pending_actions</span> Manager Approval Rate
                        </span>
                        <h3 className="font-headline-lg text-3xl font-extrabold text-on-surface mt-2 flex items-baseline gap-2">
                          72%
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                            12 pending
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-3 font-semibold">Manager actions required</p>
                    </div>

                    <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <span className="text-secondary font-label-md text-label-md flex items-center gap-1.5 font-bold mb-1">
                          <span className="material-symbols-outlined text-[18px] text-red-500">task_alt</span> Q1 Check-in Complete
                        </span>
                        <h3 className="font-headline-lg text-3xl font-extrabold text-on-surface mt-2 flex items-baseline gap-2">
                          61%
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            31 missing
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-3 font-semibold">Employees missing data</p>
                    </div>

                    <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <span className="text-secondary font-label-md text-label-md flex items-center gap-1.5 font-bold mb-1">
                          <span className="material-symbols-outlined text-[18px] text-red-600">running_with_errors</span> Overdue Approvals
                        </span>
                        <h3 className="font-headline-lg text-3xl font-extrabold text-red-600 mt-2 flex items-baseline gap-2">
                          4
                          <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded uppercase">
                            High Priority
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-secondary mt-3 font-semibold">&gt;7 days pending response</p>
                    </div>
                  </div>

                  {/* Row 2: Charts and Quick Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">bar_chart</span> Department Completion Rates
                        </h3>
                        <div className="flex gap-3 text-[10px] font-bold text-secondary">
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> &gt;=80%
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> 60-79%
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-red-500"></span> &lt;60%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-secondary">
                            <span>Sales Strategy & Execution</span>
                            <span className="text-emerald-600 font-extrabold">92%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "92%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-secondary">
                            <span>Finance & Corporate Audit</span>
                            <span className="text-emerald-600 font-extrabold">88%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "88%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-secondary">
                            <span>Operations & Logistics</span>
                            <span className="text-amber-600 font-extrabold">78%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: "78%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-secondary">
                            <span>People Operations & HR</span>
                            <span className="text-amber-600 font-extrabold">65%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-secondary">
                            <span>IT Systems & Tech Ops</span>
                            <span className="text-red-500 font-extrabold">55%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: "55%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
                      <div>
                        <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-amber-500 font-bold">bolt</span> Action Dashboard
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg">
                            <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">priority_high</span>
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-slate-800">
                                <span className="font-black text-red-700">Vikram Rao</span> has missing Q1 Goals
                              </p>
                              <button
                                onClick={() => handleSendReminder("Vikram Rao")}
                                disabled={pendingReminders.includes("Vikram Rao")}
                                className="text-primary hover:text-primary-container text-xs font-extrabold underline mt-1 disabled:text-slate-400 disabled:no-underline"
                              >
                                {pendingReminders.includes("Vikram Rao") ? "Reminder Sent ✓" : "Send Urgent Reminder"}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg">
                            <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">warning</span>
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-slate-800">
                                <span className="font-black text-amber-800">Amit Kumar</span>: goals incomplete (85%)
                              </p>
                              <button
                                onClick={() => triggerToast("Viewing Amit Kumar's goal submission sheet.")}
                                className="text-primary hover:text-primary-container text-xs font-extrabold underline mt-1"
                              >
                                View Submission
                              </button>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                            <span className="material-symbols-outlined text-slate-500 text-sm mt-0.5">info</span>
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-slate-800">
                                <span className="font-black">4 managers</span> haven't completed Q1 review
                              </p>
                              <button
                                onClick={() => router.push("/dashboard?tab=employees")}
                                className="text-primary hover:text-primary-container text-xs font-extrabold underline mt-1"
                              >
                                Review All
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerToast("Broadcasting cycle submission reminder to all pending employees...")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">campaign</span> Broadcast Cycle Reminder
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Live employee table summary */}
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
                    <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant bg-slate-50/50">
                      <h3 className="font-headline-sm text-lg font-bold text-on-surface">Employee Q1 Cycle Status</h3>
                      <button
                        onClick={() => router.push("/dashboard?tab=employees")}
                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        Go to Directory View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                    <div className="p-4 flex gap-4 bg-slate-50/20 border-b border-outline-variant/60">
                      <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="text-xs font-bold text-slate-700 border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary shadow-sm"
                      >
                        <option>All Departments</option>
                        <option>Sales</option>
                        <option>HR</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>IT</option>
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="text-xs font-bold text-slate-700 border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary shadow-sm"
                      >
                        <option>All Statuses</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Not Started</option>
                      </select>

                      <div className="relative flex-grow max-w-xs">
                        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[18px]">search</span>
                        <input
                          type="text"
                          value={adminSearch}
                          onChange={(e) => setAdminSearch(e.target.value)}
                          placeholder="Search employee or manager..."
                          className="pl-9 pr-3 py-2 text-xs border border-outline-variant rounded-lg bg-white w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-outline-variant text-[11px] uppercase tracking-wider text-secondary font-bold">
                          <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Manager</th>
                            <th className="px-6 py-4">Goal Submission</th>
                            <th className="px-6 py-4">Q1 Check-in</th>
                            <th className="px-6 py-4 text-right">Action Operations</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant text-sm font-semibold text-slate-800">
                          {paginatedEmployees.length > 0 ? (
                            paginatedEmployees.map((emp) => (
                              <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                    {emp.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <span className="font-bold text-slate-900">{emp.name}</span>
                                </td>
                                <td className="px-6 py-4 text-secondary">{emp.dept}</td>
                                <td className="px-6 py-4 text-secondary">{emp.manager}</td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                                      emp.goalStatus === "Submitted"
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : emp.goalStatus === "Incomplete"
                                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                  >
                                    {emp.goalStatus}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                                      emp.checkinStatus === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : emp.checkinStatus === "Pending"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-slate-100 text-slate-800"
                                    }`}
                                  >
                                    {emp.checkinStatus}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  {emp.checkinStatus !== "Completed" && (
                                    <button
                                      onClick={() => handleSendReminder(emp.name)}
                                      className="text-[12px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded font-bold transition-all"
                                    >
                                      {pendingReminders.includes(emp.name) ? "Reminded ✓" : "Remind"}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleOpenEditEmployee(emp)}
                                    className="text-[12px] text-primary hover:underline font-bold"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center text-secondary font-bold">
                                No employees match the specified filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="px-6 py-4 border-t border-outline-variant bg-slate-50/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">
                        Showing {paginatedEmployees.length} of {filteredEmployees.length} registered strategic employees
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                          disabled={adminPage === 1}
                          className="px-3 py-1.5 border border-outline-variant rounded bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setAdminPage((p) => Math.min(totalPages, p + 1))}
                          disabled={adminPage === totalPages}
                          className="px-3 py-1.5 border border-outline-variant rounded bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: employees */}
              {activeTab === "employees" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-extrabold text-on-surface">Resource Alignment Directory</h3>
                      <p className="text-xs text-secondary mt-0.5">Onboard, align departments, assign supervisors, and monitor progress.</p>
                    </div>
                    <button
                      onClick={handleOpenAddEmployee}
                      className="bg-primary hover:bg-primary-container text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                      Add Strategic Employee
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-50/50 border-b border-outline-variant flex flex-wrap gap-4 items-center">
                      <div className="relative w-72">
                        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[18px]">search</span>
                        <input
                          type="text"
                          value={adminSearch}
                          onChange={(e) => setAdminSearch(e.target.value)}
                          placeholder="Search directory by name, manager or email..."
                          className="pl-9 pr-3 py-2 text-xs border border-outline-variant rounded-lg bg-white w-full focus:outline-none focus:border-primary shadow-sm font-semibold"
                        />
                      </div>

                      <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="text-xs font-bold text-slate-700 border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary shadow-sm"
                      >
                        <option>All Departments</option>
                        <option>Sales</option>
                        <option>HR</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>IT</option>
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="text-xs font-bold text-slate-700 border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary shadow-sm"
                      >
                        <option>All Statuses</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Not Started</option>
                      </select>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-outline-variant text-[11px] uppercase tracking-wider text-secondary font-bold">
                          <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Corporate Email</th>
                            <th className="px-6 py-4">Dept</th>
                            <th className="px-6 py-4">Assigned Supervisor</th>
                            <th className="px-6 py-4">Goal Sheet</th>
                            <th className="px-6 py-4">Check-in Status</th>
                            <th className="px-6 py-4 text-right">Operations</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant text-sm font-semibold text-slate-800">
                          {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-inner">
                                  {emp.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <span className="font-extrabold text-slate-900 block">{emp.name}</span>
                                  <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">ID: {emp.id}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-secondary text-xs">{emp.email || `${emp.id}@enterprise.com`}</td>
                              <td className="px-6 py-4 text-secondary">{emp.dept}</td>
                              <td className="px-6 py-4 text-secondary">{emp.manager}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    emp.goalStatus === "Submitted"
                                      ? "bg-green-50 text-green-700 border border-green-200"
                                      : "bg-amber-50 text-amber-700 border border-amber-200"
                                  }`}
                                >
                                  {emp.goalStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    emp.checkinStatus === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : emp.checkinStatus === "Pending"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  {emp.checkinStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right space-x-2.5">
                                <button
                                  onClick={() => handleOpenEditEmployee(emp)}
                                  className="text-xs text-primary hover:underline font-extrabold"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                                  className="text-xs text-red-600 hover:text-red-700 font-extrabold"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: cycles */}
              {activeTab === "cycles" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Cycles list */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-on-surface">Organizational Boundaries</h3>
                      <p className="text-xs text-secondary mt-0.5">Activate, draft, or close strategic performance review timelines.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {cycles.map((c) => (
                        <div
                          key={c.id}
                          className="bg-white p-5 rounded-xl border border-outline-variant hover:shadow-sm transition-all flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${
                                    c.status === "Active"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : c.status === "Draft"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  {c.status}
                                </span>
                                <span className="text-xs text-secondary font-semibold">Scope: {c.scope}</span>
                              </div>
                              <h4 className="font-extrabold text-base text-on-surface mt-2">{c.name}</h4>
                            </div>
                            <button
                              onClick={() => toggleCycleStatus(c.id, c.name, c.status)}
                              className="text-xs text-primary hover:underline font-extrabold border border-outline-variant px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100"
                            >
                              Transition State
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-4 py-2 px-3 bg-slate-50 rounded-lg text-xs font-semibold">
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Start Date</span>
                              <span className="text-slate-800 font-extrabold">{c.startDate}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Deadlines End</span>
                              <span className="text-slate-800 font-extrabold">{c.endDate}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Strategic Completion</span>
                              <span className="text-slate-800 font-extrabold">{c.completionRate}%</span>
                            </div>
                          </div>

                          {c.status === "Active" && (
                            <div className="space-y-1 mt-1">
                              <div className="flex justify-between text-[11px] font-bold text-secondary">
                                <span>Completion progress bar</span>
                                <span>{c.completionRate}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.completionRate}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Add Cycle Form */}
                  <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm sticky top-24">
                      <h4 className="font-extrabold text-base text-on-surface mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary font-bold">add_circle</span> Launch New Review Boundary
                      </h4>
                      <p className="text-xs text-secondary mb-4 font-semibold">Establish dynamic targets across a designated scope.</p>

                      <form onSubmit={handleCreateCycle} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Goal-Setting Cycle Title</label>
                          <input
                            type="text"
                            value={newCycleName}
                            onChange={(e) => setNewCycleName(e.target.value)}
                            placeholder="e.g. Q3 Performance Assessment"
                            className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Start Date</label>
                            <input
                              type="date"
                              value={newCycleStart}
                              onChange={(e) => setNewCycleStart(e.target.value)}
                              className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">End Date</label>
                            <input
                              type="date"
                              value={newCycleEnd}
                              onChange={(e) => setNewCycleEnd(e.target.value)}
                              className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Inclusion Scope</label>
                          <select
                            value={newCycleScope}
                            onChange={(e) => setNewCycleScope(e.target.value)}
                            className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none"
                          >
                            <option>All Employees</option>
                            <option>Sales strategy force only</option>
                            <option>IT & Technical departments only</option>
                            <option>Executive Management</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all active:scale-[0.98] mt-2"
                        >
                          Launch Goal Cycle
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: audit */}
              {activeTab === "audit" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-extrabold text-on-surface">Security & System Audit logs</h3>
                      <p className="text-xs text-secondary mt-0.5">Monitor global operational modifications, session authentications, and system integrity.</p>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="bg-slate-100 hover:bg-slate-200 border border-outline-variant text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">file_download</span>
                      Export Audit CSV
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-50/50 border-b border-outline-variant flex gap-4">
                      <div className="relative max-w-xs flex-grow">
                        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[18px]">search</span>
                        <input
                          type="text"
                          value={adminSearch}
                          onChange={(e) => setAdminSearch(e.target.value)}
                          placeholder="Search user, action, detail..."
                          className="pl-9 pr-3 py-2 text-xs border border-outline-variant rounded-lg bg-white w-full focus:outline-none focus:border-primary shadow-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-outline-variant text-[11px] uppercase tracking-wider text-secondary font-bold">
                          <tr>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4">Logged Operator</th>
                            <th className="px-6 py-4">Operation Category</th>
                            <th className="px-6 py-4">Detailed Change Parameter</th>
                            <th className="px-6 py-4">Origin IP Address</th>
                            <th className="px-6 py-4">Scope Classification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant text-xs font-semibold text-slate-800">
                          {auditLogs
                            .filter(
                              (log) =>
                                log.user.toLowerCase().includes(adminSearch.toLowerCase()) ||
                                log.action.toLowerCase().includes(adminSearch.toLowerCase()) ||
                                log.detail.toLowerCase().includes(adminSearch.toLowerCase())
                            )
                            .map((log) => (
                              <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-500">{log.timestamp}</td>
                                <td className="px-6 py-4 font-extrabold text-slate-900">{log.user}</td>
                                <td className="px-6 py-4">
                                  <span className="px-2 py-0.5 rounded font-bold bg-primary/10 text-primary border border-primary/10">
                                    {log.action}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-slate-700 font-bold">{log.detail}</td>
                                <td className="px-6 py-4 font-mono text-secondary">{log.ip}</td>
                                <td className="px-6 py-4">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{log.type}</span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: shared */}
              {activeTab === "shared" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Active goals */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-on-surface">Active Departmental KPIs</h3>
                      <p className="text-xs text-secondary mt-0.5">Broadcasted targets across departments. Recipients cannot edit titles or metrics.</p>
                    </div>

                    <div className="space-y-4">
                      {sharedGoals.map((sg) => (
                        <div key={sg.id} className="bg-white p-5 rounded-xl border border-outline-variant hover:shadow-sm transition-all flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-primary/20">
                                  {sg.type}
                                </span>
                                <span className="text-xs text-secondary font-bold">{sg.thrust} Thrust Area</span>
                              </div>
                              <h4 className="font-extrabold text-base text-on-surface mt-2">{sg.title}</h4>
                              <p className="text-xs text-secondary font-semibold italic mt-1">"{sg.description}"</p>
                            </div>
                            <div className="text-right text-[10px] text-secondary font-semibold">
                              <span>Pushed by: {sg.creator}</span>
                              <span className="block mt-0.5">{sg.date}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 py-2 px-3 bg-slate-50 rounded-lg text-xs font-semibold">
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Fixed Target</span>
                              <span className="text-slate-800 font-extrabold">{sg.target}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Pushed Scope</span>
                              <span className="text-slate-800 font-extrabold truncate block">{sg.pushedTo}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block uppercase text-[10px]">Strategic Acceptance</span>
                              <span className="text-green-700 font-extrabold">{sg.accepted}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-green-600 h-full rounded-full animate-pulse" style={{ width: `${sg.progress}%` }}></div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-2">
                            <button
                              onClick={() => triggerToast(`Viewing comprehensive alignment mapping for ${sg.title}...`)}
                              className="flex-1 py-1.5 border border-outline-variant text-xs font-extrabold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              View Recipient Alignment Map
                            </button>
                            <button
                              onClick={() => triggerToast(`Broadcast reminder sent to all pending goal accepters!`)}
                              className="flex-1 py-1.5 bg-primary hover:bg-primary-container text-white text-xs font-extrabold rounded-lg transition-colors shadow-sm"
                            >
                              Send Group Reminder
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Push Form */}
                  <div className="lg:col-span-5">
                    <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm sticky top-24">
                      <h4 className="font-extrabold text-base text-on-surface mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary font-bold">campaign</span> Push Departmental KPI
                      </h4>
                      <p className="text-xs text-secondary mb-4 font-semibold">Broadside aligned goal objectives across standard teams.</p>

                      <form onSubmit={handlePushSharedGoal} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Thrust Area Classification</label>
                          <select
                            value={newGoalThrust}
                            onChange={(e) => setNewGoalThrust(e.target.value)}
                            className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary"
                          >
                            <option>Sales</option>
                            <option>HR</option>
                            <option>IT</option>
                            <option>Finance</option>
                            <option>Compliance</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">KPI Goal Title</label>
                          <input
                            type="text"
                            value={newGoalTitle}
                            onChange={(e) => setNewGoalTitle(e.target.value)}
                            placeholder="e.g. Compliance Safety Matrix"
                            className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Strategic Rationale Description</label>
                          <textarea
                            value={newGoalDesc}
                            onChange={(e) => setNewGoalDesc(e.target.value)}
                            placeholder="Provide details about compliance standards or growth KPIs..."
                            rows={2}
                            className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">UoM Type (Metrics)</label>
                          <div className="grid grid-cols-4 gap-2">
                            {["MIN", "MAX", "TIME", "ZERO"].map((uom) => (
                              <button
                                key={uom}
                                type="button"
                                onClick={() => setNewGoalUom(uom)}
                                className={`py-1.5 rounded-lg border text-[10px] font-black transition-all ${
                                  newGoalUom === uom
                                    ? "bg-primary text-white border-primary shadow-sm"
                                    : "bg-white text-slate-700 border-outline-variant/60 hover:bg-slate-50"
                                }`}
                              >
                                {uom}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Objective Target Value</label>
                          <input
                            type="text"
                            value={newGoalTarget}
                            onChange={(e) => setNewGoalTarget(e.target.value)}
                            placeholder="e.g. 100% or 0 incidents"
                            className="w-full text-xs font-semibold px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 block">Broadcast Targets</label>
                          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100">
                              <input
                                type="checkbox"
                                checked={pushSales}
                                onChange={(e) => setPushSales(e.target.checked)}
                                className="rounded text-primary focus:ring-primary h-4 w-4"
                              />
                              <span>Sales Strategy</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100">
                              <input
                                type="checkbox"
                                checked={pushHr}
                                onChange={(e) => setPushHr(e.target.checked)}
                                className="rounded text-primary focus:ring-primary h-4 w-4"
                              />
                              <span>Human Resources</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100">
                              <input
                                type="checkbox"
                                checked={pushIt}
                                onChange={(e) => setPushIt(e.target.checked)}
                                className="rounded text-primary focus:ring-primary h-4 w-4"
                              />
                              <span>Information Tech</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100">
                              <input
                                type="checkbox"
                                checked={pushFinance}
                                onChange={(e) => setPushFinance(e.target.checked)}
                                className="rounded text-primary focus:ring-primary h-4 w-4"
                              />
                              <span>Finance / Auditing</span>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all active:scale-[0.98] mt-2"
                        >
                          Push to Designated Departments
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ==============================================================
               STANDARD EMPLOYEE DASHBOARD VIEW
               ============================================================== */
            <div className="space-y-6">
              {/* Alert Banner if draft */}
              {!submitted && (
                <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-amber-50 border border-amber-200 rounded-xl shadow-sm gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="material-symbols-outlined text-amber-600 text-2xl font-bold animate-bounce">warning</span>
                    <div>
                      <p className="font-bold text-amber-900 text-sm">Your Q1 goal sheet is not yet submitted.</p>
                      <p className="text-xs text-amber-800 font-semibold mt-0.5">
                        Submission cycle closes: <span className="font-extrabold text-amber-900">31 May 2025</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(true);
                      triggerToast("Goal sheet submitted for manager approval successfully!");
                    }}
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95"
                  >
                    Submit Sheet
                  </button>
                </div>
              )}

              {/* Summary Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-start justify-between hover:shadow-md transition-all">
                  <div>
                    <p className="font-label-sm text-xs font-bold text-slate-500 mb-1">Goals Declared</p>
                    <h3 className="text-3xl font-black text-primary mt-1">4</h3>
                    <p className="text-xs text-slate-500 font-bold mt-2">of 8 maximum allowed</p>
                  </div>
                  <div className="p-3.5 bg-primary/10 rounded-xl text-primary shadow-inner">
                    <span className="material-symbols-outlined font-bold">checklist</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-start justify-between hover:shadow-md transition-all">
                  <div>
                    <p className="font-label-sm text-xs font-bold text-slate-500 mb-1">Weightage Allocated</p>
                    <h3 className={`text-3xl font-black mt-1 ${submitted ? "text-emerald-600" : "text-amber-500"}`}>{submitted ? "100%" : "85%"}</h3>
                    <p className={`text-xs font-bold mt-2 ${submitted ? "text-emerald-600" : "text-amber-600 italic animate-pulse"}`}>
                      {submitted ? "Allocated perfectly" : "15% remaining weightage"}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl shadow-inner ${submitted ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-500"}`}>
                    <span className="material-symbols-outlined font-bold">balance</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-start justify-between hover:shadow-md transition-all">
                  <div>
                    <p className="font-label-sm text-xs font-bold text-slate-500 mb-1">Sheet Status</p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold ${
                          submitted ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {submitted ? "Awaiting Manager Approval" : "Draft (Work in Progress)"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mt-3">{submitted ? "Locked for manager response" : "Submit once weightage equals 100%"}</p>
                  </div>
                  <div className="p-3.5 bg-slate-100 rounded-xl text-slate-500 shadow-inner">
                    <span className="material-symbols-outlined font-bold">edit_note</span>
                  </div>
                </div>
              </div>

              {/* Goals Sheet Table */}
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">My Dynamic Goal Sheet</h3>
                  <button
                    onClick={() => router.push("/goals/new")}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add Dynamic Goal
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-outline-variant text-[11px] uppercase tracking-wider text-secondary font-bold">
                      <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Thrust Area</th>
                        <th className="px-6 py-4">Goal Title</th>
                        <th className="px-6 py-4">UoM</th>
                        <th className="px-6 py-4">Target Value</th>
                        <th className="px-6 py-4">Weightage</th>
                        <th className="px-6 py-4 text-right">Cycle Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant font-semibold text-slate-800 text-sm">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-secondary">1</td>
                        <td className="px-6 py-4">Sales Development</td>
                        <td className="px-6 py-4 font-bold text-slate-900">Achieve Regional Revenue Targets</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-primary/10 text-primary border border-primary/20">MIN</span>
                        </td>
                        <td className="px-6 py-4 text-slate-900">₹50,00,000</td>
                        <td className="px-6 py-4">30%</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => triggerToast("Loading goal config...")} className="text-xs text-primary hover:underline font-extrabold">
                            Edit
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-secondary">2</td>
                        <td className="px-6 py-4">Customer Operations</td>
                        <td className="px-6 py-4 font-bold text-slate-900">Reduce Customer Resolution Turnaround Time</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-50 text-red-600 border border-red-200">MAX</span>
                        </td>
                        <td className="px-6 py-4 text-slate-900">3 Working Days</td>
                        <td className="px-6 py-4">25%</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => triggerToast("Loading goal config...")} className="text-xs text-primary hover:underline font-extrabold">
                            Edit
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-secondary">3</td>
                        <td className="px-6 py-4">Safety & Compliance</td>
                        <td className="px-6 py-4 font-bold text-slate-900">Maintain Zero Safety Infractions</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-green-50 text-green-700 border border-green-200">ZERO</span>
                        </td>
                        <td className="px-6 py-4 text-slate-900">0 Incidents</td>
                        <td className="px-6 py-4">20%</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => triggerToast("Loading goal config...")} className="text-xs text-primary hover:underline font-extrabold">
                            Edit
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-secondary">4</td>
                        <td className="px-6 py-4">Corporate Strategy</td>
                        <td className="px-6 py-4 font-bold text-slate-900">Complete Departmental Security Upskilling</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                            TIMELINE
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-900">30-Jun-2025</td>
                        <td className="px-6 py-4">10%</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => triggerToast("Loading goal config...")} className="text-xs text-primary hover:underline font-extrabold">
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Card Footer Summary */}
                <div className="px-6 py-5 bg-slate-50 border-t border-outline-variant flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-slate-800">
                      Total Allocated Weightage:{" "}
                      <span className={submitted ? "text-emerald-600 font-black" : "text-amber-500 font-black animate-pulse"}>
                        {submitted ? "100% / 100%" : "85% / 100%"}
                      </span>
                    </span>
                    {!submitted && (
                      <span className="text-xs text-amber-600 font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        You need to allocate 15% more weightage to submit the sheet.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex-grow">
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${submitted ? "bg-emerald-500" : "bg-amber-500"}`}
                          style={{ width: submitted ? "100%" : "85%" }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(true);
                        triggerToast("Goal sheet submitted for manager approval successfully!");
                      }}
                      disabled={submitted}
                      className={`px-5 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 shadow-sm ${
                        submitted ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {submitted ? "Sheet Submitted ✓" : "Submit for Approval"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Helpful Strategic Guide Card */}
              <div className="bg-white border border-dashed border-outline-variant rounded-xl p-10 text-center hover:shadow-sm transition-all">
                <div className="mx-auto w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl font-bold">lightbulb</span>
                </div>
                <h4 className="font-headline-sm text-base font-bold text-on-surface mb-1">Need assistance defining your targets?</h4>
                <p className="text-xs text-secondary max-w-md mx-auto mb-5 font-semibold">
                  Review the organization's FY 2025-26 strategy blueprints to align your personal milestones directly with the company's global objectives.
                </p>
                <button
                  onClick={() => triggerToast("BlueprintsStrategyGuide_Q1_2025.pdf is not downloaded locally.")}
                  className="border border-primary text-primary hover:bg-primary/5 px-5 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 shadow-sm"
                >
                  Download Corporate Strategy Blueprint
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto py-6 text-center text-xs text-secondary font-bold border-t border-outline-variant/60 bg-white shadow-inner">
          © 2026 Align Enterprise Portal. Performance, Feedback & Corporate Strategy Administration.
        </footer>
      </div>

      {/* STATEFUL MODAL: Add / Edit Employee Profile */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-outline-variant rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsEmployeeModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <h3 className="text-lg font-black text-on-surface mb-1">
              {editingEmployee ? "Modify Aligned Employee Profile" : "Register & Align New Employee"}
            </h3>
            <p className="text-xs text-secondary mb-5 font-semibold">
              Input strategic resource profile parameters. Align directly with standard corporate reporting lines.
            </p>

            <form onSubmit={handleSaveEmployee} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full text-xs font-semibold px-3 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                  placeholder="e.g. ramesh.patel@enterprise.com"
                  className="w-full text-xs font-semibold px-3 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Department</label>
                  <select
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                    className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-primary"
                  >
                    <option>Sales</option>
                    <option>HR</option>
                    <option>Operations</option>
                    <option>Finance</option>
                    <option>IT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Reporting Manager / Supervisor</label>
                  <select
                    value={empManager}
                    onChange={(e) => setEmpManager(e.target.value)}
                    className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-primary"
                  >
                    <option>Priya Kapoor</option>
                    <option>Raj Malhotra</option>
                    <option>Suresh Prasad</option>
                    <option>Raj Sharma</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Goal Submission Status</label>
                  <select
                    value={empGoalStatus}
                    onChange={(e) => setEmpGoalStatus(e.target.value)}
                    className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2.5 bg-white focus:outline-none"
                  >
                    <option>Submitted</option>
                    <option>Incomplete</option>
                    <option>Not Submitted</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">Q1 Check-in Progress</label>
                  <select
                    value={empCheckinStatus}
                    onChange={(e) => setEmpCheckinStatus(e.target.value)}
                    className="w-full text-xs font-bold text-slate-700 border border-outline-variant rounded-lg px-3 py-2.5 bg-white focus:outline-none"
                  >
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-xs font-bold text-secondary bg-slate-50 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  Save Strategic Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Sleek Feedback Alerts Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3.5 z-[100] transition-all transform duration-300 translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-green-400 font-bold">check_circle</span>
          <span className="font-label-md text-label-md font-extrabold text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
