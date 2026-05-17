export const ADMIN_EMPLOYEE_ROUTES = {
  dashboard: "/dashboard",
  goals: "/goals",
  checkIns: "/check-in",
  progress: "/goals/progress",
} as const;

export const ADMIN_EMPLOYEE_LABELS = {
  dashboard: "Dashboard",
  goals: "My Goals",
  checkIns: "Check-ins",
  progress: "My Progress",
} as const;

export const ADMIN_EMPLOYEE_HEADERS = {
  shell: "Align Enterprise Portal",
  goals: "My Goals - FY 2025-26",
  progress: "My Progress",
  checkInQuarter: "Q1 Check-in - July 2025",
  createGoal: "Create New Goal",
} as const;
