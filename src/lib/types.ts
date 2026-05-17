export type UserRole = "employee" | "manager" | "admin";

export interface GoalRecord {
  id: string;
  thrustArea: string;
  title: string;
  description?: string;
  uom: "MIN" | "MAX" | "ZERO" | "TIMELINE";
  target: string;
  weightage: number;
  status: "draft" | "submitted" | "approved";
}

export interface GoalSheetRecord {
  goals: GoalRecord[];
  submittedAt: string;
  status: "draft" | "submitted";
}
