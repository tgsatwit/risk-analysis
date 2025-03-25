"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { WelcomeStep } from '@/components/wizard/steps/welcome-step';
import { OrganizationStep } from '@/components/wizard/steps/organization-step';
import { SETUP_STEPS } from '@/lib/constants';

export default function HomePage() {
  const { state, updateState } = useSetup();
  const { currentStep } = state;

  // Reference to step component elements
  const stepFormRef = React.useRef<HTMLFormElement>(null);

  // Handle step completion
  const handleStepComplete = () => {
    updateState({
      currentStep: currentStep + 1,
    });
  };
  
  // Handle next button click for non-form steps
  const handleNext = () => {
    if (currentStep === 0) { // Welcome step - no form to validate
      handleStepComplete();
      return false; // Prevent default navigation
    }
    
    // For other steps (except the organization step which has its own handler)
    return true; // Allow default navigation
  };
  
  // Render the appropriate step based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <OrganizationStep ref={stepFormRef} onStepComplete={handleStepComplete} />;
      case 2:
        return <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Microsoft Integration Step</h2>
          <p className="text-muted-foreground">This step would connect to Microsoft Copilot Studio.</p>
        </div>;
      case 3:
        return <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">SharePoint Configuration Step</h2>
          <p className="text-muted-foreground">This step would set up SharePoint integration.</p>
        </div>;
      case 4:
        return <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Document Management Step</h2>
          <p className="text-muted-foreground">This step would handle document upload and selection.</p>
        </div>;
      case 5:
        return <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Agent Configuration Step</h2>
          <p className="text-muted-foreground">This step would configure the Copilot agent settings.</p>
        </div>;
      case 6:
        return <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Review and Deploy Step</h2>
          <p className="text-muted-foreground">This step would review all settings and deploy the agent.</p>
        </div>;
      default:
        return <WelcomeStep />;
    }
  };
  
  // Get current step details
  const currentStepData = SETUP_STEPS[currentStep];
  
  return (
    <WizardLayout
      title={currentStepData.title}
      description={currentStepData.description}
      onNext={handleNext}
    >
      {renderStep()}
    </WizardLayout>
  );
} 