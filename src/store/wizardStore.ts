import { create } from 'zustand';
import type { GoalRecord } from '@/lib/types';

interface WizardState {
  currentStep: number;
  goals: GoalRecord[];
  newGoal: Partial<GoalRecord>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setNewGoal: (updates: Partial<GoalRecord>) => void;
  addGoal: () => boolean;
  updateGoal: (id: string, updates: Partial<GoalRecord>) => void;
  deleteGoal: (id: string) => void;
  autoBalance: () => void;
  resetWizard: () => void;
}

const DEFAULT_GOALS: GoalRecord[] = [
  {
    id: "goal-1",
    thrustArea: "Sales",
    title: "Achieve Revenue Target",
    uom: "MIN",
    target: "₹ 5,00,000",
    weightage: 30,
    description: "Drive quarterly revenue growth.",
    status: "draft",
  },
  {
    id: "goal-2",
    thrustArea: "Operations",
    title: "Reduce Customer TAT",
    uom: "MAX",
    target: "3 days",
    weightage: 25,
    description: "Improve service turnaround time.",
    status: "draft",
  },
  {
    id: "goal-3",
    thrustArea: "Compliance",
    title: "Zero Safety Incidents",
    uom: "ZERO",
    target: "0",
    weightage: 20,
    description: "Ensure full safety compliance.",
    status: "draft",
  },
  {
    id: "goal-4",
    thrustArea: "HR",
    title: "Training Completion",
    uom: "TIMELINE",
    target: "30-Jun-2025",
    weightage: 15,
    description: "Complete team enablement plan.",
    status: "draft",
  },
  {
    id: "goal-5",
    thrustArea: "Quality",
    title: "Reduce Defect Rate",
    uom: "MAX",
    target: "2%",
    weightage: 10,
    description: "Lower post-release defects.",
    status: "draft",
  },
];

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 1,
  goals: [...DEFAULT_GOALS],
  newGoal: {
    thrustArea: "",
    title: "",
    description: "",
    uom: "MIN",
  },
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setNewGoal: (updates) => set((state) => ({ newGoal: { ...state.newGoal, ...updates } })),
  addGoal: () => {
    let added = false;
    set((state) => {
      const { thrustArea, title, uom, description } = state.newGoal;
      if (!thrustArea || !title || !uom) return {};

      if (state.goals.length >= 8) {
        return {};
      }

      const newGoalRecord: GoalRecord = {
        id: `goal-${Date.now()}`,
        thrustArea,
        title,
        uom,
        target: uom === "ZERO" ? "0" : "",
        weightage: 0,
        description: description || "",
        status: "draft",
      };

      added = true;
      return {
        goals: [...state.goals, newGoalRecord],
        newGoal: {
          thrustArea: "",
          title: "",
          description: "",
          uom: "MIN",
        },
      };
    });
    return added;
  },
  updateGoal: (id, updates) => set((state) => ({
    goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
  })),
  deleteGoal: (id) => set((state) => ({
    goals: state.goals.filter((g) => g.id !== id),
  })),
  autoBalance: () => set((state) => {
    const count = state.goals.length;
    if (count === 0) return {};
    const baseWeight = Math.floor(100 / count);
    const remainder = 100 % count;
    const updatedGoals = state.goals.map((g, i) => ({
      ...g,
      weightage: baseWeight + (i < remainder ? 1 : 0),
    }));
    return { goals: updatedGoals };
  }),
  resetWizard: () => set({
    currentStep: 1,
    goals: [...DEFAULT_GOALS],
    newGoal: {
      thrustArea: "",
      title: "",
      description: "",
      uom: "MIN",
    },
  }),
}));
