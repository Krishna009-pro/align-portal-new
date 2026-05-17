"use client";

import { useWizardStore } from "@/store/wizardStore";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

export default function GoalWizardPage() {
  const { currentStep } = useWizardStore();

  return (
    <>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
    </>
  );
}
