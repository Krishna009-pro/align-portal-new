import { ADMIN_EMPLOYEE_HEADERS } from "@/lib/admin-employee-ui";
import type { ReactNode } from "react";

interface AdminEmployeeTopBarProps {
  rightSlot?: ReactNode;
  title?: string;
}

export function AdminEmployeeTopBar({
  rightSlot,
  title = ADMIN_EMPLOYEE_HEADERS.shell,
}: AdminEmployeeTopBarProps) {
  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-page-padding sticky top-0 z-30 custom-shadow">
      <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{title}</h2>
      {rightSlot ? <div className="flex items-center gap-3">{rightSlot}</div> : null}
    </header>
  );
}
