"use client";

import { useProtectedSession } from "@/hooks/useProtectedSession";
import { useWizardStore } from "@/store/wizardStore";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

export default function GoalWizardPage() {
  const { session, isLoading } = useProtectedSession(["employee", "admin"]);
  const { currentStep } = useWizardStore();

  if (isLoading || !session) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
    </>
  );
}
