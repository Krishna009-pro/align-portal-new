"use client";

import { useState, useEffect } from "react";
import {
  ADMIN_EMPLOYEE_LABELS,
  ADMIN_EMPLOYEE_ROUTES,
} from "@/lib/admin-employee-ui";
import type { AppSession } from "@/lib/session";
import Link from "next/link";
import { ProfileModal } from "@/components/profile-modal";

type SidebarSection = "dashboard" | "goals" | "checkIns" | "progress" | "employees" | "cycles" | "audit" | "shared";

interface AdminEmployeeSidebarProps {
  active: SidebarSection;
  onSignOut: () => void;
  session: AppSession | null;
}

function navClass(isActive: boolean) {
  if (isActive) {
    return "flex items-center px-4 py-3 bg-primary text-on-primary border-l-4 border-primary-fixed-dim rounded-r-lg font-bold transition-all duration-200";
  }

  return "flex items-center px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg transition-all duration-200";
}

export function AdminEmployeeSidebar({ active, onSignOut, session }: AdminEmployeeSidebarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [managerDesignation, setManagerDesignation] = useState("Enterprise Admin");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync designation dynamically based on the active logged-in user profile
  useEffect(() => {
    const getDesignation = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("profile_designation");
        if (stored) return stored;
      }
      return session?.role === "admin" ? "Enterprise Admin" : "Enterprise Employee";
    };

    setManagerDesignation(getDesignation());

    const handleProfileSync = () => {
      setManagerDesignation(getDesignation());
    };

    window.addEventListener("profileUpdate", handleProfileSync);
    return () => window.removeEventListener("profileUpdate", handleProfileSync);
  }, [session]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Capitalize name initials
  const initial = session?.name ? session.name.charAt(0).toUpperCase() : "A";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-40 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-page-padding space-y-stack-gap">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
          <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_tree
          </span>
        </div>
        <div>
          <h1 className="font-headline-sm text-[18px] font-black text-primary leading-tight">Align Enterprise</h1>
          <p className="text-[10px] uppercase tracking-wider text-secondary font-bold">Global Strategy</p>
        </div>
      </div>

      <nav className="flex-grow px-3 space-y-1">
        {session?.role === "admin" ? (
          <>
            <Link className={navClass(active === "dashboard")} href="/dashboard">
              <span className="material-symbols-outlined mr-3">dashboard</span>
              <span className="font-label-md text-label-md font-bold">Dashboard</span>
            </Link>
            <Link className={navClass(active === "employees")} href="/dashboard?tab=employees">
              <span className="material-symbols-outlined mr-3">group</span>
              <span className="font-label-md text-label-md font-bold">Employees</span>
            </Link>
            <Link className={navClass(active === "cycles")} href="/dashboard?tab=cycles">
              <span className="material-symbols-outlined mr-3">sync</span>
              <span className="font-label-md text-label-md font-bold">Goal Cycles</span>
            </Link>
            <Link className={navClass(active === "audit")} href="/dashboard?tab=audit">
              <span className="material-symbols-outlined mr-3">history</span>
              <span className="font-label-md text-label-md font-bold">Audit Log</span>
            </Link>
            <Link className={navClass(active === "shared")} href="/dashboard?tab=shared">
              <span className="material-symbols-outlined mr-3">hub</span>
              <span className="font-label-md text-label-md font-bold">Shared Goals</span>
            </Link>
          </>
        ) : (
          <>
            <Link className={navClass(active === "dashboard")} href={ADMIN_EMPLOYEE_ROUTES.dashboard}>
              <span className="material-symbols-outlined mr-3">dashboard</span>
              <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.dashboard}</span>
            </Link>
            <Link className={navClass(active === "goals")} href={ADMIN_EMPLOYEE_ROUTES.goals}>
              <span className="material-symbols-outlined mr-3">ads_click</span>
              <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.goals}</span>
            </Link>
            <Link className={navClass(active === "checkIns")} href={ADMIN_EMPLOYEE_ROUTES.checkIns}>
              <span className="material-symbols-outlined mr-3">event_available</span>
              <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.checkIns}</span>
            </Link>
            <Link className={navClass(active === "progress")} href={ADMIN_EMPLOYEE_ROUTES.progress}>
              <span className="material-symbols-outlined mr-3">trending_up</span>
              <span className="font-label-md text-label-md">{ADMIN_EMPLOYEE_LABELS.progress}</span>
            </Link>
          </>
        )}
      </nav>

      <div className="px-4 mt-auto pt-4 border-t border-outline-variant relative">
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
                <p className="font-label-md text-label-md text-on-surface font-bold truncate">{session?.name || "User Name"}</p>
                <p className="font-label-sm text-label-sm text-secondary truncate">{session?.email || "user@enterprise.com"}</p>
                <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">
                  {session?.role || "employee"}
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
                onClick={() => {
                  setShowProfileMenu(false);
                  onSignOut();
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
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mr-3 shadow-sm border border-outline-variant/50">
            {initial}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-label-md text-label-md truncate text-on-surface font-semibold">
              {session?.name || "User Name"}
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

      {/* Stateful Interactive Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        triggerToast={triggerToast}
      />

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
    </aside>
  );
}
